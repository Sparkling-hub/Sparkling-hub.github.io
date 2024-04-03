import React from 'react';
import dataStartups from '@/data/data-sections/data-section-startup/data-startup-icons';
import StartupIcon from '@/components/startup-icon';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';


const StartupTechnologiesIconList: React.FC = () => {

  const totalItems = dataStartups.length;
  const middleIndex = Math.ceil(totalItems / 2);
  
  const firstPart = dataStartups.slice(0, middleIndex);
  const secondPart = dataStartups.slice(middleIndex);
  const duplicatedIconsOne = [...firstPart, ...firstPart];
  const duplicatedIconsTwo = [...secondPart, ...secondPart];
  return (
    <div className='flex flex-col justify-center items-center  overflow-hidden block 2xl:relative 2xl:w-[1500px] right-[110px]'>
      <div className='container marquee-track'>
        <div className='grid grid-flow-col grid-cols-1 grid-rows-1 gap-4 w-fit iconContainer marquee-track'>

        {duplicatedIconsOne.map((startup, index) => (
  <div className='startup-icon' key={uuidv4()}> 
    <StartupIcon {...startup} />
  </div>
))}
        </div>
      </div>
      <div className='container-reverse marquee-track-reverse'>
        <div className='grid grid-flow-col grid-cols-1 grid-rows-1 gap-4 w-fit iconContainer marquee-track'>

          {duplicatedIconsTwo.map((startup, index) => (
            <div className='startup-icon' key={uuidv4()}> 
            <StartupIcon {...startup} />
          </div>
          ))}
        </div>
      </div>
      <div className='m-20 p-4 underline underline-offset-8 text-white text-xl font-bold hidden lg:flex text-center'>
        <Link className='' href='/contact'>
          The technology you need isn&apos;t here? Contact us to see if we can help!
        </Link>
      </div>
    </div>
  );
};

export default StartupTechnologiesIconList;
