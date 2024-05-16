import { configureStore} from '@reduxjs/toolkit';
import { applyMiddleware } from '@reduxjs/toolkit';
import mapsReducer from '@/store/redusers/mapsSliceReduser';
import startupStepByStepReducer from '@/store/redusers/startupStepByStepSliceReduser';
import formReducer from '@/store/redusers/FormSliceReduser';
import careersReducer from './redusers/CareersSliceReduser'
import dropdownReducer from './redusers/SelectSliceReduser'
import navbarReducer from './redusers/NavbarSliceReduser'
import dropdownNavbarReducer from './redusers/dropdownNavbarReduser'
import navigationReducer from './redusers/navigationReducer'
import authorizationReducer from './redusers/Authorization'
import postReduser from './redusers/postReduser';
import userReduser from './redusers/userReducer';
const rootReducer = {
  navigation: navigationReducer,
  maps: mapsReducer,
  startupStepByStep: startupStepByStepReducer,
  form: formReducer,
  careers: careersReducer,
  dropdown: dropdownReducer,
  navbar: navbarReducer,
  dropdownNavbar: dropdownNavbarReducer,
  authorization: authorizationReducer,
  post: postReduser,
  user:userReduser
};
const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;