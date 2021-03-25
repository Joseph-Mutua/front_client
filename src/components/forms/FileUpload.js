import { Divider } from "antd";
import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar } from "antd";

const FileUpload = ({ values, setValues, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadandResize = (e) => {
    console.log(e.target.files);

    //Resize
    let files = e.target.files;

    let allUploadedFiles = values.images;

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

            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                { image: uri },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                  },
                }
              )
              .then((res) => {
                console.log("IMAGE UPLOAD RESPONSE DATA", res);
                setLoading(false);
                allUploadedFiles.push(res.data);

                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log("CLOUDINARY UPLOAD ERROR", err);
              });
          },
          "base64"
        );
      }
    }

    //Send back to server to upload to Cloudinary

    //Set url to images [] in the parent componen-- ProductCreate
  };

  return (
    <>
      <div className="row">
        {values.images &&
          values.images.map((image) => (
            <Avatar key={image.public_id} src={image.url} size={100} className="m-3"/>
          ))}
      </div>

        <br/>

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
    </>
  );
};

export default FileUpload;
