// api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cloudinaryApi = createApi({
  reducerPath:"cloudinaryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.cloudinary.com/v1_1/du1bbws62/" }),
  endpoints: (builder) => ({
    uploadImage:builder.mutation({
        query:(imageData)=>({
            url:"image/upload",
            method:"POST",
            body:imageData
        }),
    }),
  }),
});

export const {useUploadImageMutation} = cloudinaryApi;
