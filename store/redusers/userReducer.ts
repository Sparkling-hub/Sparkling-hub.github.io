import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store'; 


interface FormState {
user:boolean
}

const initialState: FormState = {
  user:false
};

const userAuthSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserAuth(state, action: PayloadAction<boolean>) {
      state.user = action.payload;
    },


  },
});

export const {setUserAuth} = userAuthSlice.actions;

export const selectUserAuth = (state: RootState) => state.user;

export default userAuthSlice.reducer;
