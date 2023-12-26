// api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getBearerToken = () => {
  const session_data = localStorage.getItem("authId") || null;
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
    likeBlog: builder.mutation({
      query: (blogId) => ({
        url: "/like",
        method: "POST",
        body: blogId,
      }),
      providesTags: ["blog-like"],
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useGetBlogsQuery,
  useGetTrendingBlogsQuery,
  useGetBlogsByCategoeyMutation,
  useGetBlogsMutation,
  useSearchApiMutation,
  useGetBlogByIDQuery,
  useGetBlogByBlogIdQuery,
  useLikeBlogMutation,
} = blogApi;
