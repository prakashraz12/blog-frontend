// api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://blog-backend-a4fo.onrender.com/api/v1/user" }),
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (signIn) => ({
        url: "/signin",
        method: "POST",
        body: signIn,
      }),
      providesTags: ["signin-user"],
    }),
    signUp: builder.mutation({
      query: (signUp) => ({
        url: "/signup",
        method: "POST",
        body: signUp,
      }),
    }),
    googleAuth:builder.mutation({
      query:(googleData)=>({
        url:"/google-auth",
        method:"POST",
        body:googleData
      })
    })
  }),

});

export const { useSignInMutation, useSignUpMutation, useGoogleAuthMutation } = authApi;
