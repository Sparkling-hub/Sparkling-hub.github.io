import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface CareersState {
	
	filterPhrases: string;
	uniqueIds: string[][];
    activeIds:{  [key: string]: any;};
	[key: string]: any;


}
const initialState: CareersState = {
	filterPhrases: '',
	uniqueIds: [],
	activeIds: [],

};
const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
        setfilterPhrases: (state, action: PayloadAction<string>) => {
			state.filterPhrases = action.payload;

		},

		setUniqueIds: (state, action: PayloadAction<{ value: any }>) => {
			const { value } = action.payload;
			state.uniqueIds = value;

		},
		setActiveIds: (state, action: PayloadAction<{ value: any }>) => {
			const { value } = action.payload;
			state.activeIds = value;

		},
		setCheckboxData: (state, action: PayloadAction<{ name: string; value: string[] }>) => {
			const { name, value } = action.payload;
			Object.keys(state.activeIds).forEach((key: any) => { if (key == name) state.activeIds[key] = value });

		},
		deleteActiveItem: (state, action: PayloadAction<{ id: string; ids: string[]; name: string }>) => {
			const { id, ids, name } = action.payload;
			Object.keys(state.activeIds).forEach((key: any) => {
				if (key == name) state.activeIds[key] = ids.filter((item) => item !== id);
			});
		},
		clearActiveItems(state, action: PayloadAction<{ name: string }>) {
			state.activeIds[action.payload.name] = [];
		  },
	},
});

export const {
	setCheckboxData,
	setfilterPhrases,
	setUniqueIds,
	setActiveIds,
	deleteActiveItem,
	clearActiveItems
} = filterSlice.actions;

export const selectFilter = (state: RootState) => state.filter;

export default filterSlice.reducer;
