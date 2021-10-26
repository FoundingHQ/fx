import NextDocument, { Html, Head, Main, NextScript } from "next/document";
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="referrer" content="origin" />
          <meta name="application-name" content={APP_NAME} />
          <meta name="robots" content="index, follow" />
          <meta property="fb:app_id" content="{FB_ID}" />
          <meta
            name="google-site-verification"
            content="uEX7VBn7i9-3Lnxpzs-DfP2ezAc3TxmYg-puP0NGq6k"
          />

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
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}