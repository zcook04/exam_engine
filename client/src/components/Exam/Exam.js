import React, { useContext, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClockLoader';

import SearchExam from './SearchExams';
import CurrentExam from './CurrentExam';
import ReviewExam from './ReviewExam';

import ExamContext from '../../context/exam/examContext';
import { connect } from 'react-redux';

import { loadUser } from '../../actions/authActions';

import './Exam.css';

const Exam = (props) => {
  const examContext = useContext(ExamContext);
  const { auth } = props;

  const { inReview, currentQuestion, loading } = examContext;

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

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(Exam);
