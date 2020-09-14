import axios from 'axios';

import {
  SET_INREVIEW,
  REMOVE_INREVIEW,
  LOAD_QUESTIONS,
  RESET_EXAM,
  INCREMENT_INDEX,
  DECREMENT_INDEX,
  INITIALIZE_CURRENT_QUESTION,
  SET_SELECTED_ANSWER,
  GET_EXAMLIST,
  SET_EXAM,
  GET_ALL_EXAM_CATEGORIES,
  CLEAR_EXAM_CATEGORIES,
  UPDATE_EXAM_CATEGORIES,
  SET_LOADING,
  CLEAR_LOADING,
} from './types';

// SETS INREVIEW STATE TO TRUE
export const startReview = () => (dispatch) => {
  dispatch({ type: SET_INREVIEW });
};

// SETS INREVIEW STATE TO FALSE
export const endReview = () => (dispatch) => {
  dispatch({ type: REMOVE_INREVIEW });
};

// SETS LOADING TO TRUE
export const setLoading = () => (dispatch) => {
  dispatch({ type: SET_LOADING });
};

// USED TO RANDOMIZE ORDER OF QUESTIONS RECEIVED FROM DB
export const shuffle = (arr) => {
  var currentIndex = arr.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }
  return arr;
};

// EXAM?CATEGORY=COUNT&CATEGORY=COUNT
// RETURNS EXAM QUESTIONS WITH SPECIFIED COUNTS FROM EACH CATEGORY.
export const getQuestions = () => async (dispatch, getState) => {
  const state = getState().exam;
  dispatch({ type: SET_LOADING });
  try {
    if (state.categories !== null) {
      dispatch({ type: SET_LOADING });
      const categoryString = setCategoryString(state);
      let response = await axios.get(
        `/api/exams/${state.exam}${categoryString}`
      );
      const data = await response.data;
      shuffle(data);
      dispatch({ type: LOAD_QUESTIONS, payload: data });
      dispatch({ type: INITIALIZE_CURRENT_QUESTION });
    } else {
      dispatch({ type: SET_LOADING });
      let response = await axios.get(`/api/exams/${state.exam}`);
      const data = await response.data;
      shuffle(data);
      dispatch({ type: LOAD_QUESTIONS, payload: data });
      dispatch({ type: INITIALIZE_CURRENT_QUESTION });
    }
  } catch (err) {
    console.log(err);
  }

  dispatch({ type: CLEAR_LOADING });
  return;
};

//ADDS OR MODIFIES CURRENT EXAMS ANSWERS BASED ON QUESTION ID BEING TRUE OR FALSE
export const setSelectedAnswer = (newAnswer) => (dispatch) => {
  dispatch({ type: SET_SELECTED_ANSWER, payload: newAnswer });
};

// RESETS EXAM PARAMETERS
export const resetExam = () => (dispatch) => {
  dispatch({ type: RESET_EXAM });
};

// INCREASES INDEX AND MOVES TO THE NEXT INDEXED QUESTION
export const nextQuestion = () => (dispatch, getState) => {
  const state = getState().exam;
  if (state.questions.length - 1 !== state.index) {
    try {
      dispatch({ type: INCREMENT_INDEX });
    } catch (err) {
      console.log(err);
    }
  }
};

// DECREASES INDEX AND MOVES TO PREVIOUS QUESTION
export const prevQuestion = () => (dispatch, getState) => {
  const state = getState().exam;
  if (state.index > 0) {
    try {
      dispatch({ type: DECREMENT_INDEX });
    } catch (err) {
      console.log(err);
    }
  }
};

// GETS A LIST OF EXAM TITLES
export const getExamList = () => async (dispatch) => {
  dispatch({ type: CLEAR_EXAM_CATEGORIES });
  try {
    dispatch({ type: SET_LOADING });
    const response = await axios.get(`/api/exams/`);
    dispatch({ type: GET_EXAMLIST, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

// GIVEN A TITLE, GETS A LIST OF ITS CORRESPONDING CATEGORIES AND EACH
// CATEGORIES QUESTION COUNT.
export const getExamCategories = () => async (dispatch, getState) => {
  const state = getState().exam;
  if (state.exam !== null) {
    dispatch({ type: SET_LOADING });
    const response = await axios.get(`/api/exams/${state.exam}/categories`);
    dispatch({ type: GET_ALL_EXAM_CATEGORIES, payload: response.data });
  }
};

export const updateCategories = (updatedCategories) => (dispatch, getState) => {
  const state = getState().exam;
  dispatch({ type: UPDATE_EXAM_CATEGORIES, payload: updatedCategories });
  setCategoryString(state);
};

// UPDATES THE EXAM STATE WITH NEW EXAM VALUE
export const setExam = (examValue) => (dispatch) => {
  dispatch({ type: SET_LOADING });
  dispatch({ type: SET_EXAM, payload: examValue });
};

//SETS CATEGORY SEARCH STRING FOR BACKEND API
const setCategoryString = (state) => {
  const categoryValues = [];
  state.categories.forEach((category) => {
    if (category.count <= 0) {
      return;
    } else if (categoryValues.length <= 0) {
      categoryValues.push(`?${category.name}=${category.count}`);
    } else {
      categoryValues.push(`${category.name}=${category.count}`);
    }
  });
  return categoryValues.join('&');
};
