import mapsData from "@/data/data-maps";
import IMaps from "@/interface/IMaps";
import { useEffect, useState } from "react";
import MapSelectionSettings from "../map-selection-setting";
import MapField from "../map-field";



const InteracticeMaps: React.FC = () => {

	const [currentMap, setCurrentMap] = useState<IMaps | undefined>();

	useEffect(() => {

		const foundMap = mapsData.find((mapItem) => mapItem.id === "world");
		setCurrentMap(currentMap || foundMap);
		const mapItems = document.querySelectorAll('.item-map');
		mapItems.forEach((element) => {
			element.addEventListener('click', handleMapsClick);
		});

		return () => {
			mapItems.forEach((element) => {
				element.removeEventListener('click', handleMapsClick);
			});
		};
	}, [currentMap]);

	const handleMapsClick = (e: any) => {

		const foundMap = mapsData.find((mapItem) => mapItem.id === e.currentTarget.id);		
		setCurrentMap(foundMap);

	};

	const ChangeMap = (e: React.MouseEvent<HTMLDivElement>) => {

		const foundMap = mapsData.find((mapItem) => mapItem.id === e.currentTarget.id);		
		setCurrentMap(foundMap);

	};

	return (
		<div className="flex-section block_map relative has-dark-green-bg">
			<div className="bg-dark-green absolute inset-0 z-behind"></div>
			<div className="absolute top-[-100px]" id="section-12"></div>
			<div className="fade-in cubic reveal">
				<div className="grid relative grid-cols-12 px-global gap-x-global">

					<MapField currentMap={ currentMap } ChangeMap={ ChangeMap }/>
					<MapSelectionSettings currentMap={ currentMap }/>

				</div>
			</div>
		</div>

	);
};

export default InteracticeMaps;