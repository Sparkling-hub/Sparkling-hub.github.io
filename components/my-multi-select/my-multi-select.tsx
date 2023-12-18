import React, { useEffect, ChangeEvent, useState } from 'react';
import CheckboxSelect from '@/components/checkbox-select';
import MultiSelectActiveItem from '../multi-select-active-item';
import IMultiSelect from '@/interface/IMultiSelect';
import InputLocate from '../ui/custom-input-jobs';

const MyMultipleSelect: React.FC<IMultiSelect> = ({ name, uniqueIds, activeMultiselect, placeholder, handleLocationChange, deleteItem }) => {

	const [isActive, setIsActive] = useState(false);

	const handleClick = (e: any) => {
		setIsActive(!isActive);
	};
	const handleClickDropDown = (e: any) => {
		e.stopPropagation()
	};
	const [searchValue, setSearchValue] = useState('');
	const [filteredIds, setFilteredIds] = useState(uniqueIds);
	useEffect(() => {
		// Initialize filteredIds with a copy of uniqueIds
		setFilteredIds([...uniqueIds]);
	}, [uniqueIds]);
	
	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {

		setIsActive(true);
		const inputValue = event.target.value.toLowerCase();
		setSearchValue(inputValue);


		const filtered = uniqueIds.filter((id) => id.toLowerCase().includes(inputValue));
		setFilteredIds(filtered);
	};


	return (
		<div className={`my-multiple-select ${isActive ? 'active' : ''} m-4`} >
 
		<div className={`my-multiple-select-container flex-col  flex ${isActive ? 'rounded-t-lg' : 'rounded-lg'}  relative bg-color-primary-medium border-bg-color-primary-medium`} onClick={handleClick}>

			<div className={`flex left-3 flex-wrap items-center h-max p-3`}>

				{activeMultiselect.map(id => (
					<MultiSelectActiveItem key={id}
						deleteItem={deleteItem}
						id={id} />
				))}

			</div>
			<div className={` flex items-center absolute right-4 bottom-0 top-0`}><img src="/img/down-arrow-svgrepo-com.svg" className={`h-3 w-3 transition-transform transform ${isActive ? 'rotate-180' : 'rotate-0'}`} alt="" />
			</div>

			<div className={`px-4`} >
				<InputLocate
					id={"focused_input"}
					type={"text"}
					value={searchValue}
					placeholder={activeMultiselect.length?"":"Set Location"}
					name={name}
					handleSearchChange={handleSearchChange}
				/><div className="flex top-19 h-max w-full left-0 z-10 list flex flex-wrap items-center p-4  rounded-b-lg border-t-[1px] border-slate-200 bg-color-primary-medium border-bg-color-primary-medium" onClick={handleClickDropDown}>

					{filteredIds.length ? filteredIds.map(id => (
						<CheckboxSelect
							key={id}
							id={id}
							checked={activeMultiselect.includes(id)}
							onChange={(event) => handleLocationChange(event, name,activeMultiselect)}
						/>
					)) : "No found"}



					</div>
				</div>

			</div>

		</div>


	);
};

export default MyMultipleSelect;