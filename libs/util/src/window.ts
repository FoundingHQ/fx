const mockLocation = {
  origin: process.env.NEXT_PUBLIC_APP_URL,
  href: process.env.NEXT_PUBLIC_APP_URL,
  protocol: "https:",
  host: "",
  hostname: "",
  port: "",
  pathname: "",
  search: "",
  hash: "",
};

export const location =
  typeof window !== "undefined" ? window.location : mockLocation;

export const localStorage = {
  getItem: (key: string) => {
    if (typeof window !== "undefined" && window.localStorage) {
      const value = window.localStorage.getItem(key);
      try {
        return value ? JSON.parse(value) : null;
      } catch (error) {
        return value;
      }
    }
  },
  setItem: (key: string, value: any) => {
    if (typeof window !== "undefined" && window.localStorage) {
      return window.localStorage.setItem(key, JSON.stringify(value));
    }
  },
  removeItem: (key: string) => {
    if (typeof window !== "undefined" && window.localStorage) {
      return window.localStorage.removeItem(key);
    }
  },
};
