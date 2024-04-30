import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store'; 


interface FormValues {
  title: string;
  text: string;
  tags: string;

  img: string;

  [key: string]: string  ;

}

interface FormState {
    postData: FormValues;
  check: boolean | null;
  checkForm: FormValues;
}


const initialState: FormState = {
  postData: {
    title: '',
    text: '', 
    tags: '',
    img: '',
  },
  check: null,
  checkForm: {
    title: '',
    text: '',
    tags: '',
    img: '',
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
  },
});

export const { setPostData, setCheck,setCheckFormByKey,resetPostData,resetCheckForm } = postSlice.actions;
export const selectPostFormData = (state: RootState) => state.post; // Corrected selector



export default postSlice.reducer;
