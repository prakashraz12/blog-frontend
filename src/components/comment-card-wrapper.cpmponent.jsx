import React, { useEffect, useRef, useState } from "react";
import { useGetUserQuery } from "../service/api/userApi";
import Loader from "./loader.component";
import { getFullDay, timeElapsedString } from "../utils/date-formater.utils";
import { useFormik } from "formik";
import {
  useDeleteCommentMutation,
  useLikeCommentMutation,
  useRepliedCommentMutation,
} from "../service/api/commentApi";
import RepliedCommentPreview from "./repliedCommentPreview.component";
import AnimationWrapper from "./animation/animation.wrapper";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import unknown from "././../imgs/unknown.jpg";
import { EmojiPicker } from "./emojiPicker.component";

const CommentUserData = ({
  userId,
  publishedAt,
  authorId,
  commentId,
  isHideProfile,
  setCommentArray,
  setParnentCommentUserName,
}) => {
  const [hideProfile, setHideProfile] = useState(isHideProfile);
  const sessionId = useSelector((state) => state.auth.sessionId);
  const { id } = JSON.parse(sessionId);

  const [commentData, { isLoading: isDeleteCommentLoading }] =
    useDeleteCommentMutation();

  const [isMenuClicked, setMenuClicked] = useState(false);
  const { data, isLoading, isSuccess } = useGetUserQuery(userId);

  const handleMenuClicked = () => {
    setMenuClicked(!isMenuClicked);
  };

  const handleCommentDelete = async (e) => {
    e.preventDefault();
    const { data } = await commentData({ id: commentId });
    if (data.code === 200) {
      toast.success(<p>Deleted!</p>);
      setMenuClicked(false);
      setCommentArray((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
    }
  };
  useEffect(() => {
    if (isSuccess) {
      setParnentCommentUserName(
        hideProfile
          ? `Unknown${commentId.slice(0, 3)}`
          : data.data.personal_info.username
      );
    }
  }, [isSuccess]);
  return (
    <>
      {isLoading || (isDeleteCommentLoading && <Loader />)}
      {isSuccess && data?.code === 200 && (
        <div className="flex  justify-between  ">
          <div className="flex gap-3  mb-2 p-2">
            <img
              src={hideProfile ? unknown : data.data?.personal_info.profile_img}
              alt="profile image"
              className="w-10 h-10 rounded-full mt-2"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-1">
                  <p className="line-clamp-1 text-xl">
                    {hideProfile
                      ? `Unknown${commentId.slice(0, 3)}`
                      : data.data.personal_info.fullname}
                  </p>
                  <span>{timeElapsedString(publishedAt)}</span>
                </div>
              </div>
              {authorId === data.data?._id && hideProfile === false && (
                <div className="flex items-center gap-1 mt-1">
                  <p className="bg-twitter pt-0.5 pb-0.5 pl-2 pr-2 rounded-full text-sm text-white">
                    Author
                  </p>
                  <i class="fi fi-sr-circle-star"></i>
                </div>
              )}
            </div>
          </div>
          <div className="relative">
            <button className="mb-8 mr-3" onClick={handleMenuClicked}>
              <i class="fi fi-bs-menu-dots text-2xl font-medium"></i>
            </button>
            {isMenuClicked && (
              <AnimationWrapper transation={{ duration: 0.3 }}>
                <div className="absolute top-6 right-0 bg-grey rounded-sm w-[200px] shadow-xl p-2">
                  <div className="p-2 flex flex-col gap-3 ietms-start">
                    {data.data?._id !== id && (
                      <button className="hover:underline flex gap-1 items-center">
                        <p className="text-xl">Report this user</p>
                        <i class="fi fi-rr-file-medical-alt text-sm"></i>{" "}
                      </button>
                    )}
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
                        disabled={isDeleteCommentLoading}
                      >
                        <p className="text-xl">Delete</p>
                        <i className="fi fi-rr-trash"></i>{" "}
                      </button>
                    )}
                    {authorId === id && hideProfile && (
                      <button
                        className="flex items-center gap-1 hover:underline"
                        onClick={() => {
                          setHideProfile(true);
                        }}
                      >
                        {" "}
                        <p>See user</p> <i class="fi fi-rr-eye-crossed"></i>
                      </button>
                    )}
                  </div>
                </div>
              </AnimationWrapper>
            )}
          </div>
        </div>
      )}
    </>
  );
};
const CommentCardComponent = ({
  commentData,
  authorId,
  setCommentArray,
}) => {
  const textInputRef = useRef(null);
  const [childrenCommentArray, setChildrenCommentArray] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const sessionId = useSelector((state) => state.auth.sessionId);
  const { id } = JSON.parse(sessionId);
  const [isPostAlreadyLiked, setIsPostAlreadyLiked] = useState(
    commentData?.likes?.includes(id)
  );
  const [likeCount, setLikeCount] = useState(commentData?.likes?.length);
  const [parentCommentUserName, setParnentCommentUserName] = useState("");
  const [isChildrenCommentShow, setIsChildrenCommentShow] = useState(false);
  const [isRepliedOpen, setRepliedOpen] = useState(false);

  const [repledComment, { data, isLoading, isError, error, isSuccess }] =
    useRepliedCommentMutation();
  const [likeComment] = useLikeCommentMutation();

  const replieCommentState = useFormik({
    initialValues: {
      text: "",
    },
    onSubmit: async (values) => {
      const text = `@${parentCommentUserName} ${values.text}`;
      await repledComment({
        parentCommentId: commentData?._id,
        text: text,
        blogId: commentData?.blogId,
      });
    },
  });

  const handleEmojiSelect = (emoji) => {
    replieCommentState.setFieldValue(
      "text",
      replieCommentState.values.text + emoji.native
    );
  };

  const handleLikeComment = async (commentId) => {
    const { data } = await likeComment({ commentId: commentId });
    setLikeCount((prevLikeCount) => {
      if (data?.status === "like") {
        return prevLikeCount + 1;
      } else {
        return prevLikeCount - 1;
      }
    });

    setIsPostAlreadyLiked((prevState) => {
      if (data?.status === "like") {
        return setIsPostAlreadyLiked(true);
      } else {
        return setIsPostAlreadyLiked(false);
      }
    });
  };

  const handleReplyOpen = () => {
    setRepliedOpen(true);
    if (textInputRef.current) {
      textInputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    if (isSuccess) {
      setChildrenCommentArray((prevState) => [...prevState, data?._id]);
      setIsChildrenCommentShow(true);
      replieCommentState.handleReset();
      setRepliedOpen(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (commentData?.replies?.length > 0) {
      setChildrenCommentArray((prevState) => {
        const uniqueCommentIds = new Set([
          ...prevState,
          ...commentData.replies,
        ]);
        return [...uniqueCommentIds];
      });
    }
  }, [commentData]);

  return (
    <div className="w-full">
      {isError && toast.error(<p>{error.data.errors}</p>)}
      {isLoading && <Loader />}
      <div className="my-5 p-2 rounded-md border border-grey">
        {commentData?.userId !== undefined && (
          <CommentUserData
            setCommentArray={setCommentArray}
            setParnentCommentUserName={setParnentCommentUserName}
            authorId={authorId}
            isHideProfile={commentData?.ishideProfile}
            userId={commentData?.userId}
            commentId={commentData._id}
            publishedAt={commentData?.publishedAt}
          />
        )}

        <p className="ml-3">{commentData?.text}</p>
        <div className="flex gap-5 items-center justify-between mt-5 p-3">
          <div className="flex items-center gap-5">
            <button
              className="flex items-center gap-2"
              onClick={() => {
                handleLikeComment(commentData?._id);
              }}
            >
              {isPostAlreadyLiked ? (
                <i class="fi fi-sr-heart text-red text-xl font-medium"></i>
              ) : (
                <i className="fi fi-rr-heart text-xl"></i>
              )}
              <p className="text-xl">{likeCount}</p>
            </button>
            <div className="flex items-start gap-2">
              <button>
                <i className="fi fi-rr-comment-alt-middle text-xl"></i>
              </button>
              <button
                onClick={() => {
                  if (childrenCommentArray.length > 0) {
                    setIsChildrenCommentShow(!isChildrenCommentShow);
                  }
                }}
              >
                {childrenCommentArray.length === 0 ? (
                  <p>No comments</p>
                ) : (
                  <p className="cursor-pointer">
                    {isChildrenCommentShow ? "Hide" : "Show"}{" "}
                    {childrenCommentArray.length} replies
                  </p>
                )}
              </button>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <button onClick={handleReplyOpen}>Reply</button>
            <i class="fi fi-rr-reply-all"></i>
          </div>
        </div>
        {isChildrenCommentShow && (
          <AnimationWrapper transation={{ duration: 0.3 }}>
            <div className="pl-8">
              {childrenCommentArray?.map((item, index) => (
                <RepliedCommentPreview
                  setChildrenCommentArray={setChildrenCommentArray}
                  parentCommentId={commentData?._id}
                  textInputRef={textInputRef}
                  setRepliedOpen={setRepliedOpen}
                  setParnentCommentUserName={setParnentCommentUserName}
                  blogId={commentData?.blogId}
                  commentChildrenId={item}
                  key={index}
                />
              ))}
            </div>
          </AnimationWrapper>
        )}
        <div className="mt-8 ml-8 relative">
          {isRepliedOpen && (
            <>
              <form onSubmit={replieCommentState.handleSubmit}>
                <div className="border-2 p-4 rounded-xl border-grey">
                  <textarea
                    name="text"
                    ref={textInputRef}
                    onClick={() => {
                      if (showEmojiPicker) {
                        return setShowEmojiPicker(false);
                      }
                    }}
                    value={replieCommentState.values.text}
                    onChange={replieCommentState.handleChange}
                    placeholder={`Replying to ${parentCommentUserName}`}
                    className="placeholder:text-dark-grey resize-none h-[100px] overflow-auto outline-none border-none w-full"
                  ></textarea>
                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    😊
                  </button>
                </div>
                {showEmojiPicker && (
                  <AnimationWrapper transation={{duration:0.3}}>
                    <div className="h-[150px] w-full absolute mt-2 z-10">
                      <EmojiPicker onEmojiSelect={handleEmojiSelect} />
                    </div>
                  </AnimationWrapper>
                )}

                <div className="flex items-center gap-1 justify-end">
                  <button
                    className="bg-twitter text-white  mt-5 pl-3 pr-3 pt-2 pb-2 rounded-full  items-center"
                    type="submit"
                  >
                    Reply
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCardComponent;
