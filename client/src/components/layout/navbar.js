import React, { Fragment } from "react";
// import { Dropdown } from "react-bootstrap";
import SignedInLinks from "./signedInLinks";
import SignedOutLinks from "./SignedoutLinks";
import { Link } from "react-router-dom";
import logo from "../../images/logo.PNG";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Search from "./Search";

function NavBar({ auth: { isAuthenticated, loading } }) {
  return (
    <nav>
      <div className='nav-wrapper'>
        <Link to='/' className='brand-logo'>
          <img src={logo} style={{ width: "120px" }} alt='for logo' />
        </Link>
        <ul className='right hide-on-med-and-down'>
          <li>
            <Search />
          </li>
          <li>
            {!loading && (
              <Fragment>
                {isAuthenticated ? <SignedInLinks /> : <SignedOutLinks />}
              </Fragment>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

NavBar.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(NavBar);
