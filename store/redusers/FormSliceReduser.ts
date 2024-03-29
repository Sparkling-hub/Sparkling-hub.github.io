import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store'; 


interface FormValues {
  vacancy: string;
  name: string;
  select: string;
  email: string;
  company: string;
  message: string;
  phone: string;
  linkedin: string;
  file: string;
  [key: string]: string | File | null  ;
  recaptcha:string | null;
}

interface FormState {
  formData: FormValues;
  check: boolean | null;
  checkForm: FormValues;
}

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([a-z\d])/.exec(email);
  return emailRegex !== null;
};

const initialState: FormState = {
  formData: {
    vacancy: '',
    name: '',
    select: '',
    email: '',
    company: '',
    message: '',
    phone: '',
    linkedin: '',
    file: '',
    recaptcha:''
  },
  check: null,
  checkForm: {
    vacancy: '',
    name: '',
    select: '',
    email: '',
    company: '',
    message: '',
    phone: '',
    linkedin: '',
    file: '',
    recaptcha:''
  },
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormValues>) => {
      state.formData = action.payload;
    },
    setCheck: (state, action: PayloadAction<boolean | null>) => {
      state.check = action.payload;
    },
    resetFormData: (state) => {
  
      Object.keys(state.formData).forEach(key => {
        state.formData[key] = '';

      });
 
    },
    resetCheckForm: (state) => {
  
      Object.keys(state.formData).forEach(key => {
        state.checkForm[key] = '';

      });
 
    },
    setCheckFormByKey: (state, action: PayloadAction<{ key: keyof FormValues; value: string }>) => {

      const { key, value } = action.payload;
      state.checkForm[key] = value;
    },
  },
});

export const selectIsValidEmail = (email: string): boolean => {
  return isValidEmail(email);
};
export const { setFormData, setCheck,setCheckFormByKey,resetFormData,resetCheckForm } = formSlice.actions;

export const selectForm = (state: RootState) => state.form;

export default formSlice.reducer;
