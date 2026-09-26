# Calan Website Design Direction

This document records the approved visual and editorial direction for the Calan marketing website.
Future changes should extend this system rather than reinterpret it. The current implementation in
`src/pages/index.astro` and `src/styles/global.css` is the reference expression of this direction.

## Brand Foundation

Calan is a personal AI assistant that combines context from across a user's day and speaks up only
when doing so is genuinely helpful.

- Product category: `Your personal AI assistant.`
- Tagline: `The right notification at the right time.`
- Product principle: `Helpful when it matters. Quiet when it doesn't.`
- Initial platform: iPhone
- Primary audience: busy professionals
- Primary action: join the waitlist

Calan should feel calm, selective, considered, and trustworthy. It should not feel like a generic AI
product, a productivity dashboard, or an app that demands constant attention.

## Creative Idea

The central visual idea is **one useful notification**.

Calendar, location, traffic, weather, messages, tasks, and routines can provide many signals. Calan
understands those signals together and turns them into one concise recommendation. Visualizations
should reinforce this movement from ambient context to a single useful interruption.

The hero demonstration should make that transformation visible. Incoming context may feel uneven,
dense, and slightly disordered. Calan must then establish a clear hierarchy by selecting what is
relevant now, setting aside what can wait, and composing the selected facts into one calm message.
The contrast is between noisy inputs and an ordered output, not between many alerts and one alert.

Do not represent Calan with a busy stream of alerts. More notifications would contradict the product
promise.

## Visual Character

The approved direction is sober, elegant, monochrome, and editorial.

- Use warm white and near-black rather than stark white and absolute black.
- Create hierarchy through typography, scale, alignment, and negative space.
- Use thin rules and restrained geometric diagrams to provide structure.
- Prefer large, confident statements over collections of small cards.
- Keep surfaces flat. Shadows should be rare, soft, and functional.
- Let the notification itself be the strongest product object on the page.
- Avoid decorative gradients, bright accent colors, glass effects, stock photography, and generic AI imagery.

## Color

The canonical color tokens are defined in `src/styles/global.css`:

```css
--paper: #f2f0e9;
--paper-deep: #e7e4da;
--ink: #11110f;
--muted: #68675f;
--line: rgba(17, 17, 15, 0.16);
```

New colors should not be introduced without a specific semantic need. Error and success states may use
subtle functional colors, but they should remain desaturated and accessible.

## Typography

Typography carries most of the visual identity.

- Use the sans-serif stack for navigation, body copy, labels, controls, and direct statements.
- Use the serif stack for emphasis, reflective phrases, and selected product language.
- Major headlines combine precise sans-serif text with an italic serif phrase.
- Headline tracking is tight and line height is compact.
- Eyebrows and technical labels are small, uppercase, and widely tracked.
- Body copy should remain concise, readable, and lower contrast than headlines.

The current system font stacks avoid external font requests and should remain the default unless a
licensed brand typeface is intentionally adopted.

## Layout

- Use the shared `.shell` container for primary alignment.
- Preserve generous vertical spacing between major ideas.
- Favor asymmetric editorial grids on desktop.
- Use borders and alignment to create rhythm instead of decorative containers.
- Keep line lengths controlled, especially for explanatory copy.
- Allow sections to breathe. Do not fill open space simply because it is available.

The page should feel deliberately composed at every viewport, not like a desktop layout stacked on
mobile.

## Components

### Header

Keep the header minimal: text wordmark, a small number of anchors, and one waitlist action. Do not add
a complex navigation system unless the site grows enough to require it.

### Buttons

Buttons are rectangular, high contrast, and typographically simple. Avoid pills, gradients, oversized
icons, and ornamental hover effects.

### Notification Demonstration

The demonstration should show contextual inputs converging into one actionable notification. It may
evolve as the product interface matures, but it must remain calm, legible, and faithful to iPhone-first
behavior.

