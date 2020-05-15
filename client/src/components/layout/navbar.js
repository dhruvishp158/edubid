import React from "react";
import { Dropdown } from "react-bootstrap";
import SignedInLinks from "./signedInLinks";
import SignedOutLinks from "./SignedoutLinks";
import { Link } from "react-router-dom";
function NavBar() {
  return (
    <nav>
      <div className='nav-wrapper'>
        <a href='/' className='brand-logo'>
          EduBid
        </a>
        <ul className='right hide-on-med-and-down'>
          <SignedInLinks />
          <li>
            <Dropdown>
              <Dropdown.Toggle variant='success' id='dropdown-basic'>
                <Link to='/SignUp'>Sign Up</Link>
              </Dropdown.Toggle>
            </Dropdown>
          </li>

          <SignedOutLinks />
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
