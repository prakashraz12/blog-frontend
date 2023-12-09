import React from "react";
import AnimationWrapper from "../animation/animation.wrapper";
import { blogTextAreaLimit } from "./form.config";
import TagsComponent from "../tags.component";

const BlogPublishForm = ({
  blogForm,
  handlePublishPageClose,
  handleBlogSaveToDraft,
}) => {
  const handleTagsDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const handleTagsGenretor = (e) => {
    if (e.keyCode === 13 || e.keyCode === 188) {
      e.preventDefault();
      const value = e.target.value;

      if (blogForm.values.tags.length < 10) {
        if (!blogForm.values.tags.includes(value) && value.length) {
          blogForm.setFieldValue("tags", [
            ...blogForm.values.tags,
            e.target.value,
          ]);
        }
      }
      e.target.value = "";
    }
  };

  const handleTagDelete = (index) => {
    const updatedTags = blogForm.values.tags.filter((item, i) => i !== index);
    blogForm.setFieldValue("tags", [...updatedTags]);
  };

  console.log(blogForm.errors);
  return (
    <AnimationWrapper>
      <section className="w-screen min-h-screen grid items-center lg:grid-cols-2 py-16 lg:gap-4">
        <button
          className="w-12 h-12 absolute right-[5vw] z-10 top-[5%] lg:top-[10%]"
          onClick={handlePublishPageClose}
        >
          <i className="fi fi-br-cross"></i>
        </button>

        <div className="max-w-[550px] center">
          <p className="text-dark-gray mb-1">Preview</p>
          <div className="w-full aspect-video rounded-lg overflow-hidden bg-grey mt-4">
            <img src={blogForm.values.banner} alt="banner-image" />
          </div>
          <h1 className="text-4xl font-medium mt-2 leading-tight line-clamp-2">
            {blogForm.values.title}
          </h1>
          <p className="font-gelasio line-clamp-2 text-xl">
            {blogForm.values.des}
          </p>
        </div>
        <div className="border-gray lg:border-1 lg:pl-8">
          <p className="text-dark-gray mb-2 mt-9">Blog Title</p>

          <input
            type="text"
            name="title"
            onBlur={blogForm.handleBlur}
            placeholder="Blog Title"
            value={blogForm.values.title}
            onChange={blogForm.handleChange}
            className="input-box pl-4 "
          />
          {blogForm.touched.title && Boolean(blogForm.errors.title) && (
            <p className="text-xl text-red">{blogForm.errors.title}</p>
          )}

          <p className="text-dark-gray mb-2 mt-9">Short Description</p>

          <textarea
            name="des"
            id=""
            maxLength={blogTextAreaLimit}
            value={blogForm.values.des}
            onChange={blogForm.handleChange}
            onKeyDown={handleTagsDown}
            className="h-40 resize-none leading-7 input-box pl-4"
          ></textarea>

          <p className="mt-1 text-dark-grey text-sm text-right">
            {blogTextAreaLimit - blogForm.values.des.length} left
          </p>
          {blogForm.touched.des && Boolean(blogForm.errors.des) && (
            <p className="text-xl text-red">{blogForm.errors.des}</p>
          )}
          <p className="text-dark-gray mb-2 mt-9">Blog Tags</p>

          <div className="relative input-box pl-2 py-2 pb-4">
            <input
              type="text"
              placeholder="Tages"
              onBlur={blogForm.handleBlur}
              onKeyDown={handleTagsGenretor}
              className="sticky input-box bg-white top-0 left-0 pl-4 mb-3 focus:bg-white"
            />
            {blogForm.values.tags.length > 0 &&
              blogForm.values.tags.map((item, index) => (
                <TagsComponent
                  tags={item}
                  key={index}
                  handleTagDelete={() => handleTagDelete(index)}
                />
              ))}
            <p className="mt-1 text-dark-grey text-sm text-right">
              {10 - blogForm.values.tags.length} left
            </p>
          </div>
          {blogForm.touched.tags && Boolean(blogForm.errors.tags) && (
            <p className="text-xl text-red">{blogForm.errors.tags}</p>
          )}
          <br />
          <div className="flex gap-2 ">
            <button className="btn-dark px-8" onClick={blogForm.handleSubmit}>
              Upload Blog
            </button>
            <button className="btn-light px-8" onClick={handleBlogSaveToDraft}>
              Save Draft
            </button>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default BlogPublishForm;
