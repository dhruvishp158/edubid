import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profile";
import { connect } from "react-redux";
const ProfileExperience = ({
  auth,
  profile,
  deleteExperience,
  experience: { company, title, to, from, description, _id },
}) => {
  return (
    <div className='profileExperience'>
      <h3 className='dark'>{company}</h3>
      <p>
        <Moment format='YYYY/MM/DD'>{from}</Moment>
        {" - "}
        {!to ? "Now" : <Moment format='YYYY/MM/DD'>{to}</Moment>}{" "}
      </p>

      <p>
        <strong>Position: </strong>
        {title}
      </p>
      <p>
        <strong>Description: </strong>
        {description}
      </p>
      {auth.isAuthenticated &&
        auth.loading === false &&
        auth.user._id === profile.user._id && (
          <button
            className='btn btn-danger'
            onClick={() => deleteExperience(_id)}
            style={{
              background: "red",
              borderRadius: "2rem",
            }}
          >
            DELETE EXPERIENCE
          </button>
        )}
    </div>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
  deleteExperience: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { deleteExperience })(
  ProfileExperience
);
