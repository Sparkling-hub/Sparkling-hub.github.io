

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMaps, setOfficeCard } from '@/store/redusers/mapsSliceReduser';
import Card from '@/components/card';
import mapsData from "@/data/data-maps";
const MapField: React.FC = () => {
  const dispatch = useDispatch();
  const {  activeOfficePoint} = useSelector(selectMaps);

  useEffect(() => {


    let currentCard = mapsData[0]?.officeCards?.find((card) => card.id === activeOfficePoint);
    if (currentCard) dispatch(setOfficeCard(currentCard));
   

    return () => {

    };
  }, [activeOfficePoint, mapsData, dispatch]);



  return (
    <div className="map-container  w-3/4 pt-40 lg:col-span-9 lg:gh-4 lg:gh-4 lg:p-14 pt-global lg:block relative">
      <div className='relative'>
        {mapsData[0] ? mapsData[0].image : ''}    
        
        <Card /> 
      </div>
      

  
    </div>
  );
};

export default MapField;
