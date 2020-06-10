import React, { Fragment } from "react";
import SignedInLinks from "./signedInLinks";
import SignedOutLinks from "./SignedoutLinks";
import { Link } from "react-router-dom";
import logo from "../../images/logo.PNG";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Search from "./search/Search";

function NavBar({ auth: { isAuthenticated, loading } }) {
  return (
    <nav
      class='navbar navbar-expand-lg '
      style={{ height: "auto", background: "black", marginBottom: "1rem" }}
    >
      <Link to='/' className='navbar-brand'>
        <img src={logo} style={{ width: "120px" }} alt='for logo' />
      </Link>

      <button
        class='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarSupportedContent'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span class='navbar-toggler-icon'></span>
      </button>

      <div
        class='collapse navbar-collapse'
        id='navbarSupportedContent'
        style={{ paddingLeft: "1rem" }}
      >
        <ul class='navbar-nav mr-auto'>
          {!loading && (
            <Fragment>
              {isAuthenticated ? <SignedInLinks /> : <SignedOutLinks />}
            </Fragment>
          )}
        </ul>
        <Search />
      </div>
    </nav>
    // <nav>
    //   <div className='nav-wrapper'>
    //     <Link to='/' className='brand-logo'>
    //       <img src={logo} style={{ width: "120px" }} alt='for logo' />
    //     </Link>
    //     <ul className='right hide-on-med-and-down'>
    //       <li>
    //         <Search />
    //       </li>
    //       <li>
    //         {!loading && (
    //           <Fragment>
    //             {isAuthenticated ? <SignedInLinks /> : <SignedOutLinks />}
    //           </Fragment>
    //         )}
    //       </li>
    //     </ul>
    //   </div>
    // </nav>
  );
}

NavBar.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(NavBar);
