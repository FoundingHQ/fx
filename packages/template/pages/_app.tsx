import type { AppProps, NextWebVitalsMetric } from "next/app";
import type { NextPage } from "next";
import Router from "next/router";
import { useEffect } from "react";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "@util/query";
import { initAnalytics, logPageView, logEvent } from "@util/analytics";

type Page<P = Record<string, unknown>> = NextPage<P>;

type Props = AppProps & {
  Component: Page;
};

Router.events.on("routeChangeComplete", logPageView);

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
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default MyApp;
