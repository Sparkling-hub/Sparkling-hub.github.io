import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store'; 


interface FormValues {
	id: string| '';
	date: string| '';
	description: string| '';
	fileUrl: string;
	tags: string;
	title: string;
	fileName:string;

  [key: string]: string  ;

}

interface FormState {
  update:boolean;
    postData: FormValues;
  check: boolean | null;
  checkForm: FormValues;
}


const initialState: FormState = {
  update: false,
  postData: {
    title: '',
    description: '',
    tags: '',
    img: '',
    id: '',
    date: '',
    fileUrl: '',
    fileName: ''
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
  
      Object.keys(state.postData).forEach(key => {
        state.checkForm[key] = '';

      });
 
    },
    setCheckFormByKey: (state, action: PayloadAction<{ key: keyof FormValues; value: string }>) => {

      const { key, value } = action.payload;
      state.checkForm[key] = value;
    },
    setUpdate: (state,  action: PayloadAction<boolean>) => {
      const  value = action.payload;
      state.update = value;
    },
  },
});

export const { setPostData, setCheck,setCheckFormByKey,resetPostData,resetCheckForm, setUpdate } = postSlice.actions;
export const selectPostFormData = (state: RootState) => state.post; // Corrected selector



export default postSlice.reducer;
