import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLikeBlogMutation } from "../service/api/blogApi.service";

const BlogIntractionsComponent = ({
  blogDetails,
  authorId,
  blog_id,
  likedLength,
  commentLength,
  setCommentToggle,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const auth = useSelector((state) => state.auth.sessionId);
  const [likedCount, setLikeCount] = useState();
  const [blogId, { isLoading, isSuccess }] = useLikeBlogMutation();

  const { id } = JSON.parse(auth);

  const handleLikedUnliked = async () => {
    const resposnse = await blogId({ blogId: blog_id });
    if (resposnse?.data?.code === 200) {
      setLikeCount(resposnse?.data?.data?.length);
      setIsLiked(!isLiked);
    }
  };

  useEffect(() => {
    if (blogDetails?.total_likes?.includes(id)) {
      setIsLiked(true);
    }
  }, [blogDetails, id]);
  return (
    <>
      <hr className="border-grey my-2" />
      <div className="flex gap-6 justify-between">
        <div className="flex gap-3 items-center">
          <button
            className="w-10 h-10 rounded-full flex item-center justify-center bg-gray/80"
            onClick={handleLikedUnliked}
          >
            {isLiked ? (
              <>
                <i className="fi fi-sr-heart text-red"></i>
              </>
            ) : (
              <i className="fi fi-rr-heart "></i>
            )}
          </button>
          <p className="text-xl text-dark-grey">{likedCount || likedLength}</p>
          <button
            className="w-10 h-10 rounded-full flex item-center justify-center bg-gray/80"
            onClick={() => {
              setCommentToggle((prev) => !prev);
            }}
          >
            <i className="fi fi-rr-comment"></i>
          </button>
          <p className="text-xl text-dark-grey">{commentLength}</p>
          <button className="w-10 h-10 rounded-full flex item-center justify-center bg-gray/80">
            <i className="fi fi-rr-book-alt"></i>{" "}
          </button>
          <p className="text-xl text-dark-grey">{blogDetails?.total_reads}</p>
        </div>
        <div className="flex gap-6 items-center">
          {id === authorId && (
            <Link
              className="flex gap-2 items-center"
              to={`https://twitter.com/intent/tweet?text=Read ${"title"}&url=${
                location.href
              }`}
            >
              <i className="fi fi-rr-file-edit"></i> <p>Edit</p>
            </Link>
          )}
          <Link
            to={`https://twitter.com/intent/tweet?text=Read ${"title"}&url=${
              location.href
            }`}
          >
            <i className="fi fi-brands-twitter text-xl hover:text-twitter"></i>
          </Link>
        </div>
      </div>

      <hr className="border-grey my-2" />
    </>
  );
};

export default BlogIntractionsComponent;
