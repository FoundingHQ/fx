export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID!;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const logPageView = (url: string) => {
  if (!window.gtag) return;
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/cookies-user-id
export const identify = (uid: string) => {
  if (!window.gtag) return;
  window.gtag("config", GA_TRACKING_ID, {
    user_id: uid,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
type Event = {
  action: string;
  category: string;
  label: string;
  value: number;
  nonInteraction: boolean;
};

export const logEvent = ({
  action,
  category,
  label,
  value,
  nonInteraction,
}: Event) => {
  if (!window.gtag) return;
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
    non_interaction: nonInteraction,
  });
};
