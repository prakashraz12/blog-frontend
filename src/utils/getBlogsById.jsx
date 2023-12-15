import React from "react";
import BlogPostComponent from "../components/blogPost.component";
import { useGetBlogByIDQuery } from "../service/api/blogApi.service";
import Loader from "../components/loader.component";
// import { useGetBlogByIdQuery } from '../service/api/blogApi.service'

const GetBlogsById = ({ id, author }) => {

  const { data, isLoading, isSuccess } = useGetBlogByIDQuery(id);
  const {username,fullname,profile_img} = author;
  const activity = data?.data?.activity || {};
  const title = data?.data?.title || "";
  const bannerImg = data?.data?.banner || ""
  const publishedAt = data?.data?.publishedAt || ""
  const tags = data?.data?.tags || ""


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isSuccess ? (
        <BlogPostComponent item={data?.data}  activity={activity} title={title} authorUserName={username} authorFullname={fullname} authorProfileImage={profile_img} banner={bannerImg}  publishedAt={publishedAt} tags={tags}/>
      ) : null}
    </>
  );
};

export default GetBlogsById;
