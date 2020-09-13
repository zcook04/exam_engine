import React, { useEffect } from 'react';
import ClipLoader from 'react-spinners/ClockLoader';

import SearchExam from './SearchExams';
import CurrentExam from './CurrentExam';
import ReviewExam from './ReviewExam';

import { connect } from 'react-redux';

import { loadUser } from '../../actions/authActions';

import './Exam.css';

const Exam = (props) => {
  const { auth } = props;

  const { inReview, currentQuestion, loading } = props.exam;

  useEffect(() => {
    auth.token !== null && auth.token && loadUser();
    // eslint-disable-next-line
  }, [auth.token]);

  return (
    <div className="exam-container">
      <SearchExam />
      {loading && (
        <ClipLoader loading={loading} size={200} css={{ margin: 'auto' }} />
      )}
      {currentQuestion !== null && !inReview && !loading && <CurrentExam />}
      {currentQuestion !== null && inReview && !loading && <ReviewExam />}
    </div>
  );
};

const mapDispatchToProps = {
  loadUser,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  exam: state.exam,
});

export default connect(mapStateToProps, mapDispatchToProps)(Exam);
