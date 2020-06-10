import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
function SearchItem(data) {
  return (
    <div>
      <a className='searchA' href={`profile/${data.data.user._id}`}>
        <div>
          <img
            // src={`http://localhost:3000/${data.data.profilePicture}`}
            src={`\\${data.data.profilePicture}`}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              margin: "10px",
            }}
          />
          <span>{data.data.user.name}</span>
        </div>
      </a>
    </div>
  );
}

SearchItem.propTypes = {};

export default SearchItem;
