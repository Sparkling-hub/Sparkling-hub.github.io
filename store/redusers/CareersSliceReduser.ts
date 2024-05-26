import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import IJob from '@/interface/IJob';
interface CareersState {
	
	filterPhrases: string;

	[key: string]: any;
	dataJobs: any[];
	filteredJobsList: any[];
}
const initialState: CareersState = {
	filterPhrases: '',

	dataJobs: [],
	filteredJobsList: [],
};
const careersSlice = createSlice({
	name: 'careers',
	initialState,
	reducers: {
		
		setJobsAction: (state, action: PayloadAction<{ value: any }>) => {
			const { value } = action.payload;
			state.dataJobs = value;
		},
		filterJobs: (state, action: PayloadAction<{ filterPhrases: string; activeIds: { [key: string]: any[] } }>) => {
            const { filterPhrases, activeIds } = action.payload;
            let data: IJob[] = [...state.dataJobs];

            Object.keys(activeIds).forEach((key) => {
                data = data.filter((job) => {
                    const matchesText = job.namePosition ? job.namePosition.toLowerCase().includes(filterPhrases.toLowerCase()) : false;

                    if (activeIds[key].length === 0) {
                        return matchesText;
                    } else {
                        return activeIds[key].includes(job[key]) && matchesText;
                    }
                });
            });

            state.filteredJobsList = data;
        },
	
	},
});

export const {filterJobs,
	setJobsAction,
} = careersSlice.actions;

export const selectCareers = (state: RootState) => state.careers;

export default careersSlice.reducer;
