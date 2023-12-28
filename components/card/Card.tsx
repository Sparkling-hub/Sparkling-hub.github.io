

import ICard from '@/interface/ICard';
import React, { useEffect, useState } from 'react';


const Card: React.FC<ICard> = ({ officeCard, setActiveOfficePoint }) => {

	const [isVisible, setIsVisible] = useState(false);
	useEffect(() => {
		
		setIsVisible(true);

	  }, []);
	

	const handleClick = (e: any) => {

		
		setActiveOfficePoint("")
		e.stopPropagation()
	
	  };
	
	return (

		<div className={` ${isVisible ? 'h-96 ' : 'h-0'}  lg:absolute z-[80]  text-black w-screen lg:max-w-[280px] max-lg:!left-0   lg:-translate-x-full lg:-ml-3 lg:-translate-y-full lg:-mt-3 `} >
		<div className={` ${officeCard?.top} ${isVisible ? 'h-96 opacity-95 top-0' : 'h-0 top-100%'} lg:absolute w-full bg-primary-dark duration-[500ms] overflow-hidden lg:ease-out lg:delay-[350ms]`} >
		  <div className={` p-global lg:absolute w-full left-0  p-8  overflow-hidden bottom-full `}>
			<button className="absolute top-5% right-5% z-10 h-4 w-4 " onClick={handleClick}>
			  <div className="content-center icon-wrap" >
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				  <path d="M19 19L5 5" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square"></path>
				  <path d="M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square"></path>
				</svg>
			  </div>
			</button>
			<p className="text-left font-medium text-3xl pb-8">{officeCard?.title}</p>
			<div>
			  <p className="text-left text-xl mb-4 font-medium">{officeCard?.adress1}</p>
			  <p className="text-left text-xl mb-4 font-medium">{officeCard?.city}, {officeCard?.index}</p>
			  <p className="text-left text-xl mb-4 font-medium"><span>{officeCard?.country}</span> </p>
			  </div>
		  </div>
		</div>
		<div className={`transition-opacity duration-200 delay-150 ${isVisible ? 'opacity-100' : 'opacity-0'} absolute h-[2px] bg-primary-dark z-10  right-0 bottom-0 w-full `}></div>
		<div className="absolute pointer-events-none overflow-hidden duration-[150ms] -right-[1.95rem] -bottom-[1.95rem] w-8 h-8 lg:delay-0">
		  <div className="absolute w-12 h-[2px] bg-primary-dark left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 lg:rotate-45"></div>
		</div>
	  </div>
		
	);
};

export default Card;