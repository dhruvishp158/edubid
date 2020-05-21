import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { createProfile, getCurrentProfile } from "../../actions/profile";
import PropTypes from "prop-types";
import CreateProfile from "./CreateProfile";
import { useEffect } from "react";

const UpdateProfile = ({
  createProfile,
  history,
  getCurrentProfile,
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();

    setFormData({
      website: loading || !profile.website ? "" : profile.website,
      address:
        loading || !profile.location ? "" : profile.location.formattedAddress,
      status: loading || !profile.status ? "" : profile.status,
      topics: loading || !profile.topics ? "" : profile.topics.join(","),

      bio: loading || !profile.bio ? "" : profile.bio,
      twitter: loading || !profile.social ? "" : profile.social.twitter,
      facebook: loading || !profile.social ? "" : profile.social.facebook,
      linkdin: loading || !profile.social ? "" : profile.social.linkdin,
      youtube: loading || !profile.social ? "" : profile.social.youtube,
      instagram: loading || !profile.social ? "" : profile.social.instagram,
    });
  }, [loading, getCurrentProfile]);

  const [formData, setFormData] = useState({
    website: "",
    address: "",
    status: "Teacher",
    topics: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkdin: "",
    youtube: "",
    instagram: "",
  });
  const [profilePicture, setImages] = useState([
    loading || !profile.profilePicture ? "" : profile.profilePicture,
  ]);
  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const {
    website,
    address,
    topics,
    bio,
    twitter,
    facebook,
    linkdin,
    youtube,
    instagram,
  } = formData;
  const data = { ...formData, profilePicture };
  const updateImages = (newImages) => {
    setImages(newImages);
  };
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    createProfile(data, history, true);
  };
  return (
    <div className='updateProfile'>
      <h1 className='large'>UPDATE PROFILE</h1>

      <div className='forform' style={{ padding: "2rem" }}>
        <form
          className='form'
          onSubmit={(e) => onSubmit(e)}
          style={{ margin: "0 auto" }}
        >
          <div className='form-group'>
            <CreateProfile refreshFunction={updateImages} />
          </div>
          <div className='form-group'>
            <label htmlFor='address' style={{ fontSize: "1.4rem" }}>
              Address
            </label>
            <input
              type='text'
              placeholder='address'
              name='address'
              value={address}
              onChange={(e) => onChange(e)}
              style={{ border: "1px solid black", padding: "10px" }}
            />
            <small className='form-text'>Could be yours or you work for</small>
          </div>
          <div className='form-group'>
            <label htmlFor='address' style={{ fontSize: "1.4rem" }}>
              Website
            </label>
            <input
              type='text'
              placeholder='Website'
              name='website'
              value={website}
              onChange={(e) => onChange(e)}
            />
            <small className='form-text'>
              Could be your own or a website you work for
            </small>
          </div>
          {/* <div className='form-group'></div> */}
          <div className='form-group'>
            <label htmlFor='address' style={{ fontSize: "1.4rem" }}>
              Topics
            </label>
            <input
              type='text'
              placeholder='* Topics'
              name='topics'
              value={topics}
              onChange={(e) => onChange(e)}
            />
            <small className='form-text'>
              Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
            </small>
          </div>

          <div className='form-group'>
            <label htmlFor='address' style={{ fontSize: "1.4rem" }}>
              Bio
            </label>
            <input
              type='text'
              placeholder='A short bio of yourself'
              name='bio'
              value={bio}
              onChange={(e) => onChange(e)}
            ></input>
            <small className='form-text'>Tell us a little about yourself</small>
          </div>

          <div className='my-2'>
            <button
              type='button'
              onClick={() => toggleSocialInputs(!displaySocialInputs)}
              className='btn btn-light'
              style={{ borderRadius: "1rem", margin: "1rem" }}
            >
              Add Social Network Links
            </button>
          </div>

          {displaySocialInputs && (
            <Fragment>
              {" "}
              <div className='form-group social-input'>
                <i className='fab fa-twitter fa-2x'></i>
                <input
                  type='text'
                  placeholder='Twitter URL'
                  name='twitter'
                  value={twitter}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className='form-group social-input'>
                <i className='fab fa-facebook fa-2x'></i>
                <input
                  type='text'
                  placeholder='Facebook URL'
                  name='facebook'
                  value={facebook}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className='form-group social-input'>
                <i className='fab fa-youtube fa-2x'></i>
                <input
                  type='text'
                  placeholder='YouTube URL'
                  name='youtube'
                  value={youtube}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className='form-group social-input'>
                <i className='fab fa-linkedin fa-2x'></i>
                <input
                  type='text'
                  placeholder='Linkedin URL'
                  name='linkdin'
                  value={linkdin}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className='form-group social-input'>
                <i className='fab fa-instagram fa-2x'></i>
                <input
                  type='text'
                  placeholder='Instagram URL'
                  name='instagram'
                  value={instagram}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </Fragment>
          )}

          <div className='my-2'>
            <button
              className='btn btn-light'
              style={{ borderRadius: "1rem", margin: "1rem", width: "232px" }}
              onSubmit={(e) => onSubmit(e)}
            >
              UPDATE PROFILE
            </button>
          </div>
          <Link
            className='btn btn-light my-1'
            to='/dashboard'
            style={{ borderRadius: "1rem", margin: "1rem", width: "232px" }}
          >
            Go Back
          </Link>
        </form>
      </div>
    </div>
  );
};

UpdateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(UpdateProfile)
);
