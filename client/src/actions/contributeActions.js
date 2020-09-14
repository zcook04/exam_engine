import axios from 'axios';

import {
    SET_CONTRIBUTE_EXAM,
    SET_CONTRIBUTE_EXAM_CATEGORIES,
    CLEAR_CONTRIBUTE_EXAM_CATEGORIES,
    GET_CONTRIBUTE_EXAMLIST,
  SET_LOADING,
} from './types';

// SETS LOADING TO TRUE
export const setLoading = () => (dispatch) => {
  dispatch({ type: SET_LOADING });
};

// GETS A LIST OF EXAM TITLES
export const getExamList = () => async (dispatch) => {
  dispatch({ type: CLEAR_CONTRIBUTE_EXAM_CATEGORIES });
  try {
    dispatch({ type: SET_LOADING });
    const response = await axios.get(`/api/exams/`);
    dispatch({ type: GET_CONTRIBUTE_EXAMLIST, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

// GIVEN A TITLE, GETS A LIST OF ITS CORRESPONDING CATEGORIES AND EACH
// CATEGORIES QUESTION COUNT.
export const getExamCategories = () => async (dispatch, getState) => {
  const state = getState().contribute;
  if (state.exam !== null) {
    dispatch({ type: SET_LOADING });
    const response = await axios.get(`/api/exams/${state.exam}/categories`);
    dispatch({ type: SET_CONTRIBUTE_EXAM_CATEGORIES, payload: response.data });
  }
};

// UPDATES THE CONTRIBUTE EXAM STATE WITH NEW EXAM VALUE
export const setExam = (examValue) => (dispatch) => {
  dispatch({ type: SET_LOADING });
  dispatch({ type: SET_CONTRIBUTE_EXAM, payload: examValue });
};