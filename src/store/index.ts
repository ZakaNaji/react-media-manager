import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";
import { albumsApi } from "../hooks/albumsApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(albumsApi.middleware),
});

setupListeners(store.dispatch);

export type RootType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
