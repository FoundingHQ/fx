import type { AppProps, NextWebVitalsMetric } from "next/app";
import type { NextPage } from "next";
import Router from "next/router";
import { ReactElement, ReactNode } from "react";
import { ProgressBar } from "components/ProgressBar";
import { QueryClientProvider } from "util/db";
import { AuthProvider } from "util/auth";
import { logPageView, logEvent } from "util/analytics";
import "tailwindcss/tailwind.css";

const progress = new ProgressBar();

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type Props = AppProps & {
  Component: Page;
};

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeError", progress.finish);
Router.events.on("routeChangeComplete", (url) => {
  logPageView(url);
  progress.finish();
});

export const reportWebVitals = ({
  id,
  name,
  label,
  value,
}: NextWebVitalsMetric) => {
  logEvent({
    action: name,
    category: label === "web-vital" ? "Web Vitals" : "Custom metric",
    value: Math.round(name === "CLS" ? value * 1000 : value),
    label: id,
    nonInteraction: true,
  });
};

const MyApp = ({ Component, pageProps }: Props) => {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <QueryClientProvider>
      <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>;
    </QueryClientProvider>
  );
};

export default MyApp;
