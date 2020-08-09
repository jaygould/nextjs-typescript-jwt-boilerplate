import { AppProps } from 'next/app';
import * as React from 'react';

import { AuthProvider } from '../services/Auth.context';
import { GlobalMessagingProvider } from '../services/GlobalMessaging.context';

import './global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <GlobalMessagingProvider>
        <Component {...pageProps} />
      </GlobalMessagingProvider>
    </AuthProvider>
  );
}

export default MyApp;
