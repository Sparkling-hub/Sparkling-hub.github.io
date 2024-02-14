
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectMaps,
	setCurrentMap,
	setHovered,
	setLastHovered,
	setActiveOfficePoint,
	setActiveOfficePointCoords,
} from '@/store/redusers/mapsSliceReduser';
import MapField from '@/components/map-field';
import MapSelectionSettings from '@/components/map-selection-setting';
import { updateElementPosition } from "../helper/updateElementPosition";

const InteracticeMaps: React.FC = () => {
	const dispatch = useDispatch();
	const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);
	const { currentMap, hovered, lastHovered, activeOfficePoint } = useSelector(selectMaps);

	useEffect(() => {
		
		let points = document.querySelectorAll('.office_point');

		setupPointEventListeners(points);

		
		handleHover();
	

		if (lastHovered && hovered !== lastHovered || (lastHovered && !hovered)) {
			let elements = document.getElementById(lastHovered)?.children;
	
			if (elements) {
				for (const element of elements) {
					element.classList.remove('scale-125');
			
				
			
				}
			}
		}

	

		return () => {
			removePointEventListeners(points);
		
		};
	}, [currentMap, hovered, lastHovered, activeOfficePoint, dispatch]);

	const handleHover = () => {
		let points = document.querySelectorAll('.office_point');
		if (!points.length) return;
	
		if (hovered) {
			let elements = document.getElementById(hovered)?.querySelectorAll('svg');
	
			if (elements && !lastHovered) {
				for (const element of elements) {
					element.classList.add('svg-scale');
;
					dispatch(setLastHovered(hovered));
				}
			}
		} else {
			let lastHoveredElement = document.getElementById(lastHovered)?.querySelectorAll('svg');
	
			if (lastHoveredElement) {
				for (const element of lastHoveredElement) {
					element.classList.remove('svg-scale');
				}
				dispatch(setLastHovered(''));
			}
		}
	};
	
	
	
	
	
	

	const setupPointEventListeners = (points: NodeListOf<Element>) => {
		points.forEach((element) => {
			element.addEventListener('click', handlePointsClick);
			element.addEventListener('mouseover', handleHoverOver);
			element.addEventListener('mouseout', handleHoverOut);
		});
	};

	const removePointEventListeners = (points: NodeListOf<Element>) => {
		points.forEach((element) => {
			element.removeEventListener('click', handlePointsClick);
			element.addEventListener('mouseover', handleHoverOver);
			element.addEventListener('mouseout', handleHoverOut);
		});
	};



	const handlePointsClick = (e: any) => {		
		let officeId = e.currentTarget.id;
		let points = document.querySelectorAll('.office_point');
	


		for (const element of points) {
			element.classList.remove('hidden');
		}
		e.currentTarget.classList.add('hidden')
		dispatch(setActiveOfficePointCoords(updateElementPosition(officeId)));
		dispatch(setActiveOfficePoint(officeId));
		
	};

	const handleHoverOver = (e: any) => {
		let officeId = e.currentTarget.id;
		e.currentTarget.classList.add('hidden');
		let points = document.querySelectorAll('.office_point');
		for (const element of points) {
		  element.classList.remove('hidden');
		}
  
		if (hoverTimer) {
		  clearTimeout(hoverTimer);
		}
	
		const newTimer = setTimeout(() => {
	
	
	
		  dispatch(setActiveOfficePointCoords(updateElementPosition(officeId)));
		  dispatch(setActiveOfficePoint(officeId));
		}, 100);
	

		setHoverTimer(newTimer);
	
		e.stopPropagation();
	  };
	

	
	

	const handleHoverOut = (e: any) => {
		if (hoverTimer) {
			clearTimeout(hoverTimer);
			setHoverTimer(null);
		  }
		dispatch(setHovered(null));
	
	};


	  
	  
	return (
		<div className="flex-section block_map relative  max-w-screen-2xl ">
			<div className="absolute inset-0 z-behind"></div>
			<div className="absolute top-[-100px]" id="section-12"></div>
			<div className="fade-in cubic relative">
				<div className="flex relative flex-row px-global gap-x-global flex">
					<MapField />
					<MapSelectionSettings />
				</div>
			</div>
		</div>
	);
};

export default InteracticeMaps;