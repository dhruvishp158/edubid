import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { getProfiles } from "../../actions/profile";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useEffect } from "react";
import Profiles from "./profiles/Profiles";
import Spinner from "./Spinner";
const Home = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return (
    <div className='forSlide'>
      <div className='jumbotron' style={{ color: "black" }}>
        <h1>Learn on your Schedule</h1>
        <p className='lead' style={{ fontWeight: "200" }}>
          Study any topic, anytime. Choose from thousands of expert-led courses
          now.{" "}
        </p>
        <p className='lead' style={{ fontWeight: "200" }}>
          The leading global marketplace for learning and instruction
        </p>

        <p>
          <Link to='/SignUp' className='btn btn-success btn-lg'>
            Get started today
          </Link>
        </p>
      </div>

      <Fragment>
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            {profiles.length > 0 ? (
              profiles.map(
                (profile) =>
                  profile.status === "Teacher" && (
                    <Profiles key={profile._id} profile={profile} />
                  )
              )
            ) : (
              <Spinner />
            )}
          </Fragment>
        )}
      </Fragment>

      <footer>
        <div className='row'>
          <p style={{ marginTop: "5rem" }}>
            <strong>Copyright © 2020 Dhruvish Patel</strong>
          </p>
        </div>
      </footer>
    </div>
  );
};

Home.propTypes = {
  getProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getProfiles })(Home);
