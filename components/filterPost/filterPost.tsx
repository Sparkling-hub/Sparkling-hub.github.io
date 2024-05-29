import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Multiselect from "@/components/my-multi-select";
import {
	selectPostFormData,
	setFilter,

} from '@/store/redusers/postReduser';
import DateRangePicker from './date-select/date-select';

const Filter: React.FC = () => {
	const dispatch = useDispatch();
	const { filter } = useSelector(selectPostFormData);


	const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setFilter({ key: 'title', value: e.target.value }));
	};

	
	return (
		<div className="filter-container bg-gray-100 my-6 sm:mx-5 w-4/5 sm:w-2/4 lg:w-1/4 z-20">
			<h3 className="text-center text-3xl mt-10 mb-5  ">Open Post</h3>
			<div className="text-sm">
				<div className={`my-multiple-select mx-4`} >
					<div className="relative my-multiple-select-container w-full flex-col flex rounded-lg relative bg-color-primary-medium border-bg-color-primary-medium">
						<input id="filter_search" className="my-3.5 px-3 placeholder-teal-800 
							focus:outline-none
							bg-color-primary-medium 
							focus:bg-color-primary-medium 
							focus:bg-color-primary-medium"
							name="name"
							type="text"
							autoComplete='off'
							placeholder="Search by any keyword"
							value={filter.title}
							onChange={handleFilterChange}
						/>
						<button className="absolute leading-9  h-full w-1/12  right-2">
							<img src={"/img/jobs/search-ico.png"} className="h-4 opacity-60" alt="" />
						</button>
					</div>
					<div className="relative my-multiple-select-container w-full flex-col flex rounded-lg relative bg-color-primary-medium border-bg-color-primary-medium">


					</div>
					<div className="relative my-multiple-select-container my-2 w-full flex-col flex rounded-lg relative bg-color-primary-medium border-bg-color-primary-medium">
						<Multiselect id={'tags'} placeholder={'tags'} />
					</div>
				</div>
				<div className='flex flex-row'> 	<DateRangePicker /></div>


			</div>
		</div>

	);
};

export default Filter;

