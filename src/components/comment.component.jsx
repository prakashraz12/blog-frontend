import React, { useCallback, useEffect, useRef, useState } from "react";
import CommentField from "./commentField.component";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useGetCommentsMutation,
  useWriteCommentMutation,
} from "../service/api/commentApi";
import AnimationWrapper from "./animation/animation.wrapper";
import CommentCardComponent from "./comment-card-wrapper.cpmponent";
import Loader from "./loader.component";
import toast from "react-hot-toast";
import NoDataMessage from "./noDataMessage.component";
const validationSchema = Yup.object({
  text: Yup.string().required("Comment is Required"),
});

const CommentPreview = ({
  blogId,
  commentArray,
  setCommentArray,
  authorId,
}) => {
  const [blog, { data, isLoading, isSuccess, isError, error }] =
    useGetCommentsMutation();

  const fetchComment = useCallback(async () => {
    await blog({ blogId });
  }, [blogId]);

  useEffect(() => {
    fetchComment();
  }, []);

  useEffect(() => {
    if (isSuccess && data.code === 200) {
      setCommentArray(data?.data);
    }
  }, [isSuccess, data]);

  return (
    <>
      {isLoading && <Loader />}
      <AnimationWrapper>
        {isSuccess &&
          commentArray?.map((comment, i) => {
            return (
              <CommentCardComponent
                commentData={comment}
                setCommentArray={setCommentArray}
                fetchComment={fetchComment}
                key={i}
                authorId={authorId}
              />
            );
          })}
        {isSuccess && commentArray.length === 0 && (
          <NoDataMessage message={"No Comments"} />
        )}
        {isError && toast.error(<p>{error.data.errors}</p>)}
      </AnimationWrapper>
    </>
  );
};
const CommentContainer = ({
  isCommentToggle,
  setCommentToggle,
  blog_id,
  authorId,
}) => {
  const commentContainerRef = useRef(null);

  const [commentArray, setCommentArray] = useState([]);
  const [
    comment,
    { data, isLoading, isError, error, isSuccess: isCommentSuccess },
  ] = useWriteCommentMutation();

  const commentState = useFormik({
    initialValues: {
      text: "",
      ishideProfile: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await comment({
        text: values.text,
        blogId: blog_id,
        ishideProfile: values.ishideProfile,
      });
    },
  });
  // ...

  // ...

  useEffect(() => {
    if (isCommentSuccess) {
      commentState.resetForm();
      toast.success(<p>Comment Success!</p>);

      const promiseToAddComment = new Promise((resolve) => {
        setCommentArray((prevComments) => {
          resolve();
          return [...prevComments, data?.data];
        });
      });

      promiseToAddComment.then(() => {
        if (commentContainerRef.current) {
          commentContainerRef.current.scrollTop =
            commentContainerRef.current.scrollHeight;
          commentContainerRef.current.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  }, [isCommentSuccess]);

  return (
    <>
      {isLoading && <Loader />}
      {isError && toast.error(<p>{error.data.errors}</p>)}
      <div
        ref={commentContainerRef}
        className={`max-sm:w-full fixed ${
          isCommentToggle ? "top-0 sm:right-0" : "top-[100%] sm:right-[-100%]"
        }  duration-700 max-sm:right-0 sm:top-0 w-[30%] min-w-[350px] h-full z-50 bg-white shadow-2xl p-5 px-8 overflow-y-auto overflow-x-hidden`}
      >
        <div className="reletive">
          <h1 className="text-xl font-medium">Comments</h1>
          <p className="text-lg mt-2 w-[70%] text-dark-grey line-clamp-1">
            Example Blog title
          </p>
          <button
            className="absolute top-0 right-0 flex justify-center items-center w-12 h-12 rounded-full bg-grey"
            onClick={() => {
              setCommentToggle(false);
            }}
          >
            <i className="fi fi-br-cross text-2xl mt-1"></i>
          </button>
        </div>
        <hr className="border-grey my-8 w-[120%] -ml-10" />

        <CommentField commentState={commentState} />
        {blog_id !== undefined && (
          <CommentPreview
            blogId={blog_id}
            authorId={authorId}
            isCommentSuccess={isCommentSuccess}
            setCommentArray={setCommentArray}
            commentArray={commentArray}
          />
        )}
      </div>
    </>
  );
};

export default CommentContainer;
