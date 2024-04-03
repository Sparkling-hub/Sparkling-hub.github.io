
import IStartupStepItem from '../../interface/IStartupStepItem';
import React, { useEffect } from 'react';

import 'aos/dist/aos.css';
import AOS from 'aos';

const StartupStepItem: React.FC<IStartupStepItem> = ({ title, subtext, index, highlighted }) => {


	useEffect(() => {
		AOS.init({
			duration: 1000,
			offset: 100,
	
		});

			AOS.refresh();
		
		  
	}, []);

	return (
		<li className={`flex-col px-0 lg:px-40 flex items-center relative  pb-[5rem]`}>
			{highlighted ?
				<svg width="477" height="310" viewBox="0 0 477 402" className={`absolute ${index % 2 ? "top-7 right-[5%]" : 'top-7 left-[5%]'} hidden lg:block`} fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: index % 2 ? '' : 'scale(-1, 1)' }}>
					<path
						d="M0 3H434C456.091 3 474 20.9086 474 43V359C474 381.091 456.091 399 434 399H0"
						stroke="#1A5858"
						strokeWidth="5"
						strokeDasharray="1500" strokeDashoffset="1500"
					>
						<animate
							attributeName="stroke-dashoffset"
							values="1500;0"
							dur="1s"
							begin="0s"
							repeatCount="1"
							fill="freeze"
						/>
					</path>
				</svg> : ''}


				<div className={`s-b-s-title rounded-3xl p-1 flex bg-primary-yellow border-[3px] border-primary-darkTeal z-20`}  data-aos-delay={200 * index}
			data-aos-once={true}
			data-aos-mirror={true}
			data-aos-offset={-1300}
			data-aos-anchor-placement="top-top"
			data-aos={`fade-down`}>
				<div className={`text-primary-darkTeal text-center w-[315px] h-[50px] flex items-center justify-center font-bold text-2xl ${highlighted ? 'highlight' : ''}`}>
					{title}
				</div>
			</div>


			<div className='s-b-s-text text-center'>
				<div className='mx-5 text-primary-darkTeal  h-auto lg:h-[10rem] pt-5 px-22 text-xl font-normal'>{subtext}</div>

			</div>
		</li>
	);
};

export default StartupStepItem;	