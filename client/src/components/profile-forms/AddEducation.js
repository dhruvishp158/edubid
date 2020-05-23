import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { addEducation } from "../../actions/profile";
const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addEducation(formData, history);
  };
  return (
    <div className='updateProfile'>
      <h1 className='large'>ADD EDUCATION</h1>

      <div className='forform' style={{ padding: "2rem" }}>
        <form
          className='form'
          onSubmit={(e) => onSubmit(e)}
          style={{ margin: "0 auto" }}
        >
          <div className='form-group'>
            <label htmlFor='address' style={{ fontSize: "1.4rem" }}>
              School or University
            </label>
            <input
              type='text'
              placeholder='* School or University'
              name='school'
              required
              value={school}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='address' style={{ fontSize: "1.4rem" }}>
              Degree
            </label>
            <input
              type='text'
              placeholder='* Degree or Certificate'
              name='degree'
              required
              value={degree}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='address' style={{ fontSize: "1.4rem" }}>
              Field of study
            </label>
            <input
              type='text'
              placeholder='Field of study'
              name='fieldofstudy'
              value={fieldofstudy}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='address' style={{ fontSize: "1.4rem" }}>
              From Date
            </label>
            <input
              type='date'
              name='from'
              value={from}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className='form-group'>
            <p style={{ fontSize: "1.4rem", color: "black" }}>
              <input
                type='checkbox'
                name='current'
                checked={current}
                value={current}
                onChange={(e) => {
                  setFormData({ ...formData, current: !current });
                  toggleDisabled(!toDateDisabled);
                }}
              />{" "}
              Current
            </p>
          </div>

          <div className='form-group'>
            <label htmlFor='address' style={{ fontSize: "1.4rem" }}>
              To Date
            </label>
            <input
              type='date'
              name='to'
              value={to}
              onChange={(e) => onChange(e)}
              disabled={toDateDisabled ? "disabled" : ""}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='address' style={{ fontSize: "1.4rem" }}>
              Description
            </label>
            <input
              type='text'
              name='description'
              value={description}
              placeholder='Program description'
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='my-2'>
            <button
              className='btn btn-light'
              style={{ borderRadius: "1rem", margin: "1rem", width: "232px" }}
              onSubmit={(e) => onSubmit(e)}
            >
              ADD EDUCATION
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(withRouter(AddEducation));
