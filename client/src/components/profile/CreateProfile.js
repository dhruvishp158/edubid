import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
const CreateProfile = (props) => {
  const [Image, setImage] = useState([]);

  const onDrop = (files) => {
    let formData = new FormData();

    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);
    axios.post("/api/profile/image", formData, config).then((res) => {
      console.log(res.data);

      if (res.data) {
        setImage([...Image, res.data.image]);
      } else {
        alert("Failed");
      }
    });
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div>
        <Dropzone onDrop={onDrop} multiple={false} maxSize={10000000000}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <button className='btn'>Upload image </button>
            </div>
          )}
          {/* <div onClick>
          <img />
        </div> */}
        </Dropzone>
      </div>
      <button type='submit' className='btn' value='submit'>
        Submit
      </button>
    </form>
  );
};

export default CreateProfile;
