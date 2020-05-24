import React from "react";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profile";
import { connect } from "react-redux";
import { useEffect } from "react";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import Profile from "../profile/Profile";
const Dashboard = ({
  getCurrentProfile,
  profile: { profile, loading },
  auth: { user },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return (
    <div className='dash-buttons'>
      {!loading && profile === null ? (
        <div>
          <p>You do not have profile</p>
          <Link
            to='/create-profile'
            className='btn btn-light'
            style={{ borderRadius: "1rem", margin: "1rem", width: "232px" }}
          >
            CREATE PROFILE
          </Link>
          <Link to='/add-experience' className='btn btn-light'>
            <i className='fab fa-black-tie text-primary'></i> Add Experience
          </Link>
          <Link to='/add-education' className='btn btn-light'>
            <i className='fas fa-graduation-cap text-primary'></i> Add Education
          </Link>
        </div>
      ) : (
        <div>
          {" "}
          <div className='dash-buttons'>
            <Link to='/edit-profile' className='btn btn-light'>
              <i className='fas fa-user-circle text-primary'></i> Edit Profile
            </Link>
            <Link to='/add-experience' className='btn btn-light'>
              <i className='fab fa-black-tie text-primary'></i> Add Experience
            </Link>
            <Link to='/add-education' className='btn btn-light'>
              <i className='fas fa-graduation-cap text-primary'></i> Add
              Education
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

Dashboard.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
