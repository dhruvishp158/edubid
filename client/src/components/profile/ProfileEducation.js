import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profile";
import { connect } from "react-redux";

const ProfieEducation = ({
  deleteEducation,
  profile,
  auth,
  education: { school, degree, fieldofstudy, to, from, description, _id },
}) => {
  console.log(_id);
  return (
    <div className='profileEducation'>
      <h3 className='dark'>{school}</h3>
      <p>
        <Moment format='YYYY/MM/DD'>{from}</Moment>
        {" - "}
        {!to ? "Now" : <Moment format='YYYY/MM/DD'>{to}</Moment>}{" "}
      </p>
      <p>
        <strong>Degree: </strong>
        {degree}
      </p>
      <p>
        <strong>Field of study: </strong>
        {fieldofstudy}
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
            onClick={() => deleteEducation(_id)}
            style={{
              background: "red",
              borderRadius: "2rem",
            }}
          >
            DELETE EDUCATION
          </button>
        )}
    </div>
  );
};

ProfieEducation.propTypes = {
  education: PropTypes.object.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(ProfieEducation);
