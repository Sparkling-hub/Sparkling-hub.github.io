

import React from 'react';
import ISoftwareData from '@/interface/ISoftwareData';

const Benefit: React.FC<ISoftwareData> = ({ header, content, number }) => {

	return (

		<div className={`flex flex-col bg-gray-100 rounded-3xl px-5 m-5 w-[500px] lg:h-[200px] h-auto items-start`}>
			<div className='rounded-full bg-primary-lightTeal flex w-fit items-center mb-4 mt-4 mx-2 p-[1px] text-xl font-bold'>
				<div className='flex items-center justify-center rounded-full bg-white w-12 h-12 text-primary-lightTeal'>
					{number}
				</div>
				<h3 className='ml-4 mr-7 text-white'>{header}</h3>
			</div>
			<div className='px-2 pb-4 text-primary-darkTeal'>{content}</div>

		</div>




	);
};

export default Benefit;

