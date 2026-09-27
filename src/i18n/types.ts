export interface SignalCopy {
  source: string;
  value: string;
}

export interface NotificationCopy {
  title: string;
  copy: string;
  sourceCount: string;
  sources: string;
  signals: SignalCopy[];
}

export interface LegalSectionCopy {
  title: string;
  body: string;
}

export interface LegalPageCopy {
  title: string;
  description: string;
  heading: string;
  lastUpdated: string;
  sections: LegalSectionCopy[];
}

export interface SiteCopy {
  meta: {
    title: string;
    description: string;
    applicationDescription: string;
    socialImageAlt: string;
  };
  common: {
    homeAriaLabel: string;
    navigationAriaLabel: string;
    languageLabel: string;
    skipToContent: string;
    backHome: string;
  };
  navigation: {
    howItWorks: string;
    yourControl: string;
    joinWaitlist: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    emphasis: string;
    intro: string;
    availability: string;
    scrollCue: string;
  };
  demo: {
    ariaLabel: string;
    liveContext: string;
    time: string;
    now: string;
    later: string;
    filterLabel: string;
    relevantNow: string;
    selectedCount: string;
    notificationsAriaLabel: string;
    pauseAnimation: string;
    resumeAnimation: string;
    scenarios: NotificationCopy[];
  };
  statement: {
    label: string;
    title: string;
    emphasis: string;
    copy: string;
    quietLine: string;
  };
  principles: {
    label: string;
    title: string;
    emphasis: string;
    items: Array<{ title: string; copy: string }>;
  };
  timeline: {
    label: string;
    title: string;
    emphasis: string;
    intro: string;
    ariaLabel: string;
    items: Array<{ time: string; label: string; copy: string }>;
  };
  control: {
    core: string;
    permissions: Array<{ name: string; state: string }>;
    label: string;
    title: string;
    emphasis: string;
    copy: string;
    privacyLink: string;
  };
  waitlist: {
    label: string;
    title: string;
    emphasis: string;
    copy: string;
    emailLabel: string;
    emailPlaceholder: string;
    submit: string;
    note: string;
    status: {
      invalidEmail: string;
      joining: string;
      subscribed: string;
      duplicate: string;
      security: string;
      unavailable: string;
      error: string;
    };
  };
  footer: {
    tagline: string;
    privacy: string;
    terms: string;
  };
  privacy: LegalPageCopy;
  terms: LegalPageCopy;
  notFound: {
    title: string;
    description: string;
    heading: string;
    copy: string;
    returnHome: string;
  };
}
