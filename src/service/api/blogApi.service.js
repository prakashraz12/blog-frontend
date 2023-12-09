// api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getBearerToken = () => {
  const session_data = sessionStorage.getItem("authId") || null;
  const { access_token } = JSON.parse(session_data);
  return access_token;
};

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/blog",
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
    createBlog: builder.mutation({
      query: (blogData) => ({
        url: "/create",
        method: "POST",
        body: blogData,
      }),
      providesTags: ["blog-data"],
    }),
    getBlogs: builder.query({
      query:()=> "/get/blogs",
      providesTags: ["blog-data"],
    }),
    getTrendingBlogs: builder.query({
      query:()=> "/get/trending/blogs",
      providesTags: ["trending-blogs-data"],
    }),
    getBlogsByCategoey: builder.mutation({
      query: (tags) => ({
        url: "/get/category/blog",
        method: "POST",
        body: tags,
      }),
      providesTags: ["blog-by-categoey"],
    }),
    getBlogs: builder.mutation({
      query: (data) => ({
        url: "/get/blogs",
        method: "POST",
        body: data,
      }),
      providesTags: ["blog"],
    }),
    
    
  }),
});

export const { useCreateBlogMutation, useGetBlogsQuery, useGetTrendingBlogsQuery, useGetBlogsByCategoeyMutation, useGetBlogsMutation } = blogApi;
