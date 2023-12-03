import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import { useDispatch } from "react-redux";
import { cloudinaryApi } from "../service/api/cloudinaryUpload.service";

const uploadImageByURL = (e) => {
  console.log(e);
  let link = new Promise((resolve, reject) => {
    try {
      resolve(e);
    } catch (error) {
      reject(error);
    }
  });

  return link.then((url) => {
    return {
      success: 1,
      file: { url },
    };
  });
};

const UploadImage = () => {
  const [uploadImage] = useUploadImageMutation();

  return <></>;
};

const uploadImageByFile = async (file) => {
  const dispatch = useDispatch();

  console.log(file);
  if (!file) {
    return; // If there is no file, return early
  }

  if (file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "prakash-media");

    console.log(formData);
    try {
      const result = await dispatch(
        cloudinaryApi.endpoints.uploadImage(formData)
      );
    } catch (error) {
      console.error("Error uploading image:", error.message);
      // Handle the error as needed
    }
  }
};

export const tools = {
  embed: Embed,
  list: {
    class: List,
    inlineToolbar: true,
  },
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByUrl: uploadImageByURL,
        uploadByFile: uploadImageByFile,
      },
    },
  },
  header: {
    class: Header,
    config: {
      placeholder: "Type Heading...",
      levels: [2, 3],
      defaultValue: 2,
    },
  },
  quote: Quote,
  marker: Marker,
  inlineCode: InlineCode,
};
