import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileTop = ({
  profile: {
    status,
    location,
    website,
    social,
    profilePicture,
    user: { name },
  },
}) => {
  let a = [];
  a = location.formattedAddress.trim().split(",");
  console.log(a);
  return (
    <div className='profile-top'>
      <div className='forTop'></div>
      <div className='for-profile-img'>
        <img
          className='round-img my-1'
          src={`http://localhost:3000/${profilePicture}`}
          alt=''
        />
      </div>
      <div className='top-body'>
        <h1 className='large' style={{}}>
          {name}
        </h1>
        <p style={{ fontSize: "1.6rem", color: "black" }}>{status}</p>

        <p>
          {location.formattedAddress && (
            <span>
              {a[a.length - 3]}, {a[a.length - 1]}
            </span>
          )}
        </p>
        <div className='icons my-1' style={{ margin: "2rem" }}>
          {website && (
            <a href={website} target='_blank' rel='noopener noreferrer'>
              <i className='fas fa-globe fa-2x'></i>
            </a>
          )}
          {social && social.twitter && (
            <a href={website} target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-twitter fa-2x'></i>
            </a>
          )}
          {social && social.facebook && (
            <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-facebook fa-2x'></i>
            </a>
          )}
          {social && social.linkdin && (
            <a href={social.linkdin} target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-linkedin fa-2x'></i>
            </a>
          )}
          {social && social.youtube && (
            <a href={social.youtube} target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-youtube fa-2x'></i>
            </a>
          )}
          {social && social.instagram && (
            <a
              href={social.instagram}
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className='fab fa-instagram fa-2x'></i>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
