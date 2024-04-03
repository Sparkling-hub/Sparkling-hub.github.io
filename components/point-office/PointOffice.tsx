

import IPointOffice from '@/interface/IPointOffice';
import React from 'react';


const PointOffice: React.FC<IPointOffice> = ({ officeCard, hovered, activeOfficePoint, setHovered, setActiveOfficePoint }) => {
	
	
	return (
		<button
            key={officeCard?.id}
            id={officeCard?.id}
            className={`${officeCard} absolute`}
            >

            <div
              className={` absolute
                          w-2.5 
                          h-2.5                    
                          rounded-full 
                          ${hovered === officeCard?.id ?
									// "-translate-x-1/2 -translate-x-1/2 z-40 cursor-pointer duration-200 group w-3.5 h-3.5 z-50" 
									"animate-ping bg-active-office-color"
									:
									officeCard}
                          `}
			 

            ></div>
            <div
              className={` absolute
                          w-2.5 
                          h-2.5                   
                          rounded-full 
						  ${hovered === officeCard?.id ?
							"bg-active-office-color"
							:
							officeCard}
						  
                          `}
            ></div>
          </button>

		
	);
};

export default PointOffice;
