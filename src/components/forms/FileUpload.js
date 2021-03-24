import { Divider } from "antd";
import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";

const FileUpload = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadandResize = (e) => {
    console.log(e.target.files);

    //Resize
    let files = e.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            console.log(uri);
          },
          "base64"
        );
      }
    }

    //Send back to server to upload to Cloudinary

    //Set url to images [] in the parent componen-- ProductCreate
  };

  return (
    <div className="row">
      <label className="btn btn-primary btn-raised">
        Choose Image File
        <input
          type="file"
          multiple
          hidden
          accept="images/*"
          onChange={fileUploadandResize}
        />
      </label>
    </div>
  );
};

export default FileUpload;
