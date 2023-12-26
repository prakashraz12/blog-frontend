import React from "react";
import { getDay } from "../utils/date-formater.utils";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateRecentActivity } from "../service/slices/userActivitySlice";

const BlogPostComponent = ({
  activity,
  publishedAt,
  tags,
  title,
  des,
  banner,
  authorProfileImage,
  authorFullname,
  authorUserName,
  category,
  id,
}) => {

  const dispatch = useDispatch();
  const handleUpdateRecentActivity = (newActivity) => {
    dispatch(updateRecentActivity({ activity: newActivity }));
  };


  return (
    <Link
      to={`/blog/${id}`}
      onClick={() => handleUpdateRecentActivity(category)}
      className="flex gap-8 items-center border-grey mb-8 border-b-2 pb-2"
    >
      
      <div className="w-full">
        <div className="flex gap-2 items-center mb-7">
          <img
            src={authorProfileImage}
            alt="profile_img"
            className="w-6 h-6 rounded-full"
          />
         <div className="flex gap-2">
         <p className="line-clamp-1">
            {authorFullname} @ {authorUserName}
          </p>
          <p className="min-w-fit text-dark-grey">{getDay(publishedAt)}</p>
         </div>
        </div>
        <h1 className="blog-title">{title}</h1>
        <p className="my-3 text-xl font-gelasio leading-7 max-sm:hidden md:max-[1100px] line-clamp-2">
          {des}
        </p>
        <div className="flex gap-4 mt-7">
          <p className="bg-grey rounded-full p-1 pb-1 pl-2 pr-2 font-medium  text-sm line-clamp-1">
            {category}
          </p>
          <span className="ml-3 flex items-center gap-2 text-dark-grey">
            <i className="fi fi-rr-heart text-xl"></i>
            {activity?.total_likes?.length}
          </span>
         
          <span className="ml-3 flex items-center gap-2 text-dark-grey">
            <i className="fi fi-rr-book-alt"></i> {activity?.total_reads}
          </span>
        </div>
      </div>
      <div className="h-28 aspect-square bg-grey">
        <img
          src={banner}
          alt="banner_img"
          className="w-full h-full aspect-square object-cover rounded-sm"
        />
      </div>
    </Link>
  );
};

export default BlogPostComponent;
