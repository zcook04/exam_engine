import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import './ContributeExam.css';

import { connect } from 'react-redux';

import { loadUser } from '../../actions/authActions';
import { setAlert } from '../../actions/alertActions';

import ExamContext from '../../context/exam/examContext';

const ContributeExam = (props) => {
  const { user } = props.auth;
  const { setAlert } = props;

  const examContext = useContext(ExamContext);
  const {
    getExamList,
    getExamCategories,
    examList,
    categories,
    exam,
    setExam,
  } = examContext;

  const [category, setCategory] = useState('');
  const [question, setQuestion] = useState('');
  const [questionType, setQuestionType] = useState('radio');
  const [prompt1, setPrompt1] = useState('');
  const [prompt2, setPrompt2] = useState('');
  const [prompt3, setPrompt3] = useState('');
  const [prompt4, setPrompt4] = useState('');
  const [explaination, setExplaination] = useState('');
  const [answer, setAnswer] = useState('');
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    getExamList();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setExam('');
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getExamCategories(exam);
    // eslint-disable-next-line
  }, [exam]);

  useEffect(() => {
    setPrompts([
      { prompt: { text: prompt1, isAnswer: answer === prompt1 } },
      { prompt: { text: prompt2, isAnswer: answer === prompt2 } },
      { prompt: { text: prompt3, isAnswer: answer === prompt3 } },
      { prompt: { text: prompt4, isAnswer: answer === prompt4 } },
    ]);
  }, [prompt1, prompt2, prompt3, prompt4, answer]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/contribute/question', {
        exam,
        category,
        question,
        questionType,
        prompts,
        explainations: [
          {
            contributedBy: user._id,
            text: explaination,
          },
        ],
        contributedBy: user._id,
      });
    } catch (err) {
      setAlert('error', 'An error occurred.  Question could not be submitted.');
      window.scrollTo(0, 0);
      return;
    }
    window.scrollTo(0, 0);
    setQuestion('');
    setPrompt1('');
    setPrompt2('');
    setPrompt3('');
    setPrompt4('');
    setExplaination('');
    setAnswer('');
    setAlert('success', 'Question was submitted successfully!');
  };

  const changeHandler = (e) => {
    switch (e.target.name) {
      case 'exam':
        setExam(e.target.value);
        break;
      case 'category':
        setCategory(e.target.value);
        break;
      case 'question':
        setQuestion(e.target.value);
        break;
      case 'questionType':
        setQuestionType(e.target.value);
        break;
      case 'prompt1':
        setPrompt1(e.target.value);
        break;
      case 'prompt2':
        setPrompt2(e.target.value);
        break;
      case 'prompt3':
        setPrompt3(e.target.value);
        break;
      case 'prompt4':
        setPrompt4(e.target.value);
        break;
      case 'explaination':
        setExplaination(e.target.value);
        break;
      case 'answer':
        setAnswer(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="contribute-exam-container">
      <div className="contribute-exam-form">
        <h2>Contribute an exam question</h2>
        <div className="exam-line"> </div>
        <form>
          <div className="select-exam">
            <select
              className="exam-selector"
              onChange={changeHandler}
              name="exam"
            >
              <optgroup>
                <option defaultValue>Select an exam</option>
                {examList &&
                  examList.map((examTitle) => {
                    return (
                      <option key={examTitle} value={examTitle}>
                        {examTitle}
                      </option>
                    );
                  })}
              </optgroup>
            </select>
            <select
              className="exam-selector"
              onChange={changeHandler}
              name="category"
            >
              <optgroup name="category">
                <option defaultValue>Select a category</option>
                {categories !== null &&
                  categories.map((category) => {
                    return (
                      <option key={category.name} value={category.name}>
                        {category.name}
                      </option>
                    );
                  })}
              </optgroup>
            </select>
            <select
              className="exam-selector"
              onChange={changeHandler}
              name="questionType"
            >
              <optgroup name="questionType">
                <option defaultValue>Select type of question</option>
                <option name="questionType" value="radio">
                  Radio
                </option>
              </optgroup>
            </select>
          </div>
          <label htmlFor="question">
            Question:
            <input
              type="text"
              value={question}
              name="question"
              onChange={changeHandler}
              placeholder="Question"
            ></input>
          </label>
          <label htmlFor="prompt1">
            Prompt 1:
            <input
              type="text"
              value={prompt1}
              name="prompt1"
              onChange={changeHandler}
              placeholder="Prompt1"
            />
          </label>
          <label htmlFor="prompt2">
            Prompt 2:
            <input
              type="text"
              value={prompt2}
              name="prompt2"
              onChange={changeHandler}
              placeholder="Prompt2"
            />
          </label>
          <label htmlFor="prompt3">
            Prompt 3:
            <input
              type="text"
              value={prompt3}
              name="prompt3"
              onChange={changeHandler}
              placeholder="Prompt3"
            />
          </label>
          <label htmlFor="prompt4">
            Prompt 4:
            <input
              type="text"
              value={prompt4}
              name="prompt4"
              onChange={changeHandler}
              placeholder="Prompt4"
            />
          </label>
          <label htmlFor="answer">
            What is the correct answer:
            <select name="answer" id="exam-answer" onChange={changeHandler}>
              <option value="defaultValue">
                Please select the correct answer
              </option>
              {prompt1 && <option value={prompt1}>{prompt1}</option>}
              {prompt2 && <option value={prompt2}>{prompt2}</option>}
              {prompt3 && <option value={prompt3}>{prompt3}</option>}
              {prompt4 && <option value={prompt4}>{prompt4}</option>}
            </select>
          </label>
          <label htmlFor="explaination">
            Provide an explaination to help users understand the topic better:
            <input
              type="text-box"
              value={explaination}
              name="explaination"
              onChange={changeHandler}
              placeholder="Explaination"
            />
          </label>
          <button onClick={submitHandler}>Submit</button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  alert: state.alert,
});

export default connect(mapStateToProps, { loadUser, setAlert })(ContributeExam);
