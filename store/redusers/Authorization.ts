import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store'; 

interface FormValues {
  name: string;
  email: string;
  password: string;
  [key: string]: string;
}
interface RegistrationValues  {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string,
  [key: string]: string;
}
interface FormState {
  authorizationData: FormValues;
  check: boolean | null;
  checkForm: FormValues;
  checkReg: RegistrationValues;

  registrationData: RegistrationValues;
  
}

const initialState: FormState = {
  authorizationData: {
    name: '',
    email: '',
    password: '',
  },
  registrationData: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  check: null,
  checkReg: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',

  },
  checkForm: {
    name: '',
    email: '',
    password: '',
  },
};

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setRegistrationData: (state, action: PayloadAction<RegistrationValues>) => {
      state.registrationData = action.payload;
    },

    resetRegistrationData: (state) => {
      state.registrationData = initialState.registrationData; 
    },
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
    resetCheckReg: (state) => {
      state.checkForm = initialState.checkForm; 
    },
    setCheckRegByKey: (state, action: PayloadAction<{ key: keyof FormValues; value: string }>) => {
      const { key, value } = action.payload;
      state.checkForm[key] = value;
    },

  },
});

export const { setFormData, setCheck, setCheckFormByKey, resetFormData, resetCheckForm,resetRegistrationData, setCheckRegByKey,resetCheckReg, setRegistrationData} = authorizationSlice.actions;

export const authorizationForm = (state: RootState) => state.authorization;

export default authorizationSlice.reducer;
