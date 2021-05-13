import { Config } from 'example/config';
import Head from 'next/head';

const { TITLE, DESCRIPTION, URL } = Config;

const Home = () => {
  return (
    <Head>
      <title>{TITLE}</title>
      <meta name="description" content={DESCRIPTION} />
      <link rel="canonical" href={URL} />

      <meta property="og:site_name" content={TITLE} />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:image" content={`${URL}/assets/ogp.png`} />
      <meta property="og:url" content={`${URL}/`} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ja_JP" />

      <meta name="twitter:url" content={`${URL}/`} />
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={DESCRIPTION} />
      <meta name="twitter:image" content={`${URL}/assets/ogp.png`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={TITLE} />
    </Head>
  );
};

export default Home;
