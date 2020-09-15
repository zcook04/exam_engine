import React, { useEffect } from 'react';

// import ExamCategories from '../ExamCategories/ExamCategories';
import ExamCategory from './ExamCategory/ExamCategory';

import { connect } from 'react-redux';

import {
  getQuestions,
  getExamList,
  getExamCategories,
  resetExam,
  setExam,
  updateCategories,
} from '../../../../actions/examActions';

import './SearchExams.css';

const SearchExams = (props) => {
  const {
    getQuestions,
    getExamList,
    getExamCategories,
    resetExam,
    setExam,
  } = props;
  const { examList, categories, exam, loading, questions } = props.exam;

  useEffect(() => {
    getExamList();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getExamCategories(exam);
    // eslint-disable-next-line
  }, [exam]);

  const examHandler = (e) => {
    if (e.target.value === 'Select an exam to get started') {
      resetExam();
      return;
    } else {
      resetExam();
      setExam(e.target.value);
      return;
    }
  };

  return (
    <div className="exam-search-container">
      {questions && (
        <select onChange={examHandler} name="exam-name" id="exam-name">
          <optgroup label="Exams">
            <option defaultValue>Select an exam to get started</option>
            {examList &&
              examList.map((examTitle) => {
                return (
                  <option
                    className="exam-title-options"
                    key={examTitle}
                    value={examTitle}
                  >
                    {examTitle}
                  </option>
                );
              })}
          </optgroup>
        </select>
      )}
      {exam && (
        <div className="load-exam">
          {questions.length < 1 && (
            <button id="load-questions" onClick={getQuestions}>
              Load Questions
            </button>
          )}
          <button id="reset-questions" onClick={resetExam}>
            Reset Exam
          </button>
        </div>
      )}
      <br />
      {categories !== null &&
        categories.length > 0 &&
        !loading &&
        questions.length < 1 && (
          <div className="exam-categories-flex">
            {categories.map((category) => {
              return (
                <ExamCategory
                  category={category}
                  key={category.name}
                  max={category.max}
                />
              );
            })}
          </div>
        )}
    </div>
  );
};

const mapDispatchToProps = {
  getQuestions,
  getExamList,
  getExamCategories,
  resetExam,
  setExam,
  updateCategories,
};

const mapStateToProps = (state) => ({
  exam: state.exam,
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchExams);
