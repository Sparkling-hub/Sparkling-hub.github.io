import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
	selectPostFormData,
	setFilter,

} from '@/store/redusers/postReduser';
import DateRangePicker from './date-select/date-select';
import { get } from '../careers/search_function/search_function';
import ListTags from '../listTags/listTags'
import { selectFilter } from '@/store/redusers/filterReducer';
const Filter: React.FC = () => {
	const dispatch = useDispatch();
	const { filter } = useSelector(selectPostFormData);
	const {
		uniqueIds,
		activeIds,
	} = useSelector(selectFilter
	);


	const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setFilter({ key: 'title', value: e.target.value }));
	};

	const data = get(uniqueIds, 'tags');
	const activeData = get(activeIds, 'tags');
	
	return (
		<div className=" my-6 sm:mx-5 w-full z-20	">


			<div className="text-sm  flex w-full mb-5 mt-10">
				
			<div className="relative my-multiple-select-container w-full flex-wrap flex rounded-lg relative  border-bg-color-primary-medium">
					<ListTags key={uuidv4()}

						id={{ count: 1, value: '' }}
						name={'tags'} checked={!activeIds.tags?.length} />
					{data.length ? data.map((dataCheckbox) => (
						<ListTags key={uuidv4()}
							id={dataCheckbox}
							checked={activeData.includes(dataCheckbox.value)}
							name={'tags'} />
					)) : "No found"}

				</div>
				<div className={`my-multiple-select mx-4 flex h-full flex-col`} >
					<div className="relative my-multiple-select-container w-full flex-col flex rounded-lg relative bg-color-primary-medium border-bg-color-primary-medium ">
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
					<div className='flex flex-row 	bg-color-primary-medium  my-2 rounded-[7px]'> 	<DateRangePicker /></div>


				</div>


			</div>

		</div>

	);
};

export default Filter;

