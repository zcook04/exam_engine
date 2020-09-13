import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NavLinks from './NavLinks';
import Hamburger from './Hamburger';
import Overlay from './Overlay';

import { loadUser } from '../../actions/authActions';

import './Navbar.css';

const Navbar = ({ auth }) => {
  useEffect(() => {
    auth.isAuthenticated !== null && loadUser();
    // eslint-disable-next-line
  }, [auth.isAuthenticated]);

  console.log(auth.isAuthenticated);

  const [navOpen, setNavOpen] = useState(false);

  return (
    <React.Fragment>
      <NavLinks navOpen={navOpen} setNavOpen={setNavOpen} />
      <Hamburger navOpen={navOpen} setNavOpen={setNavOpen} />
      <Overlay navOpen={navOpen} setNavOpen={setNavOpen} />
    </React.Fragment>
  );
};

Navbar.propTypes = {
  loadUser: PropTypes.func,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(Navbar);
