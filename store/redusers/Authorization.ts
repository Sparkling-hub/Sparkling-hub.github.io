import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store'; 

interface FormValues {
  name: string;
  email: string;
  password: string;
  [key: string]: string;
}

interface FormState {
  authorizationData: FormValues;
  check: boolean | null;
  checkForm: FormValues;
  password: string;
}

const initialState: FormState = {
  authorizationData: {
    name: '',
    email: '',
    password: '',
  },
  check: null,
  checkForm: {
    name: '',
    email: '',
    password: '',
  },
  password: ''
};

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormValues>) => {
      state.authorizationData = action.payload;
    },
    setCheck: (state, action: PayloadAction<boolean | null>) => {
      state.check = action.payload;
    },
    resetFormData: (state) => {
      state.authorizationData = initialState.authorizationData; 
    },
    resetCheckForm: (state) => {
      state.checkForm = initialState.checkForm; 
    },
    setCheckFormByKey: (state, action: PayloadAction<{ key: keyof FormValues; value: string }>) => {
      const { key, value } = action.payload;
      state.checkForm[key] = value;
    },
    setPassword: (state, action: PayloadAction<string>) => { 
      state.password = action.payload;
    },
  },
});

export const { setFormData, setCheck, setCheckFormByKey, resetFormData, resetCheckForm,setPassword } = authorizationSlice.actions;

export const authorizationForm = (state: RootState) => state.authorization;

export default authorizationSlice.reducer;
