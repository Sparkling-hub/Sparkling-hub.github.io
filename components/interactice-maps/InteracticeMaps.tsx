import mapsData from "@/data/data-maps";
import React, { useEffect } from 'react';
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
		e.currentTarget.classList.add('hidden');
		dispatch(setActiveOfficePointCoords(updateElementPosition(officeId)));
		dispatch(setActiveOfficePoint(officeId));
	  
	};

	const handleHoverOver = (e: any) => {
		
		dispatch(setHovered(e.currentTarget.closest('.office_point').id));

	};

	const handleHoverOut = (e: any) => {
		
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