import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import Spinner from "../layout/Spinner";
import { getProfileById } from "../../../actions/profile";
import { Link } from "react-router-dom";
import ProfileTop from "../../profile/ProfileTop";
import ProfileAbout from "../../profile/ProfileAbout";
import ProfileExperience from "../../profile/ProfileExperience";
import ProfileEducation from "../../profile/ProfileEducation";
const ProfileForDashBoard = ({
  thisProfile,
  getProfileById,
  profile: { profile, loading },
  auth,
}) => {
  useEffect(() => {
    getProfileById(thisProfile.user._id);
  }, [getProfileById, thisProfile.user._id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        // <Spinner />
        <h1>You do not have any profile</h1>
      ) : (
        <Fragment>
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

ProfileForDashBoard.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, { getProfileById })(
  ProfileForDashBoard
);
