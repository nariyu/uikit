import Head from 'next/head';

const title = 'UI Toolkit';
const description = 'UI Toolkit';
const url = 'https://uitoolkit.vercel.app';

const Home = () => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:site_name" content={title} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${url}/assets/ogp.png`} />
      <meta property="og:url" content={`${url}/`} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ja_JP" />

      <meta name="twitter:url" content={`${url}/`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${url}/assets/ogp.png`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={title} />
    </Head>
  );
};

export default Home;
