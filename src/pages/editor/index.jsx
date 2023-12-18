import React from "react";
import AuthLayout from "../../layout/auth.layout";
import BlogEditor from "../../components/blog.component";
import { tools } from "../../utils/blog.config";
import { loadingToast } from "../../utils/toast.utils";
import { useState } from "react";
import { useUploadImageMutation } from "../../service/api/cloudinaryUpload.service";
import { useEffect } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import BlogPublishForm from "../../components/form/blogPublish.form";
import logo from "../../imgs/logo.png";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useCreateBlogMutation } from "../../service/api/blogApi.service";
import { blogCategories } from "../../config/constant";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  banner: Yup.string().required("Banner Image is required"),
  des: Yup.string().required("Description is reqiured"),
  tags: Yup.array().min(5).required("Minimun 5 tages required."),
  category: Yup.string()
    .oneOf(blogCategories.map((values) => values))
    .required("Category Must be Required"),
});

const EditorPage = () => {
  const navigate = useNavigate();
  const [bannerImage, setBannerImage] = useState(null);
  const [editorMode, setEditorMode] = useState("editor");
  const [blogType, setBlogType] = useState("publish");
  //
  const [imageUplaod, { isLoading: imageUploading, isSuccess }] =
    useUploadImageMutation();
  const [
    blogData,
    { data, isSuccess: isSuccessFullyBlogCreated, isError, error },
  ] = useCreateBlogMutation();
  //
  const blogForm = useFormik({
    initialValues: {
      title: "",
      banner: "",
      des: "",
      tags: [],
      content: "",
      category: "",
      draft: blogType === "publish" ? false : true,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await blogData(values);
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

  const handlePublish = () => {
    if (!blogForm.values.banner.length) {
      return toast.error("Please upload banner image");
    }

    if (!blogForm.values.title.length) {
      return toast.error("Please Write Title");
    }

    if (!blogForm.values.content.length) {
      return toast.error("Please write some content");
    } else {
      setEditorMode("publish");
    }
  };

  const handlePublishPageClose = () => {
    setEditorMode("editor");
  };

  const handleBlogSaveToDraft = () => {
    setBlogType("draft");
    blogForm.handleSubmit;
  };

  useEffect(() => {
    if (isSuccessFullyBlogCreated && data !== undefined) {
      navigate("/");
    }
  }, [isSuccessFullyBlogCreated, data]);

  return (
    <div>
      {editorMode === "editor" ? (
        <>
          <BlogEditor
            blogForm={blogForm}
            handlePublish={handlePublish}
            handleBannerChnage={handleBannerChnage}
          />
        </>
      ) : (
        <BlogPublishForm
          blogForm={blogForm}
          handleBlogSaveToDraft={handleBlogSaveToDraft}
          handlePublishPageClose={handlePublishPageClose}
        />
      )}
    </div>
  );
};

export default EditorPage;
