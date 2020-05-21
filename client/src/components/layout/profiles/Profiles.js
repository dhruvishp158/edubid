import React from "react";
import PropTypes from "prop-types";
import testImage from "../../../images/6.jpg";
import { Link } from "react-router-dom";

const Profiles = ({
  profile: {
    user: { _id, name, type },
    status,
    profilePicture,
    location,
    topics,
    website,
    bio,
  },
}) => {
  return (
    <div className='row'>
      <div className='profile'>
        <div className='part1'>
          <div className='part1-1'>
            <img
              className='round-img'
              src={`${profilePicture}`}
              alt='profile'
              style={{ width: "200px", height: "200px", borderRadius: "50%" }}
            />{" "}
          </div>
          <div className='part1-1'>
            <Link className='btn btn-primary' to={`profile/${_id}`}>
              View Profile
            </Link>
          </div>
        </div>
        <div className='part2'>
          <h3 style={{ margin: "0.7rem" }}>{name}</h3>

          <h5 style={{ margin: "0.7rem" }}>{status}</h5>

          <h5 style={{ margin: "0.7rem" }}>
            <span>Montreal, Canada</span>
          </h5>
          <h6 style={{ margin: "0.7rem" }}>
            <span style={{ fontWeight: "500" }}>Can teach you :</span>
          </h6>
          <div className='part2-2'>
            <ul>
              {topics.map((topic, index) => (
                <li key={index} style={{ margin: "0.7rem" }}>
                  <i
                    className='fas fa-check'
                    style={{ marginRight: "1rem" }}
                  ></i>{" "}
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

Profiles.propTypes = {};

export default Profiles;
