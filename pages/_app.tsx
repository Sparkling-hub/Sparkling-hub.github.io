

import type { AppProps } from 'next/app';
import "../styles/global.css";
import '../styles/general.scss';
import { Provider } from 'react-redux';
import store from '@/store/store';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {

	return (

		<Provider store={store}>
			<Head>
				<title>Sparkling</title>
				<meta name="author" content="Sparkling" />
				<meta property="og:title" content="Sparkling,Co" />
				<meta property="og:image" content="/S.svg" />
				<meta property="og:url" content="https://www.sparkling.co.com/" />
				<meta property="og:type" content="website" />
				<meta property="og:description" content="Sparkling Co. is an industry expert in digital services with over a decade of field experience in Software Development. Our expertise extends to providing dedicated teams of developers and project managers for both in-house project as well as in Team Augmentation, where our experts seamlessly integrate into client-led endeavours. Headquartered in Switzerland our branches reach out across Europe and North Africa, from London to Tunis." />
				<meta name="keywords" content="web development, sparkling, programming, frontend, backend, website, careers, work" />

				<meta property="twitter:title" content="Sparkling.Co" />
				<meta property="twitter:image" content="/S.svg" />
				<meta property="twitter:url" content="https://www.sparkling.co.com/" />
				<meta property="twitter:type" content="website" />
				<meta property="og:description" content="Sparkling Co. is an industry expert in digital services with over a decade of field experience in Software Development. Our expertise extends to providing dedicated teams of developers and project managers for both in-house project as well as in Team Augmentation, where our experts seamlessly integrate into client-led endeavours. Headquartered in Switzerland our branches reach out across Europe and North Africa, from London to Tunis." />
				
				<meta name="keywords" content="web development, sparkling, programming, frontend, backend, website, careers, work" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta httpEquiv="Content-Language" content="en" />
				<meta name="description" content="Sparkling Co. is an industry expert in digital services with over a decade of field experience in Software Development. Our expertise extends to providing dedicated teams of developers and project managers for both in-house project as well as in Team Augmentation, where our experts seamlessly integrate into client-led endeavours. Headquartered in Switzerland our branches reach out across Europe and North Africa, from London to Tunis." />
				<meta name="keywords" content="web development, sparkling, programming, frontend, backend, website, careers, work" />
				<link rel="icon" href="/S.svg" />
				<meta property="og:image" content="/S.svg" />

			</Head>
			<Component {...pageProps} />
		
		</Provider>


	);

}

export default MyApp;