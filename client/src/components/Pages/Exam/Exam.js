import React, { useEffect } from 'react';
import ClipLoader from 'react-spinners/ClockLoader';

import SearchExam from './SearchExams/SearchExams';
import CurrentExam from './CurrentExam/CurrentExam';
import ReviewExam from './ReviewExam/ReviewExam';

import { connect } from 'react-redux';

import { loadUser } from '../../../actions/authActions';

import './Exam.css';

const Exam = (props) => {
  const { auth } = props;

  const { inReview, questions, loading } = props.exam;

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
      {questions.length > 0 && !inReview && !loading && <CurrentExam />}
      {questions.length > 0 && inReview && !loading && <ReviewExam />}
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
