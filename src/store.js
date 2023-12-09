// store.js
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./service/api/authApi.service";
import authReducer from "./service/slices/app.slice";
import { cloudinaryApi } from "./service/api/cloudinaryUpload.service";
import { blogApi } from "./service/api/blogApi.service";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [cloudinaryApi.reducerPath]: cloudinaryApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      cloudinaryApi.middleware,
      blogApi.middleware
    ),
});
setupListeners(store.dispatch);
