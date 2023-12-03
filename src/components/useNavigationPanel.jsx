import React from "react";
import { useDispatch } from "react-redux";
import AnimationWrapper from "./animation/animation.wrapper";
import { signOut } from "../service/slices/app.slice";
const UseNavigationPanel = ({userData}) => {
    
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(signOut());
  };
  return (
    <AnimationWrapper
      transation={{ duration: 0.2 }}
      className={"absolute right-0 z-50"}
    >
      <div className="bg-white absolute right-0 border border-grey w-60  duration-200">
        <a href="/editor" className="flex gap-2 link md:hidden pl-8 py-4">
          <i className="fi fi-rr-file-edit"></i>
          <p>Write</p>
        </a>
        <a href={`/user/username`} className="link pl-8 py-4">
          Profile
        </a>
        <a href={`/user/username`} className="link pl-8 py-4">
          Dashboard
        </a>
        <a href={`/user/username`} className="link pl-8 py-4">
          Settings
        </a>
        <span className="absolute border-t border-grey  w-[100%]"></span>
        <button className="text-left p-4 hover:bg-gray w-full pl-8 py-4" onClick={handleSignOut}>
          <h1 className="font-bold text-xl mb-1">Sign Out</h1>
          <p className="text-dark-gray">@{userData.user_name}</p>
        </button>
      </div>
    </AnimationWrapper>
  );
};

export default UseNavigationPanel;
