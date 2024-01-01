import React, { useRef, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
const SideNav = () => {
  let page = location.pathname.split("/")[2];
  const [pageState, setPageState] = useState(page?.replace("-", " "));
  const [showSideNav, setShowSideNav] = useState(false);
  const activeTabline = useRef();
  const sidebarIcon = useRef();
  const pageStateTab = useRef();

  const changePageState = (e) => {
    let { offsetWidth, offsetLeft } = e.target;
    activeTabline.current.style.width = offsetWidth + "px";
    activeTabline.current.style.left = offsetLeft + "px";

    if (e.target === sidebarIcon.current) {
      setShowSideNav(true);
    } else {
      setShowSideNav(false);
    }
  };
  return (
    <>
      <section className="relative flex gap-10 py-0 m-0 max-md:flex-col">
        <div className="sticky top-[80px] z-30">
          <div className="md:hidden bg-white py-1 border-b border-grey flex flex-nowrap overflow-x-auto">
            <button
              className="p-5 capitalize"
              ref={sidebarIcon}
              onClick={changePageState}
            >
              <i className="fi fi-rr-bars-staggered text-xl"></i>
            </button>
            <button
              className="p-5 capitalize"
              ref={pageStateTab}
              onClick={changePageState}
            >
              {pageState}
            </button>
            <hr
              className="absolute bottom-0 duration-500"
              ref={activeTabline}
            />
          </div>
          <div
            className={`min-w-[200px] h-cover md:sticky top-24 overflow-y-auto p-6 md:pr-0 md:border-grey md:border-r absolute max-md:top-[64px] bg-white max-md:w-[calc(100%+80px)] max-md:px-16 max-md:-ml-7 duration-500 ${
              !showSideNav
                ? "max-md:opacity-0 max-md:pointer-event-none max-md:hidden"
                : "opacity-100 pointer-events-auto"
            }`}
          >
            <h1 className="text-xl">Dashboard</h1>
            <hr className="border-grey -ml-6 mb-8 mr-6" />
            <NavLink
              to={"/dashboard/blogs"}
              className={"sidebar-link"}
              onClick={(e) => {
                setPageState(e.target.innerText);
              }}
            >
              <i className="fi fi-rr-document"></i> Blogs
            </NavLink>
            <NavLink
              to={"/dashboard/blogs"}
              className={"sidebar-link"}
              onClick={(e) => {
                setPageState(e.target.innerText);
              }}
            >
              <i className="fi fi-rr-bell"></i>Notification
            </NavLink>

            <NavLink
              to={"/dashboard/blogs"}
              className={"sidebar-link"}
              onClick={(e) => {
                setPageState(e.target.innerText);
              }}
            >
              <i className="fi fi-rr-file-edit"></i>Write
            </NavLink>
            <h1 className="text-xl text-dark-grey mt-20 mb-3">Settings</h1>
            <hr className="border-grey -ml-6 mb-8 mr-6" />
            <NavLink
              to={"edit-profile"}
              className={"sidebar-link"}
              onClick={(e) => {
                setPageState(e.target.innerText);
              }}
            >
              <i className="fi fi-rr-user"></i>Edit Profile
            </NavLink>
            <NavLink
              to={"change-password"}
              className={"sidebar-link"}
              onClick={(e) => {
                setPageState(e.target.innerText);
              }}
            >
              <i className="fi fi-rr-lock"></i>Change Password
            </NavLink>
          </div>
        </div>
        <div className="mt-7 w-full">
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default SideNav;
