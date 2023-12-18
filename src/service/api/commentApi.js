// api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getBearerToken = () => {
  const session_data = localStorage.getItem("authId") || null;
  const { access_token } = JSON.parse(session_data);
  return access_token;
};

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/blog",
    prepareHeaders: (headers) => {
      const token = getBearerToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    writeComment: builder.mutation({
      query: (comment) => ({
        url: "/comment/write",
        method: "POST",
        body: comment,
      }),
      providesTags: ["blog-data"],
    }),

    getComments: builder.mutation({
      query: (blogId) => ({
        url: "/comment/get",
        method: "POST",
        body: blogId,
      }),
      providesTags: ["get-comment-all"],
    }),
  
  }),
});

export const {
 useWriteCommentMutation,
 useGetCommentsMutation
} = commentApi;
