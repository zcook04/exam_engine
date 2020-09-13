import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logout, loadUser } from '../../actions/authActions';

import './NavLinks.css';

const NavLinks = (props) => {
  const { navOpen, setNavOpen, loadUser, logout, auth } = props;
  const { isAuthenticated, user } = props.auth;

  const wrapperClass = navOpen ? 'navlinks-wrapper' : 'navlinks-wrapper hidden';
  const containerClass = navOpen
    ? 'navlinks-container'
    : 'navlinks-container hidden';

  useEffect(() => {
    auth.token !== null && auth.token && loadUser();
    // eslint-disable-next-line
  }, [auth.token]);

  const navlinkHandler = () => {
    navOpen ? setNavOpen(false) : setNavOpen(true);
  };

  const logoutHandler = () => {
    navOpen ? setNavOpen(false) : setNavOpen(true);
    logout();
  };

  return (
    <div className={containerClass}>
      <div className={wrapperClass}>
        <h1>Hello {user ? user.name : 'Guest'}</h1>
        <ul className="navlinks-ul">
          <NavLink
            exact
            to="/"
            className="navlinks-a"
            activeClassName="active"
            onClick={navlinkHandler}
          >
            <li className="navlinks-li">Home</li>
          </NavLink>
          <NavLink to="/exam" className="navlinks-a" onClick={navlinkHandler}>
            <li className="navlinks-li">Practice An Exam</li>
          </NavLink>
          <NavLink
            to="/flashcards"
            className="navlinks-a"
            onClick={navlinkHandler}
          >
            <li className="navlinks-li">Flip Flashcards</li>
          </NavLink>
          <NavLink
            to="/contribute"
            className="navlinks-a"
            activeClassName="active"
            onClick={navlinkHandler}
          >
            <li className="navlinks-li">Contribute</li>
          </NavLink>
          <NavLink
            to="/forum"
            className="navlinks-a"
            activeClassName="active"
            onClick={navlinkHandler}
          >
            <li className="navlinks-li">Forum</li>
          </NavLink>
          {isAuthenticated ? (
            <NavLink
              to="/logout"
              className="navlinks-a"
              activeClassName="active"
              onClick={logoutHandler}
            >
              <li className="navlinks-li">Logout</li>
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className="navlinks-a"
              activeClassName="active"
              onClick={navlinkHandler}
            >
              <li className="navlinks-li">Login / Register</li>
            </NavLink>
          )}
        </ul>
      </div>
    </div>
  );
};

NavLinks.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout, loadUser })(NavLinks);
