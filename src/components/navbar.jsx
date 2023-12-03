import React from "react";
import logo from "../imgs/logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import UseNavigationPanel from "./useNavigationPanel";
const Navbar = () => {
  const auth = useSelector((state) => state.auth.sessionId);
  const [userPanelView, setUserPanelView] = useState(false);

  const [userData, setUserData] = useState({
    profile_img: "",
    access_token: null,
    user_name:""
  });
  

const handleShowUserPanel = ()=>{
  setUserPanelView(!userPanelView);
}

  useEffect(() => {
    if (auth !== null) {
      const { access_token, profile_img,username } = JSON.parse(auth);
      setUserData({ profile_img: profile_img, access_token: access_token, user_name:username });
    }
  }, [auth]);
  
  return (
    <nav className="navbar">
      <a href="/" className="flex-none w-10">
        <img src={logo} alt="logo_image" className="w-full" />
      </a>
      <div className="absoulate bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto">
        <input
          type="text"
          placeholder="Search"
          className="w-full md:auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
        />
        <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey hidden md:block"></i>
      </div>

      <div className="flex items-center gap-3 md:gap-6 ml-auto">
        <a href={"/editor"} className="hidden md:flex gap-2 link">
          <i className="fi fi-rr-file-edit"></i>
          <p>Write</p>
        </a>
        {userData.access_token !== null ? (
          <>
            <Link className="">
              <button className="w-12 h-12 rounded-full bg-grey relative hover:bg-black/10">
                <i className="fi fi-rr-bell text-2xl block mt-1"></i>
              </button>
            </Link>
            <div className="relative">
              <button className="w-12 h-12 mt-1 " onClick={handleShowUserPanel}>
                <img src={userData.profile_img} alt="image" className="w-full h-full object-cover rounded-full"/>
              </button>
              {
                userPanelView && <UseNavigationPanel userData={userData}/>
              }
            </div>
          </>
        ) : (
          <Link className="btn-dark py-2" to="/signin">
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
