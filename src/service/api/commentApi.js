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
    repliedComment: builder.mutation({
      query: (blogdata) => ({
        url: "/comment/replied",
        method: "POST",
        body: blogdata,
      }),
      providesTags: ["replied-comment"],
    }),

    getCommentById: builder.query({
      query: (id) => ({
        url: `/comment/id/${id}`,
      }),
      providesTags: ["comment-get-by-id"],
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/comment/delete`,
        method: "POST",
        body: id,
      }),
      providesTags: ["delte-comment"],
    }),
    likeComment: builder.mutation({
      query: (commentId) => ({
        url: `/comment/like`,
        method: "POST",
        body: commentId,
      }),
      providesTags:["comment-like"]
    }),
  }),
});

export const {
  useWriteCommentMutation,
  useGetCommentsMutation,
  useRepliedCommentMutation,
  useGetCommentByIdQuery,
  useDeleteCommentMutation,
  useLikeCommentMutation
} = commentApi;
