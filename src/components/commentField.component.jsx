import React, { useState } from "react";
import { useSelector } from "react-redux";
import { EmojiPicker } from "./emojiPicker.component";
import AnimationWrapper from "./animation/animation.wrapper";

const CommentField = ({ commentState }) => {
  const [isEmojiOpen, setEmojiOpen] = useState(false);
  const sessionState = useSelector((state) => state.auth.sessionId);
  const { profile_img } = JSON.parse(sessionState);

  const handleEmojiSelect = (emoji) => {
    commentState.setFieldValue("text", commentState.values.text + emoji.native);
  };
  return (
    <div className="flex gap-1 pb-7 border-b-2 border-grey">
      <img
        src={profile_img || ""}
        alt="loged-in-profile-imgw"
        className="h-10 w-10 rounded-full object-cover"
      />
      <form onSubmit={commentState.handleSubmit} className="w-full ">
        <div className="reletive w-full">
          <textarea
            value={commentState.values.text}
            onChange={commentState.handleChange}
            name="text"
            onClick={() => {
              if (isEmojiOpen) {
                return setEmojiOpen(false);
              }
            }}
            placeholder="What are your thoughts?"
            className="input-box pl-5 placeholder:text-dark-grey resize-none h-[150px] overflow-auto w-full"
          ></textarea>
          <p
            className="flex justify-end w-full text-xl cursor-pointer"
            onClick={() => {
              setEmojiOpen(!isEmojiOpen);
            }}
          >
            😊
          </p>
          {isEmojiOpen && (
            <AnimationWrapper transation={{ duration: 0.3 }}>
              <div className="z-10 absolute">
                <EmojiPicker onEmojiSelect={handleEmojiSelect} />
              </div>
            </AnimationWrapper>
          )}
        </div>
        <div className="flex items-center mb-2 mt-2">
          <input
            id="default-checkbox"
            type="checkbox"
            name="ishideProfile"
            value={commentState.values.ishideProfile}
            onChange={commentState.handleChange}
            className="w-4 h-4 text-twitter bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          ></input>
          <label
            for="default-checkbox"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Hide my profile.
          </label>
        </div>

        {commentState.touched.text && Boolean(commentState.errors.text) && (
          <p className="text-red">{commentState.errors.text}</p>
        )}
        <button className="btn-dark mt-5 px-5" type="submit">
          {"Comment"}
        </button>
      </form>
    </div>
  );
};

export default CommentField;
