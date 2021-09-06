import posthog from "posthog-js";

export const POSTHOG_TRACKING_ID =
  process.env.NEXT_PUBLIC_POSTHOG_TRACKING_ID || "";
export const POSTHOG_API_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_API_HOST || "https://app.posthog.com";

const isDev = process.env.NODE_ENV === "development";

export const initAnalytics = () => {
  posthog.init(POSTHOG_TRACKING_ID, {
    api_host: POSTHOG_API_HOST,
  });
};

export const logPageView = () => {
  if (isDev) return;
  posthog.capture("$pageview");
};

export const identify = (uid: string) => {
  if (isDev) return;
  posthog.identify(uid);
};

type Event = {
  name: string;
  category: string;
  label: string;
  value: number;
  interaction: boolean;
};

export const logEvent = ({
  name,
  category,
  label,
  value,
  interaction,
}: Event) => {
  if (isDev) return;
  posthog.capture(name, { category, label, value, interaction });
};
