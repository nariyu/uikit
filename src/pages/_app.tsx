import { ErrorBoundary } from 'example/components/errorboundary';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import { MainView } from '../example/components/mainview';

import '../styles/globals.scss';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
        />
      </Head>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
      <MainView />
    </RecoilRoot>
  );
};

export default App;
