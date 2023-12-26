import React from "react";
import AnimationWrapper from "./animation/animation.wrapper";

const NotificationContainer = ({ setNotificationOpen }) => {
  return (
    <div
      className={`max-sm:w-full fixed
    "top-0 sm:right-0" : "top-[100%] sm:right-[-100%]"
  }  duration-700 max-sm:right-0 sm:top-0 w-[30%] min-w-[350px] h-full z-50 bg-white shadow-2xl p-5 px-5 overflow-y-auto overflow-x-hidden`}
    >
      <AnimationWrapper>
        <button
          className="flex justify-end w-[250px] pr-5 "
          onClick={() => {
            setNotificationOpen(false);
          }}
        >
          <i className="fi fi-rr-cross w-12 h-12 font-medium flex justify-center items-center p-2 hover:bg-grey  rounded-full"></i>{" "}
        </button>
        <div className="mb-8 ">
          <h1 className="text-2xl font-medium">Notification(10)</h1>
        </div>

        <div className="mt-2 bg-grey p-3 rounded-sm w-[250px]">
          <div className="flex gap-2">
            <img
              src="https://ylpapp.isb.edu/user/Passport_photo_samples/Sample-3---wrong.jpg"
              alt=""
              className="w-10 h-10 object-cover rounded-full"
            />
            <div>
              <p>Prakash Raz liked on your post {} 24m ago</p>
            </div>
          </div>
        </div>
      </AnimationWrapper>
    </div>
  );
};

export default NotificationContainer;
