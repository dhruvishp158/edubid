import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import uploadImage from "../../images/upload.png";

const CreateProfile = (props) => {
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
            <div className='profile-picture'>
              <img src={uploadImage} alt='for uploads' />
              <p></p> Upload Profile Picture{" "}
            </div>
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default CreateProfile;
