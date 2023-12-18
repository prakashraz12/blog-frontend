import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetBlogByBlogIdQuery } from "../../service/api/blogApi.service";
import Loader from "../../components/loader.component";
import AnimationWrapper from "../../components/animation/animation.wrapper";
import { getDay } from "../../utils/date-formater.utils";
import BlogIntractionsComponent from "../../components/blog-intraction.component";
import BlogContent from "../../components/blog-content.compoent";
import CommentContainer from "../../components/comment.component";

const BlogPage = () => {
  
  const[isCommentToggle, setCommentToggle] = useState(false);
  const [blogDetails, setBogDetils] = useState({});
  const { id } = useParams();
  const { data, isSuccess, isLoading, isError } = useGetBlogByBlogIdQuery(id);

  useEffect(() => {
    if (isSuccess && data.code === 200) {
      setBogDetils(data?.data);
    }
  }, [data, isSuccess]);
console.log(blogDetails)
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isSuccess ? (
        <>
          <AnimationWrapper>
            <CommentContainer isCommentToggle={isCommentToggle} setCommentToggle={setCommentToggle} blog_id={blogDetails?._id}/>
            <div className="max-w-[900px] center py-10 ma-lg:px-[5vw]">
              <img
                src={blogDetails?.banner}
                alt="banner img"
                className="aspect-video rounded-xl"
              />

              <div className="mt-12 p-5">
                <h2>{blogDetails?.title}</h2>
                <div className="flex max-sm:flex-col justify-between my-9">
                  <div className="flex gap-5 items-start align-middle">
                    <img
                      src={blogDetails?.author?.personal_info?.profile_img}
                      alt="author_img"
                      className="h-12 w-12 rounded-full"
                    />
                    <p className="text-xl">
                      {blogDetails?.author?.personal_info?.fullname}
                      <br />
                      <Link
                        className="underline"
                        to={`/user/${blogDetails?.author?.personal_info?.username}`}
                      >
                        @{blogDetails?.author?.personal_info?.username}
                      </Link>
                    </p>
                  </div>
                  <p className="text-dark-gray opacity-75 max-sm:mt-6 max-sm:ml-12 max-sm:pl-5">
                    Published on {getDay(blogDetails?.publishedAt)}
                  </p>
                </div>
              </div>

              <BlogIntractionsComponent
              setCommentToggle={setCommentToggle}
                blogDetails={blogDetails.activity}
                authorId={blogDetails?.author?._id}
                blog_id={blogDetails?._id}
                commentLength={blogDetails?.comments?.length}
                likedLength={blogDetails?.activity?.total_likes?.length}
              />

              <div className="m-12 font-gelasio blog-page-content">
                {blogDetails?.content?.map((content, index) => (
                  <BlogContent key={index} content={content} />
                ))}
              </div>
            </div>
          </AnimationWrapper>
        </>
      ) : isError ? (
        <h1>error</h1>
      ) : null}
    </>
  );
};

export default BlogPage;
