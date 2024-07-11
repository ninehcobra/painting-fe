import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/auth.service";
import { paintingApi } from "./services/painting.service";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [paintingApi.reducerPath]: paintingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, paintingApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
