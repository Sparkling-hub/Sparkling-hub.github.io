

import React from 'react';
import type SectionType from '../../interface/section';


const Section: React.FC<SectionType> = ({ header, content, image, button, background, id, curvedClass }) => {

	return (

		<section className={`flex items-center justify-center relative  ${background} ${curvedClass} before:-top-calc py-10 custom-3xl `} id={id}>
			<div className='max-w-screen-xl w-full items-start mx-9 mb-4 px-1'>

				<div className=' flex items-start justify-center flex-col justify-center  z-[10]'>

					<div className='flex items-center whitespace-normal w-full  lg:flex-row flex-col'>
						<div className='flex justify-center flex-col w-full items-center lg:items-start'>
							<div className='lg:text-left text-center w-full text-5xl  z-[10]'>{header}</div>

							{!image ? null : <div className='w-fit  flex lg:hidden z-[10 ] p-8'>  {image}

							</div>}
							<div className='text-left w-full  z-[20]'>{content}</div>
							{button ? <div className=' h-full   py-12 w-full'>


						{button}
					</div>
						:
						null
					}
						</div>

						{!image ? null : <div className='content-image w-full hidden lg:flex  z-[10] p-8'>  {image}

						</div>}
					</div>



					


				</div>

			</div>


		</section>


	);
};

export default Section;
