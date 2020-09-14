import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { loadUser } from '../../../actions/authActions';

const Forum = (props) => {
  const { auth } = props;
  useEffect(() => {
    auth.token !== null && auth.token && loadUser();
    // eslint-disable-next-line
  }, [auth.token]);

  return <h1>Forum</h1>;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(Forum);
