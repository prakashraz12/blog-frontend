import React, { useCallback, useEffect } from "react";
import { useGetBlogsByCategoeyMutation } from "../service/api/blogApi.service";
import AnimationWrapper from "./animation/animation.wrapper";
import Loader from "./loader.component";
import BlogPostComponent from "./blogPost.component";

const RelatedBlogs = ({ cat, blogId }) => {
  const [category, { data, isLoading, isError, isSuccess }] =
    useGetBlogsByCategoeyMutation();

  const fetchCategoryBlogs = useCallback(async () => {
    await category({ category: cat });
  }, []);

  useEffect(() => {
    fetchCategoryBlogs();
  }, []);


  return (
    <div className="pt-10 pr-4 pl-4">
      {isLoading && <Loader />}
      {isSuccess &&
        data?.data
          ?.filter((item) => item._id !== blogId)
          .map((item, index) => (
            <AnimationWrapper
              key={index}
              transation={{ duration: 0.2, delay: 1 * 1 }}
            >
              <BlogPostComponent
                category={item?.category}
                banner={item.banner}
                activity={item.activity}
                tags={item.tags}
                des={item.des}
                title={item.title}
                id={item.blog_id}
                authorFullname={item.author.personal_info.fullname}
                authorProfileImage={item.author.personal_info.profile_img}
                authorUserName={item.author.personal_info.username}
                publishedAt={item.createdAt}
              />
            </AnimationWrapper>
          ))}
    </div>
  );
};

export default RelatedBlogs;
