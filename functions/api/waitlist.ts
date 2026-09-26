interface Env {
  WAITLIST_DB?: D1Database;
  TURNSTILE_SECRET_KEY?: string;
}

interface WaitlistRequest {
  email?: unknown;
  turnstileToken?: unknown;
}

interface TurnstileResponse {
  success: boolean;
  "error-codes"?: string[];
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(message: string, status: number): Response {
  return Response.json(
    { message },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    },
  );
}

async function verifyTurnstile(token: string, secret: string, remoteIP: string | null): Promise<boolean> {
  const body = new FormData();
  body.set("secret", secret);
  body.set("response", token);
  if (remoteIP) body.set("remoteip", remoteIP);

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  const result = await response.json<TurnstileResponse>();
  return response.ok && result.success;
}

const handlePost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.WAITLIST_DB) {
    return json("The waitlist is not configured yet. Please check back soon.", 503);
  }

  let payload: WaitlistRequest;

  try {
    payload = await request.json<WaitlistRequest>();
  } catch {
    return json("Invalid request.", 400);
  }

  if (typeof payload.email !== "string") {
    return json("Enter a valid email address.", 400);
  }

  const email = payload.email.trim().toLowerCase();
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return json("Enter a valid email address.", 400);
  }

  if (env.TURNSTILE_SECRET_KEY) {
    const token = typeof payload.turnstileToken === "string" ? payload.turnstileToken : "";
    if (!token) return json("Complete the security check and try again.", 400);

    try {
      const isHuman = await verifyTurnstile(
        token,
        env.TURNSTILE_SECRET_KEY,
        request.headers.get("CF-Connecting-IP"),
      );
      if (!isHuman) return json("The security check failed. Please try again.", 400);
    } catch {
      return json("The security check is temporarily unavailable. Please try again.", 503);
    }
  }

  try {
    const result = await env.WAITLIST_DB.prepare(
      "INSERT OR IGNORE INTO waitlist_subscribers (email, source, consent_version) VALUES (?, 'website', '2026-09-26')",
    ).bind(email).run();

    if (result.meta.changes === 0) {
      return json("You're already on the list. We'll keep you posted.", 200);
    }

    return json("You're on the list. We'll be in touch.", 201);
  } catch {
    return json("We couldn't add you right now. Please try again.", 500);
  }
};

export const onRequest: PagesFunction<Env> = async (context) => {
  if (context.request.method === "POST") return handlePost(context);
  return json("Method not allowed.", 405);
};
