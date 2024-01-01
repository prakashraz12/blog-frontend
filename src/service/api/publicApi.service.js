// api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../config/constant";


export const publicApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api/v1/blog`,
   
  }),
  endpoints: (builder) => ({
   
    getTrendingBlogs: builder.query({
      query: () => "/get/trending/blogs",
      providesTags: ["trending-blogs-data"],
    }),
    getBlogByID: builder.query({
      query: (id) => ({
        url: `/get/blog/${id}`,
      }),
      providesTags: ["blog-BY-id"],
    }),
    getBlogByBlogId: builder.query({
      query: (blog_id) => ({
        url: `/get/blog_id/${blog_id}`,
      }),
      providesTags: ["blog-By-Blog_id"],
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

    searchApi: builder.mutation({
      query: (data) => ({
        url: "/get/search",
        method: "POST",
        body: data,
      }),
      providesTags: ["blog-search"],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetTrendingBlogsQuery,
  useGetBlogsByCategoeyMutation,
  useGetBlogsMutation,
  useSearchApiMutation,
  useGetBlogByIDQuery,
  useGetBlogByBlogIdQuery,
} = publicApi;
