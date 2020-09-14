import React from 'react';

import ExamPrompts from '../ExamPrompts/ExamPrompts';

import { connect } from 'react-redux';

import {
  startReview,
  nextQuestion,
  prevQuestion,
} from '../../../../actions/examActions';

const CurrentExam = (props) => {
  const { startReview, prevQuestion, nextQuestion } = props;

  const { questions, index, currentQuestion, inReview } = props.exam;

  const bottomBarClass =
    questions.length > 0 ? 'exam-bottom-bar' : 'exam-bottom-bar hidden';

  const nextHandler = () => {
    nextQuestion();
    document.getElementById('exam-form').reset();
  };

  const prevHandler = () => {
    prevQuestion();
    document.getElementById('exam-form').reset();
  };

  return (
    <form id="exam-form" className={!questions || inReview ? 'hidden' : ''}>
      <h3>{currentQuestion && currentQuestion.question}</h3>
      {currentQuestion &&
        currentQuestion.prompts.map((prompt) => {
          return (
            <ExamPrompts
              key={prompt._id}
              name={prompt.name}
              text={prompt.text}
            />
          );
        })}

      <div id="exam-bottom-bar" className={bottomBarClass}>
        <span className="exam-nav" onClick={prevHandler}>
          Previous Question
        </span>
        {
          //SHOW SUBMIT BUTTON AT END OF TEST
          questions && index === questions.length - 1 ? (
            <span className="exam-nav" onClick={startReview}>
              Submit and Review
            </span>
          ) : (
            <span className="exam-nav" onClick={nextHandler}>
              Next Question
            </span>
          )
        }
      </div>
    </form>
  );
};

const mapDispatchToProps = {
  startReview,
  nextQuestion,
  prevQuestion,
};

const mapStateToProps = (state) => ({
  exam: state.exam,
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentExam);
