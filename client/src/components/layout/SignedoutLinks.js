import React from "react";
import { NavLink } from "react-router-dom";

const SignedOutLinks = () => {
  return (
    <ul class='navbar-nav mr-auto'>
      <li className='nav-item'>
        <NavLink to='/SignUp' className='navLinks'>
          SIGN UP
        </NavLink>
      </li>

      <li className='nav-item'>
        <NavLink to='/LogIn' className='navLinks'>
          LOG IN
        </NavLink>
      </li>
    </ul>
  );
};

export default SignedOutLinks;
