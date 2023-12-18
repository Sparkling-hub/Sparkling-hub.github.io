import { useState, useEffect, ChangeEvent, MouseEventHandler } from 'react';
import dataJobs from '../../data/data-jobs';
import JobList from '../job-list';
import Filter from '../filter/filter';
import {getResult} from "../search_function/search_function"
import ICareersProps from '@/interface/ICareersProps';


const Careers: React.FC<ICareersProps> = () => {

	const [filterPhraze, setFilterPhraze] = useState<string>("");
	const [uniqueIds, setUniqueIds] = useState<string[]>([]);	
	const [location, setLocation] = useState<string[]>([]);
	const [uniqueExp, setUniqueExp] = useState<string[]>([]);
	const [position, setPosition] = useState<string>("");
	const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
		
		let newValue: string[] = []

		if (e.target.checked) {
			newValue = [...location, e.currentTarget.id]
		}
		else if (!e.currentTarget.checked){
			newValue = location.filter( (value) => value != e.currentTarget.id)
		}		
		setLocation(newValue);
	};
	const handleExpChange = (e: ChangeEvent<HTMLInputElement>) => {

		setPosition(e.currentTarget.id)
	
	};
	const handleFilterPrazeChange = (e: ChangeEvent<HTMLInputElement>) => {

		setFilterPhraze(e.currentTarget.value)
	
	};
	const deleteItem: MouseEventHandler<HTMLSpanElement> = (e) => {
		
		let newValue = location.filter( (value) => value != e.currentTarget.id)
		setLocation(newValue);
		e.stopPropagation()
		
	};

	useEffect(() => {		
	
		setUniqueIds(getResult(dataJobs, "id"));
		setUniqueExp(getResult(dataJobs, "nameProf"));

	}, [dataJobs]);

	const filteredJobsList = dataJobs.filter((job)=>{												
										if(!location.length) return dataJobs												
										return location.includes(job.id) })
									 .filter((job)=>{
										if(!position) return dataJobs
										return position.includes(job.nameProf)})
									 .filter((job)=>{
										if(!filterPhraze) return dataJobs										
										return job.namePosition.toLowerCase().includes(filterPhraze.toLowerCase())})

	return (
		<div className='flex relative'>

			<Filter dataJobs={dataJobs} 
					filterPhraze={filterPhraze}
					location = {location}
					uniqueIds={uniqueIds}					
					position = {position}
					uniqueExp={uniqueExp}

					handleFilterPrazeChange={handleFilterPrazeChange}
					handleLocationChange={handleLocationChange}
					deleteItem = {deleteItem}					
					handleExpChange={handleExpChange} 
					/>

			<JobList jobs = {filteredJobsList}/>

		</div>
	);
};

export default Careers;
