import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store'; 


interface FormValues {
  id: string ;
  date: string ;
  description: string ;
  fileUrl: string;
  tags: string;
  title: string;
  fileName: string;
  [key: string]: string;
}

interface FilterValues {

  title: string;
  tags: string[];
  startDate: string | null;
  endDate: string | null;
}
interface ExtendedFilterValues extends FilterValues {
  sortOrder: boolean;
}
interface FormState {
  allPosts: FormValues[];
  filter: ExtendedFilterValues ;
  update: boolean;
  postData: FormValues;
  check: boolean | null;
  checkForm: FormValues;
  activeIds:{  [key: string]: any;};
  uniqueIds:string[],

}

const initialState: FormState = {
  allPosts:[],
  update: false,
  postData: {
    title: '',
    description: '',
    tags: '',
    img: '',
    id: '',
    date: '',
    fileUrl: '',
    fileName: '',
   
  }, 
 
  check: null,
  checkForm: {
    title: '',
    description: '',
    tags: '',
    img: '',
    id: '',
    date: '',
    fileUrl: '',
    fileName: ''
  },
  filter: {
    tags: [],
    title: '',
    startDate: null,
    endDate: null,
    sortOrder: false,
  },
  activeIds:{},
  uniqueIds:[]
};

const postSlice = createSlice({
  name: 'postForm',
  initialState,
  reducers: {

    setPostData: (state, action: PayloadAction<FormValues>) => {
      state.postData = action.payload;
    },
    setCheck: (state, action: PayloadAction<boolean | null>) => {
      state.check = action.payload;
    },
    resetPostData: (state) => {
      Object.keys(state.postData).forEach(key => {
        state.postData[key] = '';
      });
    },
    resetCheckForm: (state) => {
      Object.keys(state.checkForm).forEach(key => {
        state.checkForm[key] = '';
      });
    },
    setCheckFormByKey: (state, action: PayloadAction<{ key: keyof FormValues; value: string }>) => {
      const { key, value } = action.payload;
      state.checkForm[key] = value;
    },
    setUpdate: (state) => {
      state.update = !state.update;
    },
    setFilter: (state, action: PayloadAction<{ key: keyof FilterValues; value: any }>) => {
      const { key, value } = action.payload;
      state.filter[key] = value;
    },
    setUniqueIds: (state, action: PayloadAction<{ value: any }>) => {
			const { value } = action.payload;
			state.uniqueIds = value;

		},
		setActiveIds: (state, action: PayloadAction<{ value: any }>) => {
			const { value } = action.payload;
			state.activeIds = value;

		},
	setCheckboxData: (state, action: PayloadAction<{ name: string; value: any }>) => {
			const { name, value } = action.payload;
			Object.keys(state.activeIds).forEach((key: any) => { if (key == name) state.activeIds[key] = value });

		},
		deleteActiveItem: (state, action: PayloadAction<{ id: string; ids: any; name: string }>) => {
			const { id, ids, name } = action.payload;
			Object.keys(state.activeIds).forEach((key: any) => {
				if (key == name) state.activeIds[key] = ids.filter((item: any) => item !== id);
			});},
      setDateRange: (state, action: PayloadAction<{ startDate: string | null; endDate: string | null }>) => {
        state.filter.startDate = action.payload.startDate;
        state.filter.endDate = action.payload.endDate;
      },
      setOrder: (state) => {
     
        state.filter.sortOrder = !state.filter.sortOrder;
  
      },
      deleteDate: (state) => {

        state.filter.endDate= '';
        state.filter.startDate= '';
      },
      addPostsToAllPosts :(state: FormState, action: PayloadAction<FormValues[]>) => {
        state.allPosts = action.payload; // Set allPosts to the provided array of posts
      }
		}
    
    
});

export const { setPostData, setCheck, setCheckFormByKey, resetPostData, resetCheckForm, setUpdate, setFilter, setUniqueIds,setActiveIds,setCheckboxData,deleteActiveItem,setDateRange,setOrder,deleteDate, addPostsToAllPosts} = postSlice.actions;
export const selectPostFormData = (state: RootState) => state.post;

export default postSlice.reducer;
