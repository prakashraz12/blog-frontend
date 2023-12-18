import React, { useCallback, useEffect, useState } from "react";
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
const validationSchema = Yup.object({
  text: Yup.string().required("Comment is Required"),
});

const CommentPreview = ({
  blogId,
  commentArray,
  setCommentArray,
  isCommentSuccess,
}) => {
  const [blog, { data, isLoading, isSuccess, isError }] =
    useGetCommentsMutation();
  const fetchComment = useCallback(async () => {
    await blog({ blogId });
  }, [blogId]);

  useEffect(() => {
    fetchComment();
  }, [isCommentSuccess]);

  useEffect(() => {
    if (isSuccess && data.code === 200) {
      setCommentArray(data?.data);
    }
  }, [isSuccess, data]);
  return (
    <AnimationWrapper>
      {isLoading && <Loader />}
      {/* {
        isSuccess ? 
      } */}
      {commentArray?.map((comment, i) => {
        return <CommentCardComponent commentData={comment} key={i} />;
      })}
    </AnimationWrapper>
  );
};
const CommentContainer = ({ isCommentToggle, setCommentToggle, blog_id }) => {
  const [commentArray, setCommentArray] = useState([]);
  const [
    comment,
    { data, isLoading, isError, error, isSuccess: isCommentSuccess },
  ] = useWriteCommentMutation();

  const commentState = useFormik({
    initialValues: {
      text: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await comment({ text: values.text, blogId: blog_id });
    },
  });

  useEffect(() => {
    if (isCommentSuccess) {
      commentState.resetForm();
      toast.success(<p>Comment</p>);
    }
  }, [isCommentSuccess]);
  return (
    <div
      className={`max-sm:w-full fixed ${
        isCommentToggle ? "top-0 sm:right-0" : "top-[100%] sm:right-[-100%]"
      }  duration-700 max-sm:right-0 sm:top-0 w-[30%] min-w-[350px] h-full z-50 bg-white shadow-2xl p-8 px-16 overflow-y-auto overflow-x-hidden`}
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
          isCommentSuccess={isCommentSuccess}
          setCommentArray={setCommentArray}
          commentArray={commentArray}
        />
      )}
    </div>
  );
};

export default CommentContainer;
