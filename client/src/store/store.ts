import { configureStore, combineReducers } from '@reduxjs/toolkit';

import toolReducer from './reducers/toolSlice';
import settingsReducer from './reducers/settingsSlice';

const rootReducer = combineReducers({
  toolReducer,
  settingsReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
