import React from "react";
// import { Dropdown } from "react-bootstrap";
import SignedInLinks from "./signedInLinks";
import SignedOutLinks from "./SignedoutLinks";
import { Link } from "react-router-dom";
import logo from "../../images/logo.PNG";
function NavBar() {
  return (
    <nav>
      <div className='nav-wrapper'>
        <Link to='/' className='brand-logo'>
          <img src={logo} style={{ width: "120px" }} alt='for logo' />
        </Link>
        <ul className='right hide-on-med-and-down'>
          <li>
            <SignedOutLinks />
          </li>
          <li>
            <SignedInLinks />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;

// <nav className='navbar navbar-expand-lg navbar-light bg-light'>
//   <button
//     className='navbar-toggler'
//     type='button'
//     data-toggle='collapse'
//     data-target='#navbarTogglerDemo01'
//     aria-controls='navbarTogglerDemo01'
//     aria-expanded='false'
//     aria-label='Toggle navigation'
//   >
//     <span className='navbar-toggler-icon'></span>
//   </button>
//   <div className='collapse navbar-collapse' id='navbarTogglerDemo01'>
//     <Link className='navbar-brand' to='/'>
//       <img src={Logo} style={{ width: "110px" }} />
//     </Link>
//     <ul className='navbar-nav mr-auto mt-2 mt-lg-0'>
//       <li className='nav-item '>
//         {/* <Link className='nav-link' to='/'>
//           Log in
//         </Link> */}
//         <SignedOutLinks />
//       </li>
//       <li className='nav-item '>
//         {/* <Link className='nav-link' to='/'>
//           Sign up
//         </Link> */}
//         <SignedInLinks />
//       </li>
//       {/* <li className='nav-item'>
//         <Link className='nav-link' to='/SignOut'>
//           Sign out
//         </Link>
//       </li>
//       <li className='nav-item'>
//         <Link className='nav-link' to='#'>
//           Teachers
//         </Link>
//       </li> */}
//     </ul>
//     <form
//       className='form-inline my-2 my-lg-0'
//       style={{
//         flexFlow: "nowrap",
//       }}
//     >
//       <input
//         className='form-control mr-sm-2'
//         type='search'
//         placeholder='Search'
//         aria-label='Search'
//       />
//       <button
//         className='btn btn-outline-success my-2 my-sm-0'
//         type='submit'
//         style={{ width: "300px" }}
//       >
//         Search courses
//       </button>
//     </form>
//   </div>
// </nav>
