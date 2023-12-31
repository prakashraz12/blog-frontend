// store.js
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./service/api/authApi.service";
import authReducer from "./service/slices/app.slice";
import userActivityReducer from "./service/slices/userActivitySlice";
import { cloudinaryApi } from "./service/api/cloudinaryUpload.service";
import { blogApi } from "./service/api/blogApi.service";
import { userApi } from "./service/api/userApi";
import { commentApi } from "./service/api/commentApi";
import { publicApi } from "./service/api/publicApi.service";

export const store = configureStore({
  reducer: {
    [publicApi.reducerPath]:publicApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [cloudinaryApi.reducerPath]: cloudinaryApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [commentApi.reducerPath]:commentApi.reducer,
    auth: authReducer,
    userActivity: userActivityReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      cloudinaryApi.middleware,
      blogApi.middleware,
      userApi.middleware,
      commentApi.middleware,
      publicApi.middleware
    ),
});
setupListeners(store.dispatch);
