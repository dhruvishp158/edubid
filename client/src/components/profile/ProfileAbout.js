import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
  profile: {
    bio,
    topics,
    user: { name },
  },
}) => {
  console.log(name);
  return (
    <div className='profileAbout'>
      <h2 style={{ textAlign: "center", color: "white", padding: "1rem" }}>
        {name.trim().split(" ")[0]} Bio
      </h2>
      <div className='profileAbout-1'>
        {bio && (
          <Fragment>
            <p style={{ padding: "1rem" }}>{bio}</p>
            <div className='line'></div>
          </Fragment>
        )}
      </div>

      <h2 style={{ textAlign: "center", color: "white", padding: "1rem" }}>
        Topics Set
      </h2>
      <div className='profileAbout-2'>
        <div className='topics'>
          {topics.map((topic, index) => (
            <div key={index} className='p-1'>
              <i className='fas fa-check'></i>
              {topic}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
