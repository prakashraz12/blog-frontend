import React from "react";
import { getDay } from "../utils/date-formater.utils";
import { Link } from "react-router-dom";

const BlogPostComponent = ({ item }) => {
  const { activity, author, blog_id, publishedAt, tags, title, des, banner } =
    item;
  return (
    <Link
      to={"/blogs/id"}
      className="flex gap-8 items-center border-grey mb-8 border-b-2 pb-2"
    >
      <div className="w-full">
        <div className="flex gap-2 items-center mb-7">
          <img
            src={author?.personal_info?.profile_img}
            alt="profile_img"
            className="w-6 h-6 rounded-full"
          />
          <p className="line-clamp-1">
            {author?.personal_info?.fullname} @{" "}
            {author?.personal_info?.username}
          </p>
          <p className="min-w-fit">{getDay(publishedAt)}</p>
        </div>
        <h1 className="blog-title">{title}</h1>
        <p className="my-3 text-xl font-gelasio leading-7 max-sm:hidden md:max-[1100px] line-clamp-2">
          {des}
        </p>
        <div className="flex gap-4 mt-7">
          <span className="btn-light py-1 px-4">{tags?.length && tags[0]}</span>
          <span className="ml-3 flex items-center gap-2 text-dark-grey">
            <i className="fi fi-rr-heart text-xl"></i>
            {activity?.total_likes}
          </span>
        </div>
      </div>
      <div className="h-28 aspect-square bg-grey">
        <img
          src={banner}
          alt="banner_img"
          className="w-full h-full aspect-square object-cover"
        />
      </div>
    </Link>
  );
};

export default BlogPostComponent;