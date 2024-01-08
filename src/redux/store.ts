import { configureStore } from "@reduxjs/toolkit";
import { api } from "./features/api/api";
import { newsApi } from "./features/api/newsApi";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, newsApi.middleware),
});
