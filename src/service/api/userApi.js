// api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getBearerToken = () => {
  const session_data = sessionStorage.getItem("authId") || null;
  const { access_token } = JSON.parse(session_data);
  return access_token;
};

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/user",
    prepareHeaders: (headers) => {
      const token = getBearerToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `/${id}`,
      providesTags: ["get-user"],
    }),
  }),
});

export const {
 useGetUserQuery
} = userApi;
