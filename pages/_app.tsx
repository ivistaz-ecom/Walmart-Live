import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { AppProps } from 'next/app';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Analytics />
      <SpeedInsights />
      <Component {...pageProps} />
    </>
  );
}
