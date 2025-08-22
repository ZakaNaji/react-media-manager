import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";
import { albumsApi } from "../hooks/albumsApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { photosApi } from "../hooks/photosApi";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware()
      .concat(albumsApi.middleware)
      .concat(photosApi.middleware),
});

setupListeners(store.dispatch);

export type RootType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
