import React from 'react';
import { connect } from 'react-redux';

import { setSelectedAnswer } from '../../../../actions/examActions';

import './ExamPrompts.css';

const ExamPrompts = (props) => {
  const { text, name, setSelectedAnswer } = props;

  const changeHandler = (e) => {
    setSelectedAnswer(e.target.value);
  };

  return (
    <div className="prompt-container">
      <input
        value={name}
        name="prompts"
        onChange={changeHandler}
        type="radio"
      />
      <p>{text}</p>
    </div>
  );
};

const mapDispatchToProps = {
  setSelectedAnswer,
};

const mapStateToProps = (state) => ({
  exam: state.exam,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExamPrompts);
