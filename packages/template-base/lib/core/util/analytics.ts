import posthog from "posthog-js";

export const POSTHOG_TRACKING_ID =
  process.env.NEXT_PUBLIC_POSTHOG_TRACKING_ID || "";
export const POSTHOG_API_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_API_HOST || "https://app.posthog.com";

const isDev = process.env.NODE_ENV === "development";

export const initAnalytics = () => {
  try {
    posthog.init(POSTHOG_TRACKING_ID, {
      api_host: POSTHOG_API_HOST,
      debug: isDev,
    });
  } catch (e) {
    console.error(e);
  }
};

export const logPageView = () => {
  if (isDev) return;
  try {
    posthog.capture("Page View");
  } catch (e) {
    console.error(e);
  }
};

export const identify = (uid: string) => {
  if (isDev) return;
  try {
    posthog.identify(uid);
  } catch (e) {
    console.error(e);
  }
};

export const reset = () => {
  if (isDev) return;
  try {
    posthog.reset();
  } catch (e) {
    console.error(e);
  }
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
  try {
    posthog.capture(name, { category, label, value, interaction });
  } catch (e) {
    console.error(e);
  }
};
