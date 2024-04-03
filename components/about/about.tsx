
import React, { useEffect } from 'react';
import IAbout from '@/interface/IAbout';

import AOS from 'aos';
import 'aos/dist/aos.css';
const Benefit: React.FC<IAbout> = ({ content, header, number,margin }) => {
	const uniqueId = `aos-${number}`;
	useEffect(() => {
		AOS.init({
			duration: 2000,
			once: false, 
			mirror: true,

		});


		AOS.refresh();
	}, []);
	return (

		<div className={`justify-between items-center ${margin} flex relative lg:absolute w-full lg:w-fit`}data-aos-delay={500 * number}
		data-aos-once={true}
		data-aos-mirror={true}
		data-aos-offset={-number*100}
	
		data-aos={`fade`}
		id={uniqueId}> 
			<div className='lg:hidden bg-teal-500 w border-teal-600 border-[1px] font-medium text-2xl p-0.2 absolute rounded-full z-10 flex'>
				<div className='rounded-full justify-center border-black border-[1px] flex items-center bg-teal-700 w-20 bg-teal-800 h-20 text-center font-bold text-whit  text-5xl'>{number}</div>

			</div>
			<div className='lg:max-w-[70%] w-full flex-col flex justify-center lg:h-52 p-8 lg:pl-12 lg:pr-4 lg:py-2 bg-green-color rounded-4xl pl-14 relative  mx-10 my-5'>


				
				<div className='min-h-[60px] leading-8 p-0 lg:pl-5 flex flex-col'>
					<div className='text-2xl text-primary-darkTeal font-bold uppercase'>{header}</div>
					<div className='text-lg'>{content}</div></div>
			</div>


		</div>




	);
};

export default Benefit;

