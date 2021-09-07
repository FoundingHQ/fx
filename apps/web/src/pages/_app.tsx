import type { AppProps, NextWebVitalsMetric } from "next/app";
import type { NextPage } from "next";
import { ThemeProvider } from "next-themes";
import Router from "next/router";
import { useEffect, ReactElement, ReactNode } from "react";

import { ProgressBar } from "@libs/ui";
import { QueryClientProvider } from "@libs/data-access/lib/query";
import { AuthProvider } from "@libs/data-access/actions/auth";
import { initAnalytics, logPageView, logEvent } from "@libs/util/analytics";

import "tailwindcss/tailwind.css";

const progress = new ProgressBar();

type Page<P = Record<string, unknown>> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type Props = AppProps & {
  Component: Page;
};

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeError", progress.finish);
Router.events.on("routeChangeComplete", () => {
  logPageView();
  progress.finish();
});

export const reportWebVitals = ({
  id,
  name,
  label,
  value,
}: NextWebVitalsMetric) => {
  logEvent({
    name,
    category: label === "web-vital" ? "Web Vitals" : "Custom metric",
    label: id,
    value: Math.round(name === "CLS" ? value * 1000 : value),
    interaction: false,
  });
};

const MyApp = ({ Component, pageProps }: Props) => {
  const getLayout = Component.getLayout || ((page) => page);

  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <ThemeProvider attribute="class">
      <QueryClientProvider>
        <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>;
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default MyApp;
