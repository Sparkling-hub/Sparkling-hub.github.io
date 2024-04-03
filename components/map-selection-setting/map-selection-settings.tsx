

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMaps, setHovered, setActiveOfficePoint, setActiveOfficePointCoords } from '@/store/redusers/mapsSliceReduser';
import mapsData from "@/data/data-maps";
import { updateElementPosition } from '../helper/updateElementPosition';

const MapSelectionSettings: React.FC = () => {
	const dispatch = useDispatch();
	const { hovered, activeOfficePoint } = useSelector(selectMaps);
	const handlePointsClick = (activePoint: any) => {
   
        const hoveredElements = document.querySelectorAll('.office_point');
       
		for (const element of hoveredElements) {
			element.classList.remove('hidden');
	
		}
		dispatch(setActiveOfficePointCoords(updateElementPosition(activePoint)));    
        dispatch(setActiveOfficePoint(activePoint));

    };
	
	const handleResize = () => {
		if (activeOfficePoint) {
		  dispatch(setActiveOfficePointCoords(updateElementPosition(activeOfficePoint)));
		}
	  };
	useEffect(() => {
		
	
		window.addEventListener('resize', handleResize);
	
		return () => {
		  window.removeEventListener('resize', handleResize);
		};
	  }, [dispatch]);
	
	  const handleHoverOut = () => {
		
		dispatch(setHovered(null));
	
	};

	return (
	  <div className="flex flex-col relative w-1/4 m-auto">
		
  
		<div className={`grid grid-cols-1 lg:grid-cols-1 xl:border-b-0  xl:items-start w-full items-center`}>
		{mapsData[0]?.officeCards
  ?.map(card => ({ ...card, city: card.city === "Ariana" ?card.country : card.city }))
  .sort((a, b) => a.city.localeCompare(b.city))
  .map((card) => (
    <button
      key={card.id}
	  
	  className={`bg-[#285C5C] select_maps text-center duration-200 col-span-1 p-3 my-1.5 text-[24px] text-[#AECA13] rounded-4xl w-full hover:!opacity-75 hover:!text-[#AECA13]
        ${hovered == card.id ? 'text-primary-light' : ''} ${activeOfficePoint == card.id ? 'opacity-80' : ''} `}
      onMouseEnter={() => handlePointsClick(card.id)}
      onMouseLeave={() => {handleHoverOut()}}
      onClick={() => handlePointsClick(card.id)}
    >
      {card.city=="Ariana"?card.country:card.city}
    </button>
  ))}

		</div>
	  </div>
	);
  };
  
  export default MapSelectionSettings;