import { useEffect } from 'react';
import Jobs from '../../data/data-jobs';
import JobList from '../job-list';
import Filter from '../filter'
import { getIds } from './search_function/search_function'
import { useDispatch, useSelector } from 'react-redux';

import ICareersProps from '@/interface/ICareersProps';

import {
	selectCareers,

	setJobsAction
} from '@/store/redusers/CareersSliceReduser';

import {
		selectFilter,
	  setUniqueIds,
	  setActiveIds,
	} from  "@/store/redusers/filterReducer";
const Careers: React.FC<ICareersProps> = () => {
	const dispatch = useDispatch();


	const { dataJobs } = useSelector(selectCareers)
	const { uniqueIds } = useSelector(selectFilter)
	useEffect(() => {
		dispatch(setJobsAction({ value: Jobs }));

		const result = {
			workMode: getIds(Jobs, 'workMode'),
			experience: getIds(Jobs, 'experience'),
			location: getIds(Jobs, 'location'),
		};


		dispatch(setUniqueIds({ value: result }));
		const activeIds = {
			workMode: [],
			experience: [],
			location: [],
		};	
	
		dispatch(setActiveIds({ value: activeIds }));
	
	
	}, [dataJobs, dispatch]);




	return (


		<div className='flex relative w-full items-center lg:items-start flex-col lg:flex-row'>

			<Filter
			/>
			<JobList />
		</div>

	);
};

export default Careers;


