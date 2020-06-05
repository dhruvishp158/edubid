import React, { useState } from "react";
import PropTypes from "prop-types";
import { addExperience } from "../../actions/profile";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { company, title, from, to, current, description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addExperience(formData, history);
  };
  return (
    <div className='updateProfile'>
      <h1 className='large'>ADD EXPERIENCE</h1>

      <div className='forform' style={{ padding: "2rem" }}>
        <form
          className='form'
          onSubmit={(e) => onSubmit(e)}
          style={{ margin: "0 auto" }}
        >
          <div className='form-group'>
            <label htmlFor='address' style={{ fontSize: "1.4rem" }}>
              Job Title
            </label>
            <input
              type='text'
              placeholder='* Job Title'
              name='title'
              required
              value={title}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='address' style={{ fontSize: "1.4rem" }}>
              Company / School
            </label>
            <input
              type='text'
              placeholder='* Company'
              name='company'
              required
              value={company}
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
              placeholder='add description'
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='my-2'>
            <button
              className='btn btn-light'
              style={{ borderRadius: "1rem", margin: "1rem", width: "232px" }}
              onSubmit={(e) => onSubmit(e)}
            >
              ADD EXPERIENCE
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

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(withRouter(AddExperience));
