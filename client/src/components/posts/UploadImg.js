import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

const UploadImg = (props) => {
  const [Image, setImage] = useState([]);

  const onDrop = (files) => {
    let formData = new FormData();

    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);
    axios.post("/api/profile/image", formData, config).then((res) => {
      if (res.data.success) {
        setImage([...Image, res.data.image]);
        props.refreshFunction([...Image, res.data.image]);
      } else {
        alert("Failed");
      }
    });
  };
  return (
    <div>
      <Dropzone onDrop={onDrop} multiple={false} maxSize={10000000000}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <i className='fas fa-camera'></i>
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default UploadImg;
