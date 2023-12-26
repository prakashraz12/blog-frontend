import React from "react";
import { Link } from "react-router-dom";
import { getDay } from "../utils/date-formater.utils";

const TrendingBlogsComponent = ({ item, i }) => {
  const {
    title,
    blog_id: id,
    author: {
      personal_info: { fullname, username, profile_img },
    },
    createdAt,
  } = item;
  return (
    <Link to={`/blog/${id}`} className="flex gap-5 mb-4">
      <h1 className="blog-index">{i < 10 ? "0" + (i + 1) : i}</h1>
      <div>
        <div className="flex gap-2 items-center mb-8">
          <img
            src={profile_img}
            alt="profile_img"
            className="w-6 h-6 rounded-full"
          />
          <p className="line-clamp-1">
            {fullname} @ {username}
          </p>
          <p className="min-w-fit">{getDay(createdAt)}</p>
        </div>

        <h1 className="blog-title">{title}</h1>
      </div>
    </Link>
  );
};

export default TrendingBlogsComponent;
