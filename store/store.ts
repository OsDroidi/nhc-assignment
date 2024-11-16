import { configureStore } from '@reduxjs/toolkit';

import { apiSlice } from './apiSlice';
import queryReducer from './querySlice';
import counterReducer from './slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    queries: queryReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
