import { configureStore } from '@reduxjs/toolkit';
// import playerReducer from './features/playerSlice';
// import mainReducer from './features/mainSlice';
import { mainApi } from './services/main';
import { enableMapSet } from 'immer';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './features/rootReducer';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: [mainApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

enableMapSet();

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      // serializableCheck: false,
    }).concat(mainApi.middleware),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
