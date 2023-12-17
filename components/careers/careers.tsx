import { useState, useEffect, ChangeEvent, MouseEventHandler } from 'react';
import dataJobs from '../../data/data-jobs';
import JobList from '../job-list';
import Filter from '../filter/filter';
import {getResult} from "../search_function/search_function"


const Careers: React.FC = () => {

	const [uniqueIds, setUniqueIds] = useState<string[]>([]);
	const [activeMultiselect, setLocation] = useState<string[]>([]);

	const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {

		let newValue: string[] = []

		if (e.target.checked) {
			newValue = [...activeMultiselect, e.currentTarget.id]
		}
		else if (!e.currentTarget.checked){
			newValue = activeMultiselect.filter( (value) => value != e.currentTarget.id)
		}		
		setLocation(newValue);
	};
	const deleteItem: MouseEventHandler<HTMLSpanElement> = (e) => {
		
		let newValue = activeMultiselect.filter( (value) => value != e.currentTarget.id)
		setLocation(newValue);
		
	  };

	useEffect(() => {		
		const ids = getResult(dataJobs, "id");
		const uniqueIdsSet = new Set(ids);
		const uniqueIdsArray = Array.from(uniqueIdsSet);
		setUniqueIds(uniqueIdsArray);
	  }, [dataJobs]);

	





	return (
		<div className='flex relative'>

			<Filter dataJobs={dataJobs} 
					uniqueIds={uniqueIds}					
					activeMultiselect = {activeMultiselect}
					handleLocationChange={handleLocationChange} 
					deleteItem = {deleteItem}
					/>

			<JobList />

		</div>
	);
};

export default Careers;
