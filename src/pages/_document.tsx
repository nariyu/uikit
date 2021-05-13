import { Config } from 'example/config';
import Document, {
  Html,
  Main,
  Head,
  NextScript,
  DocumentContext,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ja">
        <Head>
          <meta
            name="format-detection"
            content="telephone=no, email=no, address=no"
          />

          {/* windows */}
          <meta
            name="msapplication-square70x70logo"
            content="/favicons/site-tile-70x70.png"
          />
          <meta
            name="msapplication-square150x150logo"
            content="/favicons/site-tile-150x150.png"
          />
          <meta
            name="msapplication-wide310x150logo"
            content="/favicons/site-tile-310x150.png"
          />
          <meta
            name="msapplication-square310x310logo"
            content="/favicons/site-tile-310x310.png"
          />
          <meta name="msapplication-TileColor" content="#000" />
          {/* safari */}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="#000" />
          <meta name="apple-mobile-web-app-title" content={Config.TITLE} />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicons/apple-touch-icon-180x180.png"
          />
          {/* 一般 */}
          <meta name="application-name" content={Config.TITLE} />
          <meta name="theme-color" content="#fff" />
          <meta name="description" content="This is UI Toolkit" />
          <link rel="icon" sizes="192x192" href="/favicons/icon-192x192.png" />
          <link rel="icon" href="/favicons/favicon.ico" />
          <link rel="manifest" href="/manifest-light.json" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
