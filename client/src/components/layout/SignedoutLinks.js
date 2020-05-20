import React from "react";
import { NavLink } from "react-router-dom";

const SignedOutLinks = () => {
  return (
    <ul className='right'>
      <li>
        <NavLink to='/SignUp' className='navLinks'>
          SIGN UP
        </NavLink>
      </li>
      <li>
        <NavLink to='/LogIn' className='navLinks'>
          LOG IN
        </NavLink>
      </li>
      <li>
        <NavLink to='/' className='navLinks'>
          LOG OUT
        </NavLink>
      </li>
    </ul>
  );
};

export default SignedOutLinks;
