
import type { AppProps } from 'next/app';
import MainLayout  from '../layouts/MainLayuout'; // Подставьте свой путь к компоненту макета
import "../styles/global.css"; 
import '../styles/general.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  );
}

export default MyApp;