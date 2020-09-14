import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './ReviewQuestion.css';

const ReviewQuestion = ({ question }) => {
  const correct = question.answer === question.selectedAnswer;

  const [showDetailed, setShowDetailed] = useState(false);

  const handleClick = () => {
    showDetailed ? setShowDetailed(false) : setShowDetailed(true);
  };

  return (
    <div className="question-container">
      <h3
        onClick={handleClick}
        className={
          correct
            ? 'review-question reviewed-correct'
            : 'review-question reviewed-wrong'
        }
      >
        {question.question}
      </h3>
      {showDetailed && (
        <>
          {question.prompts.map((prompt) => {
            const wasCorrectAnswer = question.answer === prompt.name;
            return (
              <span
                key={prompt._id}
                className={wasCorrectAnswer ? 'correct-prompt' : 'wrong-prompt'}
              >
                <p>{prompt.text}</p>
              </span>
            );
          })}
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  exam: state.exam,
});

ReviewQuestion.propTypes = {
  question: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(ReviewQuestion);
