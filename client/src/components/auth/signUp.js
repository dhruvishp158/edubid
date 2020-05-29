import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";
function SignUp({ setAlert, register, isAuthenticated }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    type: "",
  });

  const { email, password, password2, name, type } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    console.log(type);
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      console.log(formData);
      register({ name, email, password, type });
    }
  };

  if (isAuthenticated) {
    if (type === "Student") {
      return <Redirect to='/' />;
    }
    return <Redirect to='/LogIn' />;
  }
  return (
    <div className='forGrid'>
      <div className='ab' id='slide-in-right'>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "500" }}>SIGN UP</h1>
        <form
          className='loginForm'
          style={{ padding: "2rem" }}
          onSubmit={(e) => onSubmit(e)}
        >
          <input
            type='text'
            name='name'
            id='name'
            placeholder='Enter your name'
            onChange={(e) => onChange(e)}
          />

          <input
            type='email'
            name='email'
            id='email'
            placeholder='Enter your Email'
            onChange={(e) => onChange(e)}
          />

          <input
            type='password'
            name='password'
            id='password'
            placeholder='Enter your Password'
            onChange={(e) => onChange(e)}
          />
          <input
            type='password'
            name='password2'
            id='password2'
            placeholder='Confirm password'
            onChange={(e) => onChange(e)}
          />
          <div
            style={{
              textAlign: "left",
              fontWeight: "500",
              color: "black",
              padding: "1rem",
            }}
          >
            <button
              className='btn btn-outline-secondary dropdown-toggle'
              type='button'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              {type === "" ? "Select Your Type" : type}
            </button>
            <div className='dropdown-menu'>
              <a
                className='dropdown-item'
                href='#'
                onClick={() => setFormData({ ...formData, type: "Teacher" })}
              >
                Teacher
              </a>
              <a
                className='dropdown-item'
                href='#'
                name='type'
                onClick={() => setFormData({ ...formData, type: "Student" })}
              >
                Student
              </a>
            </div>
          </div>

          <input
            type='submit'
            className='navLinks'
            value='SIGN UP'
            style={{ fontWeight: "500", fontSize: "1.4rem" }}
          />
          <p style={{ fontSize: "1.4rem" }}>
            Already user?{" "}
            <Link to='/LogIn' style={{ color: "green", fontWeight: "500" }}>
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

SignUp.prototype = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { register, setAlert })(SignUp);
