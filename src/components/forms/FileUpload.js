import { Divider } from "antd";
import React from "react";

const FileUpload = () => {
  const fileUploadandResize = (e) => {
    console.log(e.target.files)

//Resize

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
