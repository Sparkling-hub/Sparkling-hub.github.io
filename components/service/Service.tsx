
import React, { useEffect } from 'react';
import IService from '../../interface/service';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Service: React.FC<IService> = ({ content, header, image, button, index }) => {
	const uniqueId = `aos-${index}`;
	useEffect(() => {
		AOS.init({
			duration: 1000,
			once: false, 
			mirror: true,

		});


		AOS.refresh();
	}, []);

	return (
		<div className={`flex-col border-slate-100 border-[1px] pb-[50px] w-full lg:w-1/3 lg:px-[20px] h-full text-center 2xl:h-[700px] xl:h-[750px] lg:h-[800px] bg-white m-2 rounded-3xl shadow-lg`}
			data-aos-delay={200 * index}
			data-aos-once={true}
			data-aos-mirror={true}
			data-aos-offset={-1000}
			data-aos-anchor-placement="top-top"
			data-aos={`fade`}
			id={uniqueId}>
			<div className='service_icon flex justify-center w-96 lg:h-[200px] w-full p-4'>{image} </div>
			<div className='mb-4 lg:mb-8  flex items-first justify-center text-4xl text-medium lg:h-[80px]'>{header}</div>
			<div className='2xl:h-[300px] xl:h-[350px] text-xl px-[30px] lg:px-0 lg:h-[400px]'>{content}</div>
			<div className='flex justify-center my-2'>{button}</div>
		</div>
	);


};

export default Service;
