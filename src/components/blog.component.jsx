import React from "react";
import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import AnimationWrapper from "./animation/animation.wrapper";
import defaultBanner from "../imgs/blog banner.png";
import { useState } from "react";
import { useEffect } from "react";
import { useUploadImageMutation } from "../service/api/cloudinaryUpload.service";
import toast from "react-hot-toast";
import { cloudinaryErrorMessage } from "./form/form.config";
import { loadingToast } from "../utils/toast.utils";
import { useFormik } from "formik";
import EditorJS from "@editorjs/editorjs";
import { tools } from "../utils/blog.config";

const BlogEditor = () => {
  //
  const [bannerImage, setBannerImage] = useState(null);
  //
  const [imageUplaod, { isLoading: imageUploading, isSuccess, status }] =
    useUploadImageMutation();

  //
  const blogForm = useFormik({
    initialValues: {
      title: "",
      banner: "",
      des: "",
      content: [],
    },
  });

  //
  const handleBannerChnage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setBannerImage(reader.result);
      };
    }
  };

  //
  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("file", bannerImage);
    formData.append("upload_preset", "prakash-media");

    const result = await imageUplaod(formData);
    if (result.error) {
      toast.error(cloudinaryErrorMessage);
    }
    if (result.data) {
      blogForm.setFieldValue("banner", result.data.secure_url);
    }
  };

  //
  useEffect(() => {
    if (bannerImage !== null) {
      handleImageUpload();
    }
  }, [bannerImage]);

  useEffect(() => {
    let loadingToastId;

    if (imageUploading) {
      loadingToastId = loadingToast("uploading..");
    } else if (isSuccess) {
      toast.dismiss(loadingToastId);
      setBannerImage(null);
    }

    return () => {
      if (loadingToastId) {
        toast.dismiss(loadingToastId);
      }
    };
  }, [imageUploading, isSuccess]);

  useEffect(() => {
    let editor = new EditorJS({
      holder: "text-editor",
      data: "",
      tools: tools,
      placeholder: "What's On Your Mind?",
    });
  }, []);
  return (
    <>
      <nav className="navbar">
        <Link to={"/"} className="flex-none w-10">
          <img src={logo} alt="image" />
        </Link>
        <p className="max-md:hidden text-black line-clamp-1 w-full">New Blog</p>
        <div className="flex gap-4 ml-auto">
          <button className="btn-dark py-2">Publish</button>
          <button className="btn-light py-2">Save Draft</button>
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

            <div id="text-editor" className="font-gelasio"></div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default BlogEditor;
