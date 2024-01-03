import mapsData from "@/data/data-maps";
import IMaps from "@/interface/IMaps";
import { useEffect, useState } from "react";
import MapSelectionSettings from "../map-selection-setting";
import MapField from "../map-field";


const InteracticeMaps: React.FC = () => {

	const [currentMap, setCurrentMap] = useState<IMaps | undefined>();
	const [hovered, setHovered] = useState<string | null>(null);
	const [lastHovered, setLastHovered] = useState<string>('');
	const [activeOfficePoint, setActiveOfficePoint] = useState<string | null>(null);
	const [activeOfficePointCoords, setActiveOfficePointCoords] = useState<number[]>([]);

	
	
	useEffect(() => {

		const foundMap = mapsData.find((mapItem) => mapItem.id === "world_all");
		setCurrentMap(currentMap || foundMap);

		const points = document.querySelectorAll('.office_point');

		window.addEventListener('resize', () => updateElementPosition(activeOfficePoint));
		window.addEventListener('scroll', () => updateElementPosition(activeOfficePoint));

		handleHover()
		setupPointEventListeners(points)

		if (lastHovered && hovered != lastHovered || lastHovered && !hovered) {

			let elements = document.getElementById(lastHovered)?.children

			if (elements) {
				for (const element of elements) {
					element.classList.toggle('hidden');
					element.classList.toggle('block');
					setLastHovered("");
				}
			}
		}		

		if (activeOfficePoint) {
			updateElementPosition(activeOfficePoint)			
		}
		
		return () => {
			removePointEventListeners(points);
    		removeWindowEventListeners();
		};
	}, [currentMap, hovered, lastHovered, activeOfficePoint]);


	const handleHover = () =>{
		if (hovered) {
			let elements = document.getElementById(hovered)?.children
			if (elements && !lastHovered) {
				for (const element of elements) {
					element.classList.toggle('hidden');
					element.classList.toggle('block');
					setLastHovered(hovered)
				}
			}
		}
	}
	const setupPointEventListeners = (points: NodeListOf<Element>) => {

		points.forEach((element) => {
			element.addEventListener('click', handleMapsClick);
			element.addEventListener('mouseover', handleHoverOver);
			element.addEventListener('mouseout', handleHoverOut);

		});

	}
	const removePointEventListeners = (points: NodeListOf<Element>) => {
		points.forEach((element) => {
			element.removeEventListener('click', handleMapsClick);
		});
	}
	const removeWindowEventListeners = () => {
		window.removeEventListener('resize', () => updateElementPosition(activeOfficePoint));
		window.removeEventListener('scroll', () => updateElementPosition(activeOfficePoint));
	}







	const handleMapsClick = (e: any) => {		

		let officeId = e.currentTarget.id
		updateElementPosition(officeId)
		setActiveOfficePoint(officeId)

	};
	const handleHoverOver = (e: any) => {

		let elems = e.currentTarget.children
		if (elems[0].classList.contains("block")) setHovered(e.currentTarget.id)

		elems[0].classList.add('hidden');
		if (elems[0].classList.contains('block')) elems[0].classList.remove('block');

		for (let i = 1; i < elems.length; i++) {

			elems[0].classList.add('block');
			if (elems[0].classList.contains('hidden')) elems[0].classList.remove('hidden');
		}


	};
	const handleHoverOut = (e: any) => {

		let elems = e.currentTarget.children
		setHovered("")

		elems[0].classList.add('block');
		if (elems[0].classList.contains('hidden')) elems[0].classList.remove('hidden');

		for (let i = 1; i < elems.length; i++) {

			elems[0].classList.add('hidden');
			if (elems[0].classList.contains('block')) elems[0].classList.remove('block');
		}


	};
	const updateElementPosition = (activePoint: string | null): void => {
		
		if(!activePoint) return
		const svgPoint = document.getElementById(activePoint);		
		if (svgPoint) {

			const rect = svgPoint?.getBoundingClientRect();
			const topCoordinate = rect.top;
			const leftCoordinate = rect.left;

			setActiveOfficePointCoords([topCoordinate, leftCoordinate])

		}

	};


	const ChangeMap = (e: React.MouseEvent<HTMLDivElement>) => {

		const foundMap = mapsData.find((mapItem) => mapItem.id === e.currentTarget.id);
		setCurrentMap(foundMap);

	};

	return (
		<div className="flex-section block_map relative">
			<div className="absolute inset-0 z-behind"></div>
			<div className="absolute top-[-100px]" id="section-12"></div>
			<div className="fade-in cubic reveal">
				<div className="grid relative grid-cols-12 px-global gap-x-global">

					<MapField currentMap={currentMap}
						ChangeMap={ChangeMap}
						hovered={hovered}
						setHovered={setHovered}
						activeOfficePoint={activeOfficePoint}
						setActiveOfficePoint={setActiveOfficePoint}
						activeOfficePointCoords = {activeOfficePointCoords}
					/>
					<MapSelectionSettings currentMap={currentMap}
						ChangeMap={ChangeMap}
						hovered={hovered}
						setHovered={setHovered}
						activeOfficePoint={activeOfficePoint}
						setActiveOfficePoint={setActiveOfficePoint}
					/>

				</div>
			</div>
		</div>

	);
};

export default InteracticeMaps;
