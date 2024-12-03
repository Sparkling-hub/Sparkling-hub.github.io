
import React, { ReactNode } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';


interface MainLayoutProps {
	children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {

	return (

		<div className='w-full min-w-[350px] font-Roboto'>
	
			<Navbar />
			<main>{children}</main>
			<Footer />
		</div>

	);

};

export default MainLayout;