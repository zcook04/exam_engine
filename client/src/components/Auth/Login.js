import React, { useState, useEffect } from 'react';

import './Login.css';

import PropTypes from 'prop-types';
import { login, register, clearErrors } from '../../actions/authActions';
import { connect } from 'react-redux';

const Login = (props) => {
  const { setAlert, register, login } = props;
  const { error, clearErrors, isAuthenticated } = props.auth;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'User already exists') {
      setAlert(error);
      clearErrors();
    }

    if (error === 'Invalid Credentials') {
      setAlert(error);
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const [registered, setRegistered] = useState(true);

  const { password, email, password2, name } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onRegister = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields.');
    } else if (password !== password2) {
      setAlert('Passwords do not match');
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };

  const onSignin = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Email and Password is required');
    } else {
      login({
        email,
        password,
      });
    }
  };

  const showRegistration = registered ? 'hidden' : '';
  const showLogin = registered ? '' : 'hidden';

  const registrationHandler = () => {
    registered ? setRegistered(false) : setRegistered(true);
    setUser({
      name: '',
      email: '',
      password: '',
      password2: '',
    });
  };

  return (
    <div className={'form-container'}>
      <div className={'login-form ' + showLogin}>
        <form>
          <h2>
            <span className="text-primary"> Sign-In</span>
          </h2>
          <div className="form-group">
            <input
              placeholder="Email"
              type="text"
              name="email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              required
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Login"
              onClick={onSignin}
              className="login-button"
            />
          </div>
        </form>
        <p>
          Don't have an account?{' '}
          <span className="button" onClick={registrationHandler}>
            Register now!
          </span>
        </p>
      </div>
      <div className={'register-form ' + showRegistration}>
        <form>
          <h2>
            Welcome <span className="text-primary"> {user.name}</span>
          </h2>
          <div className="form-group">
            <input
              placeholder="Name"
              type="text"
              name="name"
              value={name}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Email"
              type="email"
              name="email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Confirm Password"
              type="password"
              name="password2"
              value={password2}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Register"
              onClick={onRegister}
              className="login-button"
            />
          </div>
        </form>
        <p>
          Already have an account?{' '}
          <span className="button" onClick={registrationHandler}>
            Sign-in now!
          </span>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  login,
  register,
  clearErrors,
})(Login);
