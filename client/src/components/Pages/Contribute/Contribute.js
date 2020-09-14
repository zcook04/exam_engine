import React, { useEffect } from 'react';
import ContributeExam from './ContributeExam';

import { connect } from 'react-redux';
import { loadUser } from '../../../actions/authActions';

const Contribute = (props) => {
  const { loadUser } = props;
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="contibute-page">
      <ContributeExam />
    </div>
  );
};

export default connect(null, { loadUser })(Contribute);
