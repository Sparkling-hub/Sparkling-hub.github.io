


import { configureStore } from '@reduxjs/toolkit';
import mapsReducer from '@/store/redusers/mapsSliceReduser';
import startupStepByStepReducer from '@/store/redusers/startupStepByStepSliceReduser';
import formReducer from '@/store/redusers/FormSliceReduser';
import careersReducer from './redusers/CareersSliceReduser'
import dropdownReducer from './redusers/SelectSliceReduser'
import navbarReducer from './redusers/NavbarSliceReduser'
import dropdownNavbarReducer from './redusers/dropdownNavbarReduser'
import navigationReducer from './redusers/navigationReducer'
const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    maps: mapsReducer,
    startupStepByStep: startupStepByStepReducer,
    form: formReducer,
    careers: careersReducer,
    dropdown: dropdownReducer,
    navbar: navbarReducer,
    dropdownNavbar: dropdownNavbarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;