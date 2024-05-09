import { combineReducers } from '@reduxjs/toolkit';
import { mainApi } from '../services/main';
import playerReducer from './playerSlice';
import mainReducer from './mainSlice';

const rootReducer = combineReducers({
  [mainApi.reducerPath]: mainApi.reducer,
  player: playerReducer,
  main: mainReducer,
});

export default rootReducer;
