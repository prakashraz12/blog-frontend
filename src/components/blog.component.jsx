import React from "react";
import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import AnimationWrapper from "./animation/animation.wrapper";
import defaultBanner from "../imgs/blog banner.png";
import QuillEditor from "./text-editor";

const BlogEditor = ({
  blogForm,
  handleBannerChnage,
  handlePublish
}) => {
  //

  return (
    <>
      <nav className="navbar">
        <Link to={"/"} className="flex-none w-10">
          <img src={logo} alt="image" />
        </Link>
        <p className="max-md:hidden text-black line-clamp-1 w-full">New Blog</p>
        <div className="flex gap-4 ml-auto">
          <button className="btn-dark py-2" onClick={handlePublish}>
            Publish
          </button>
        </div>
      </nav>

      <AnimationWrapper>
        <section>
          <div className="mx-auto max-w-[900px] w-full">
            <div className="reletive aspect-video hover:opacity-80 border-4 bg-white border-grey">
              <label htmlFor="uploadBanner">
                <img
                  src={blogForm.values.banner || defaultBanner}
                  alt="banner image"
                  className="z-20"
                />
                <input
                  type="file"
                  id="uploadBanner"
                  accept=".png, .jpg, .jpeg"
                  hidden
                  onChange={handleBannerChnage}
                />
              </label>
            </div>
            <textarea
              name="title"
              id=""
              cols="30"
              rows="10"
              value={blogForm.values.title}
              onChange={blogForm.handleChange}
              placeholder="Blog Title"
              className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
            ></textarea>

            <hr className="w-full opacity-10 my-5" />
            <QuillEditor blogForm={blogForm}/>

          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default BlogEditor;
