import React from 'react';
import { connect } from 'react-redux';

import { updateAnswers } from '../../actions/examActions';

import './ExamPrompt.css';

const ExamPrompts = (props) => {
  const { updateAnswers } = props;
  const { answers, currentQuestion } = props.exam;

  const { text, isAnswer } = props;

  const changeHandler = (e) => {
    console.log(e.target.name);
    if (e.target.value && isAnswer) {
      const currentAnswers = { ...answers };
      currentAnswers[e.target.value] = true;
      updateAnswers({ ...currentAnswers });
    }
    if (e.target.value && !isAnswer) {
      const currentAnswers = { ...answers };
      currentAnswers[e.target.value] = false;
      updateAnswers({ ...currentAnswers });
    }
  };

  return (
    <div className="prompt-container">
      <input
        value={currentQuestion._id}
        name={currentQuestion}
        onChange={changeHandler}
        type="radio"
      />
      <p>{text}</p>
    </div>
  );
};

const mapDispatchToProps = {
  updateAnswers,
};

const mapStateToProps = (state) => ({
  exam: state.exam,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExamPrompts);
