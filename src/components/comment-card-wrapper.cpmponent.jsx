import React from "react";
import { useGetUserQuery } from "../service/api/userApi";
import Loader from "./loader.component";
import { getDay } from "../utils/date-formater.utils";

const CommentUserData = ({ userId, publishedAt }) => {
  const { data, isLoading, isSuccess } = useGetUserQuery(userId);
  return (
    <>
      {isLoading && <Loader />}
      {isSuccess && data?.code === 200 && (
        <div className="flex gap-3 items-center mb-8">
          <img
            src={data.data?.personal_info.profile_img}
            alt="profile image"
            className="w-6 h-6 rounded-full"
          />
          <p className="line-clamp-1">
            {data.data.personal_info.fullname} @
            {data.data.personal_info.username}
          </p>
          <p className="">{getDay(publishedAt)}</p>
        </div>
      )}
    </>
  );
};
const CommentCardComponent = ({ commentData }) => {
  return (
    <div className="w-full">
      <div className="my-5 p-6 rounded-md border border-grey">
        {commentData?.userId !== undefined && (
          <CommentUserData
            userId={commentData?.userId}
            publishedAt={commentData?.publishedAt}
          />
        )}
        <p className="font-gelasio text-xl ml-3">{commentData?.text}</p>
      </div>
    </div>
  );
};

export default CommentCardComponent;
