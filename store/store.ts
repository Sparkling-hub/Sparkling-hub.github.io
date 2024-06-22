import { combineReducers, configureStore} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

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
import FilterReduser from './redusers/filterReducer';

const rootReducer = combineReducers({
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
  user:userReduser,
  filter:FilterReduser
});
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['post']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    }),
});
const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store, persistor };

function getDefaultMiddleware(arg0: { serializableCheck: { ignoredActions: string[]; }; }) {
  throw new Error('Function not implemented.');
}
