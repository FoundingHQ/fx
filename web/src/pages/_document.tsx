import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { GA_TRACKING_ID } from "util/analytics";

const APP_NAME = process.env.APP_NAME;

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="referrer" content="origin" />
          <meta name="application-name" content={APP_NAME} />
          <meta name="robots" content="index, follow" />
          <meta property="fb:app_id" content="{FB_ID}" />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/favicon/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/favicon/safari-pinned-tab.svg"
            color="#111827"
          />
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <meta name="msapplication-TileColor" content="#111827" />
          <meta
            name="msapplication-config"
            content="/favicon/browserconfig.xml"
          />
          <meta name="theme-color" content="#111827" />

          <link
            rel="preload"
            href="/fonts/subset-HelveticaNowText-It.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/subset-HelveticaNowText-It.woff"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/subset-HelveticaNowText-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/subset-HelveticaNowText-Regular.woff"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/subset-HelveticaNowText-Bold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/subset-HelveticaNowText-Bold.woff"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
          <style
            dangerouslySetInnerHTML={{
              __html: `
                @font-face {
                  font-family: "HelveticaNow";
                  src: url(/fonts/subset-HelveticaNowText-It.woff2)
                      format("woff2"),
                    url(/fonts/subset-HelveticaNowText-It.woff) format("woff");
                  font-weight: 400;
                  font-style: italic;
                  font-display: fallback;
                }

                @font-face {
                  font-family: "HelveticaNow";
                  src: url(/fonts/subset-HelveticaNowText-Regular.woff2)
                      format("woff2"),
                    url(/fonts/subset-HelveticaNowText-Regular.woff)
                      format("woff");
                  font-weight: 400;
                  font-style: normal;
                  font-display: fallback;
                }

                @font-face {
                  font-family: "HelveticaNow";
                  src: url(/fonts/subset-HelveticaNowText-Bold.woff2)
                      format("woff2"),
                    url(/fonts/subset-HelveticaNowText-Bold.woff) format("woff");
                  font-weight: 700;
                  font-style: normal;
                  font-display: fallback;
                }
              `,
            }}
          />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
