

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMaps, setActiveOfficePoint, setHovered, setOfficeCard } from '@/store/redusers/mapsSliceReduser';
import Card from '@/components/card';
import mapsData from "@/data/data-maps";
const MapField: React.FC = () => {
  const dispatch = useDispatch();
  const {  activeOfficePoint, hovered} = useSelector(selectMaps);

  useEffect(() => {
    let mapContainer = document.querySelector('.map-container');


    let currentCard = mapsData[0]?.officeCards?.find((card) => card.id === activeOfficePoint);
    if (currentCard) dispatch(setOfficeCard(currentCard));

    return () => {
      mapContainer?.removeEventListener('click', handleMapsClick);
    };
  }, [activeOfficePoint, mapsData, dispatch]);

  const handleMapsClick = (e: any) => {
    
    if (activeOfficePoint) {dispatch(setActiveOfficePoint(''));
    dispatch(setOfficeCard(null));
    dispatch(setHovered(null))
  
    e.stopPropagation();}
  };

  return (
    <div className="map-container  max-w-screen-2xl  pt-40 lg:col-span-9 lg:gh-4 lg:gh-4 lg:p-14 pt-global lg:block relative">
      <div className='lg:scale-90'>
        {mapsData[0] ? mapsData[0].image : ''}
      </div>
      

      <Card /> 
    </div>
  );
};

export default MapField;
