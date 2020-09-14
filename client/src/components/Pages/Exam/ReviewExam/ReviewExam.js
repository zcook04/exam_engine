import React from 'react';
import { connect } from 'react-redux';

import ReviewQuestion from './ReviewQuestion/ReviewQuestion';

import './ReviewExam.css';

const ReviewExam = (props) => {
  const { questions } = props.exam;

  const correctAnswers = questions.filter(
    (question) => question.answer === question.selectedAnswer
  );

  const grade = parseInt((correctAnswers.length / questions.length) * 100);

  return (
    <div className="review-container">
      <h2>You Scored: {grade}%</h2>
      {questions.map((question) => {
        return <ReviewQuestion key={question._id} question={question} />;
      })}
    </div>
  );
};

const mapStateToProps = (state) => ({
  exam: state.exam,
});

export default connect(mapStateToProps)(ReviewExam);