Several example moments may rotate through the final notification position, but only one notification
should be readable at a time. Treat them as alternative scenarios, not as a growing notification inbox.
Curved paths and small moving points may clarify how selected context reaches the final message.
When the example changes, update the surrounding signal labels and their selected or deferred states so
the visible inputs always explain the notification currently being composed.
Keep the signal cards and connection paths visible between examples. Give each scenario a distinct
arrangement, smoothly shifting the cards and reshaping their curves over 1.4 seconds. Crossfade the
changing labels and notification content rather than replaying the full signal-entry animation for
every scenario. Keep positional variation smaller on mobile so the notification stays within the viewport.

### Diagrams

Use fine lines, circles, sparse labels, and controlled motion. Diagrams should explain a product idea,
not act as background decoration.

The user-control diagram should present connected tools as a permission constellation around the user.
Show a useful range of sources and a mix of states such as connected, on, ask first, while using, and
off. This communicates breadth without implying that Calan receives unrestricted access.
Tool labels may gently drift around their resting positions with staggered 9–12 second cycles, while
the user remains stationary at the center. Keep labels upright, reduce travel on mobile, and disable
the drift entirely for reduced-motion users.

### Forms

Forms should ask for the minimum information required. The initial waitlist asks for email only. Keep
validation messages direct and place accessibility before visual novelty.

## Motion

Motion should communicate timing and convergence.

- Use slow, subtle entrances and small translations.
- Avoid bouncing, parallax, continuous decorative movement, or attention-seeking loops.
- The hero sequence may replay after its final notification has rested for twelve seconds. Each replay
  should repeat the full noise, selection, and message narrative rather than looping individual parts.
- When multiple notification examples are present, let each one rest for twelve seconds after the
  layout transition finishes before advancing.
  Restart the full filtering sequence only after the last example.
- Keep interactions responsive even when ambient animation is slow.
- Honor `prefers-reduced-motion` with a complete static experience.
- Content must remain understandable when JavaScript is unavailable.

## Editorial Voice

The approved voice is calm and precise.

- Explain the benefit before the technology.
- Use short sentences and concrete situations.
- Sound confident, never breathless or exaggerated.
- Emphasize usefulness, timing, restraint, and user control.
- Avoid AI cliches such as `revolutionary`, `supercharge`, `unlock`, and `10x`.
- Do not imply that Calan is always listening or knows more than the user has permitted.
- Treat privacy claims carefully. The current promise is explicit, revocable user control.

Examples should show Calan anticipating a need: leaving on time, adapting to traffic or weather,
noticing a relevant reply, or adjusting to a changed plan.

## Accessibility

- Preserve semantic landmarks and heading order.
- Maintain visible keyboard focus states.
- Meet WCAG AA contrast requirements for meaningful text and controls.
- Do not rely on animation, color, or position alone to communicate meaning.
- Keep form labels available to assistive technology.
- Test layouts at narrow mobile widths and with increased text size.

## Responsive Behavior

- Desktop layouts may use editorial asymmetry and sticky content.
- Tablet layouts should simplify grids before text becomes compressed.
- Mobile layouts should use one clear reading column and keep the notification demonstration legible.
- No viewport may introduce horizontal page scrolling.
- Primary actions must remain easy to reach and large enough to tap.

## Technical Guardrails

- Keep the site static-first and compatible with Cloudflare Pages.
- Prefer Astro, semantic HTML, and plain CSS over client-side framework code.
- Add client-side JavaScript only when it provides meaningful interaction.
- Do not add a UI framework or utility CSS library for isolated changes.
- Keep performance, SEO, and graceful degradation as first-class requirements.
- Continue using Cloudflare Pages Functions, D1, and Turnstile for the waitlist unless the product
  requirements explicitly change.

## Review Checklist

Before considering a visual change complete, confirm:

- The result still feels sober, elegant, monochrome, and editorial.
- The page communicates fewer, more useful interruptions.
- New copy uses the calm and precise voice.
- The desktop and mobile compositions both feel intentional.
- Keyboard, reduced-motion, and form states still work.
- The page has no horizontal overflow.
- `npm run build` passes without errors or warnings.
