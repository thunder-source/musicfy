import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './features/playerSlice';
import mainReducer from './features/mainSlice';
import { mainApi } from './services/main';

export const store = configureStore({
  reducer: {
    [mainApi.reducerPath]: mainApi.reducer,
    player: playerReducer,
    main: mainReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
