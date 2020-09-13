import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NavLinks from './NavLinks';
import Hamburger from './Hamburger';
import Overlay from './Overlay';

import { loadUser } from '../../actions/authActions';

import './Navbar.css';

const Navbar = ({ auth, loadUser }) => {
  useEffect(() => {
    auth.token !== null && auth.token && loadUser();
    // eslint-disable-next-line
  }, [auth.token]);

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
