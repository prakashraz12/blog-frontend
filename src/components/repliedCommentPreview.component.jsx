import React, { useEffect, useState } from "react";
import {
  useDeleteCommentMutation,
  useGetCommentByIdQuery,
  useLikeCommentMutation,
} from "../service/api/commentApi";
import Loader from "./loader.component";
import toast from "react-hot-toast";
import { useGetUserQuery } from "../service/api/userApi";
import { timeElapsedString } from "../utils/date-formater.utils";
import AnimationWrapper from "./animation/animation.wrapper";
import { useSelector } from "react-redux";
const RepliedCommentUserProfile = ({
  userId,
  commentDate,
  id,
  commentId,
  parentCommentId,
  setChildrenCommentArray,
  setRepliedUserName,
}) => {
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [commentData] = useDeleteCommentMutation();
  const handleCommentDelete = async (e) => {
    e.preventDefault();
    const { data } = await commentData({
      id: commentId,
      parentCommentId: parentCommentId,
    });

    if (data.code === 200) {
      toast.success(<p>Deleted!</p>);
      setChildrenCommentArray((prevComment) =>
        prevComment.filter((item) => item !== commentId)
      );
    }
  };
  const { data, isLoading, isError, error, isSuccess } =
    useGetUserQuery(userId);

  useEffect(() => {
    if (isSuccess) {
      setRepliedUserName(data?.data?.personal_info?.username);
    }
  }, [isSuccess]);
  return (
    <>
      {isLoading && <Loader />}
      {isSuccess && data.code === 200 && (
        <>
          <div className="flex gap-2 justify-between">
            <div className="flex gap-2">
              <img
                src={data.data.personal_info.profile_img}
                alt="replied-profle-pivc"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-xl">
                  {data.data.personal_info.fullname}{" "}
                  <span className="">{timeElapsedString(commentDate)}</span>
                </p>
                <p className="text-sm">@{data.data.personal_info.username}</p>
              </div>
            </div>

            <div className="relative">
              <button
                className="mb-9 mr-2"
                onClick={() => {
                  setIsMenuClicked(!isMenuClicked);
                }}
              >
                <i class="fi fi-bs-menu-dots text-2xl font-medium"></i>
              </button>
              {isMenuClicked && (
                <AnimationWrapper transation={{ duration: 0.3 }}>
                  <div className="absolute top-6 right-0 bg-white rounded-sm w-[200px] shadow-xl p-2">
                    <div className="p-2 flex flex-col gap-3 ietms-start">
                      <button className="hover:underline flex gap-1 items-center">
                        <p className="text-xl">Report this user</p>
                        <i class="fi fi-rr-file-medical-alt text-sm"></i>{" "}
                      </button>

                      {userId === id && (
                        <button className="flex hover:underline gap-1 items-center">
                          <p className="text-xl">Edit Comment</p>
                          <i class="fi fi-rr-edit text-sm"></i>
                        </button>
                      )}

                      {userId === id && (
                        <button
                          className="flex  hover:underline gap-1 items-center"
                          onClick={handleCommentDelete}
                        >
                          <p className="text-xl">Delete</p>
                          <i className="fi fi-rr-trash"></i>{" "}
                        </button>
                      )}

                      {/* <button className="flex items-center gap-1 hover:underline">
                        {" "}
                        <p>See user</p> <i class="fi fi-rr-eye-crossed"></i>
                      </button> */}
                    </div>
                  </div>
                </AnimationWrapper>
              )}
            </div>
          </div>
        </>
      )}
      {isError && toast.error(<p>{error.data.errors}</p>)}
    </>
  );
};

const RepliedCommentCard = ({
  commentId,
  setParnentCommentUserName,
  setRepliedOpen,
  textInputRef,
  parentCommentId,
  setChildrenCommentArray,
}) => {
  const [repliedUserName, setRepliedUserName] = useState("");
  const sessionId = useSelector((state) => state.auth.sessionId);
  const { id } = JSON.parse(sessionId);

  const [isFullPreview, setIsFullPreview] = useState(false);
  const [isLiked, setIsLiked] = useState(null);
  const [likeComment] = useLikeCommentMutation();

  const { data, isLoading, isError, error, isSuccess } =
    useGetCommentByIdQuery(commentId);

  const hanldleLikeComment = async () => {
    const { data } = await likeComment({ commentId: commentId });
    if (data) {
      if (data?.status === "like") {
        return setIsLiked(true);
      } else {
        return setIsLiked(false);
      }
    }
  };

  useEffect(() => {
    if (isSuccess && data) {
      setIsLiked(data?.data?.likes?.includes(id));
    }
  }, [isSuccess]);
  const handleCommentReplyClicked = (e) => {
    setParnentCommentUserName(repliedUserName);
    setRepliedOpen((prevState) => !prevState);

    if (textInputRef && textInputRef.current) {
      textInputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {isSuccess && data?.code === 200 && (
        <div className=" rounded-sm p-3 mb-2 border-l-2 border-grey">
          <div className="mb-2">
            {data?.data?.userId && (
              <RepliedCommentUserProfile
                id={id}
                setChildrenCommentArray={setChildrenCommentArray}
                parentCommentId={parentCommentId}
                commentId={commentId}
                setRepliedUserName={setRepliedUserName}
                userId={data?.data?.userId}
                commentDate={data?.data?.publishedAt}
              />
            )}
          </div>
          <div
            className={`  ${isFullPreview ? "h-full" : "h-34"} overflow-auto `}
          >
            {!isFullPreview ? (
              <p className="">
                {data?.data?.text?.slice(0, 159)}
                {data?.data?.text?.length > 160 && "..."}
              </p>
            ) : (
              <p>{data?.data?.text}</p>
            )}
            {data.data?.text.length > 160 && (
              <p
                className="cursor-pointer text-twitter"
                onClick={() => {
                  setIsFullPreview(!isFullPreview);
                }}
              >
                {!isFullPreview ? "Show More" : "Show Less"}
              </p>
            )}
            <div className="p-3 justify-between flex">
              <button
                onClick={hanldleLikeComment}
                className="flex gap-1 items-center"
              >
                {isLiked ? (
                  <i class="fi fi-sr-heart text-red text-xl font-medium"></i>
                ) : (
                  <i className="fi fi-rr-heart text-xl"></i>
                )}
              </button>
              <button onClick={handleCommentReplyClicked}>
                <i className="fi fi-rr-reply-all"></i>{" "}
              </button>
            </div>
          </div>
        </div>
      )}
      {isError && toast.error(<p>{error.data.errors}</p>)}
    </>
  );
};

const RepliedCommentPreview = ({
  commentChildrenId,
  setChildrenComment,
  setRepliedOpen,
  blogId,
  textInputRef,
  replieCommentState,
  parentCommentId,
  childrenCommentArray,
  setParnentCommentUserName,
  setChildrenCommentArray,
}) => {
  return (
    <>
      {commentChildrenId && (
        <RepliedCommentCard
          blogId={blogId}
          setChildrenCommentArray={setChildrenCommentArray}
          childrenCommentArray={childrenCommentArray}
          parentCommentId={parentCommentId}
          textInputRef={textInputRef}
          replieCommentState={replieCommentState}
          setParnentCommentUserName={setParnentCommentUserName}
          setRepliedOpen={setRepliedOpen}
          commentId={commentChildrenId}
          setChildrenComment={setChildrenComment}
        />
      )}
    </>
  );
};

export default RepliedCommentPreview;
