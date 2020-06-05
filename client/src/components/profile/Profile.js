import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile";
import { Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
const Profile = ({
  getProfileById,
  match,
  profile: { profile, loading },
  auth,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  let toId = match.params.id;
  return (
    <Fragment>
      {profile === null || loading ? (
        // <Spinner />
        <h1>You do not have any profile</h1>
      ) : (
        <Fragment>
          <Link to='/' className='btn btn-light' style={{ margin: "1rem" }}>
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id !== toId && (
              <Link to={`message/${toId}`} className='btn btn-dark'>
                Message
              </Link>
            )}
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className='profile-exp'>
              <h2
                style={{
                  textAlign: "center",
                  color: "white",
                  padding: "2rem",
                  background: "black",
                  width: "fit-content",
                  margin: "1rem auto",
                  borderRadius: "2rem",
                }}
              >
                Experience
              </h2>
              <div className='profile-exp-grid'>
                {profile.experience.length > 0 ? (
                  <Fragment>
                    {profile.experience.map((experience) => (
                      <ProfileExperience
                        key={experience._id}
                        experience={experience}
                        profile={profile}
                      />
                    ))}
                  </Fragment>
                ) : (
                  <h4 style={{ color: "white" }}>No experience credentials</h4>
                )}
              </div>
            </div>
            <div className='profile-exp'>
              <h2
                style={{
                  textAlign: "center",
                  color: "white",
                  padding: "2rem",
                  background: "black",
                  width: "fit-content",
                  margin: "1rem auto",
                  borderRadius: "2rem",
                }}
              >
                Education
              </h2>
              <div className='profile-exp-grid'>
                {profile.education.length > 0 ? (
                  <Fragment>
                    {profile.education.map((education) => (
                      <ProfileEducation
                        key={education._id}
                        education={education}
                        profile={profile}
                        auth={auth}
                      />
                    ))}
                  </Fragment>
                ) : (
                  <h4 style={{ color: "white" }}>No education credentials</h4>
                )}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, { getProfileById })(Profile);
