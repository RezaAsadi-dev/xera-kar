import React, { useState } from "react";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import "./fileUploader.css";
import { fetchApi } from "api";
import UploadIcon from "./uploaderIcon";

const FileUploader = ({ onChange }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const url = "api/user/home/uploader";

  const handleFileChange = async (e) => {
    const file = await e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    // Set the preview URL
    setPreviewImage(URL.createObjectURL(file));

    // API call to upload the file
    await fetchApi(url, { file: file }, "post-imgUpload").then((res) => console.log(res));
  };
  const handleDeleteImage = () => {
    setPreviewImage(null);
    if (onChange) {
      onChange({ target: { files: [] } });
    }
  };

  return (
    <form className="file-upload-form">
      <label htmlFor="file" className="file-upload-label">
        <div className="file-upload-design">
        <UploadIcon /> 
          <p>Drag and drop </p>
          <p>Or</p>
          <span className="browse-button"> Choose file...</span>
        </div>
        <input id="file" type="file" accept="image/*" onChange={(e) => handleFileChange(e)} />
      </label>

      {previewImage && (
  <div className="preview-container">
    <img
      src={previewImage}
      alt="Preview"
      className="preview-image"
    />
    <button
      className="delete-button"
      onClick={handleDeleteImage}
    >
      X
    </button>
  </div>
)}

    </form>
  );
};

export default FileUploader;
