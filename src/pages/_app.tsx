import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import React from 'react';
import { RecoilRoot } from 'recoil';

import { GlobalStyle } from '@/components/GlobalStyle';

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap"
          rel="stylesheet"
        />
      </Head>
      <GlobalStyle />
      <RecoilRoot>
        <NextNProgress />
        <Component {...pageProps} />
      </RecoilRoot>
    </React.Fragment>
  );
}

export default MyApp;
