import React from "react";
import { NavLink } from "react-router-dom";
import { logout } from "../../actions/auth";
import { connect } from "react-redux";
const SignedInLinks = ({ logout }) => {
  return (
    <ul className='right'>
      <li>
        <NavLink to='/dashboard' className='navLinks'>
          DASHBOARD
        </NavLink>
      </li>
      <li>
        <NavLink to='/' className='navLinks'>
          TEACHERS
        </NavLink>
      </li>
      <li>
        <NavLink to='/' className='navLinks'>
          POSTS
        </NavLink>
      </li>
      <li>
        <a onClick={logout} className='navLinks'>
          <span className='hide-sm'>LOGOUT</span>
        </a>
      </li>
      <li>
        <NavLink to='/' className='btn btn-floating pink lighten-1'>
          DP
        </NavLink>
      </li>
    </ul>
  );
};

export default connect(null, { logout })(SignedInLinks);
