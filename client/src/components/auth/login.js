import React from "react";
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
function LogIn({ isAuthenticated, login }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  function handleSubmit(e) {
    e.preventDefault();
    login(email, password);
  }
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <div className='forGrid'>
      <div className='forLogIn'>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "500" }}>LOG IN</h1>

        <form
          className='loginForm'
          style={{ padding: "2rem" }}
          onSubmit={handleSubmit}
        >
          <input
            type='email'
            name='email'
            id='email'
            placeholder='Enter your Email'
            onChange={(e) => {
              onChange(e);
            }}
          />
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Enter your Password'
            onChange={(e) => {
              onChange(e);
            }}
          />
          <input
            type='submit'
            value='LOG IN'
            className='navLinks'
            style={{ fontWeight: "500", fontSize: "1.4rem" }}
          />
          <p style={{ fontSize: "1.4rem" }}>
            First time visit?{" "}
            <Link to='/SignUp' style={{ color: "green", fontWeight: "500" }}>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

LogIn.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(LogIn);
