

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMaps, setActiveOfficePoint, setHovered, setOfficeCard } from '@/store/redusers/mapsSliceReduser';

const Card: React.FC = () => {
  const dispatch = useDispatch();
  const cardRef = useRef<HTMLDivElement>(null);
  const { officeCard, activeOfficePointCoords } = useSelector(selectMaps);
  const [isVisible, setIsVisible] = useState(false);
  const handleClickOutside = (e: MouseEvent) => {
    const points = document.querySelectorAll('.office_point');

    if (
      cardRef.current &&
      !cardRef.current.contains(e.target as Node) &&
      !Array.from(points).some((point) => point.contains(e.target as Node)) &&
      !Array.from(document.querySelectorAll('.select_maps')).some((elem) => elem.contains(e.target as Node))
    ) {
      points.forEach(point => {
        point.classList.remove('hidden');
      });
      dispatch(setOfficeCard(null));
      dispatch(setActiveOfficePoint(''));
      dispatch(setHovered(null));
    }
    
  };




  useEffect(() => {

    if (officeCard == null) {

      setIsVisible(false);


    }

    else setIsVisible(true);
  }, [activeOfficePointCoords, officeCard, dispatch]);

  useEffect(() => {

    document.addEventListener('mousedown', handleClickOutside);

    return () => {

      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={cardRef}
      className={` before:border-transparent

   
      drop-shadow-[0_3px_4px_rgba(0,0,0,0.23)]
      before:border-b-[#B0D311] before:border-r-[100px] 
      z-[5]
      before:transform before:rotate-180
      before:absolute

      before:rounded-b-3xl
      before:border-l-[100px]
      before:w-full
      before:z-[-1]
      before:-translate-x
      before:overflow-visible
      before:transition-all before:duration-300 before:ease-in-out 
      absolute w-full text-black w-screen max-w-[200px]  
    adaptive
      ${(isVisible) ? 'opacity-95 z-[1] before:bottom-[-50px] before:border-b-[60px] h-[180px] transition-all  duration-300 ease-in-out' : ' h-[20px] before:bottom-[0px] opacity-0 z-[-1] before:border-b-[0px]'} 
      `}
      style={{
        top: `calc(${Math.round(activeOfficePointCoords[0] - 199)}px)`,
        left: `calc(${Math.round(activeOfficePointCoords[1] - 85)}px)`
    }}><div className={`overflow-hidden flex items-center justify-center relative lg:absolute w-full bg-[#B0D311] duration-300 rounded-3xl ease-out  transition-height  ${isVisible ? 'opacity-100 h-[100%] top-[0%] ' : '100 h-[100%] top-[0%]'}`} >
        <div className={`w-full left-0 px-6`}>



          <p className="font-medium leading-5 text-[23px] pb-6 w-fit text-center w-full">{officeCard?.title}</p>
          <div className={`leading-5  z-[5] transition-all  duration-300 delay-500 ease-in-out  ${officeCard && isVisible ?'opacity-class':"opacity-0"}`}>
            <p className="text-left text-[16px] mb-3 font-normal w-fit">{officeCard?.adress1}</p>
            <p className="text-left text-[16px] flex flex-row font-normal w-fit">{officeCard?.city}, {officeCard?.index}</p>
            <p className="text-left text-[16px] font-normal w-fit"><span>{officeCard?.country}</span></p>
          </div>


        </div>
      </div>

    </div>
  );
};

export default Card;