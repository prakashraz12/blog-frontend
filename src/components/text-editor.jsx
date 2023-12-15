import React, { useRef, useState, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { formats } from "../config/quil";
import { useUploadImageMutation } from "../service/api/cloudinaryUpload.service";
import toast from "react-hot-toast";
import { cloudinaryErrorMessage } from "./form/form.config";

const QuillEditor = ({ blogForm }) => {
  const [imageUpload] = useUploadImageMutation();
  const quillRef = useRef();

  const handleEditorChange = (content, _, __, editor) => {
    blogForm.setFieldValue("content", content);
  };

  const imageHandler = (e) => {
    const editor = quillRef.current.getEditor();
    console.log(editor);
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];

      if (/^image\//.test(file.type)) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "prakash-media");

        const res = await imageUpload(formData);
        if (res.error) {
          toast.error(cloudinaryErrorMessage);
        }
        if (res.data) {
          const url = res.data.secure_url;
          editor.insertEmbed(editor.getSelection(), "image", url);
        }
      } else {
        toast.error("You could only upload images.");
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["image", "link"],
          [
            {
              color: [
                "#000000",
                "#e60000",
                "#ff9900",
                "#ffff00",
                "#008a00",
                "#0066cc",
                "#9933ff",
                "#ffffff",
                "#facccc",
                "#ffebcc",
                "#ffffcc",
                "#cce8cc",
                "#cce0f5",
                "#ebd6ff",
                "#bbbbbb",
                "#f06666",
                "#ffc266",
                "#ffff66",
                "#66b966",
                "#66a3e0",
                "#c285ff",
                "#888888",
                "#a10000",
                "#b26b00",
                "#b2b200",
                "#006100",
                "#0047b2",
                "#6b24b2",
                "#444444",
                "#5c0000",
                "#663d00",
                "#666600",
                "#003700",
                "#002966",
                "#3d1466",
              ],
            },
          ],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  console.log(blogForm.values)
  return (
    <div>
      <ReactQuill
        theme="snow"
        value={blogForm.values.content}
        formats={formats}
        modules={modules}
        ref={quillRef}
        onChange={handleEditorChange}
        style={{ height: "auto" }}
      />
    </div>
  );
};

export default QuillEditor;
