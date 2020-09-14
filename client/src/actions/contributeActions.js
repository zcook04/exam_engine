import axios from 'axios';

import {
    GET_CONTRIBUTE_EXAMLIST,
    CLEAR_LOADING,
    SET_LOADING,
} from './types';

// SETS LOADING TO TRUE
export const setLoading = () => (dispatch) => {
  dispatch({ type: SET_LOADING });
};

export const clearLoading = () => (dispatch) => {dispatch({type: CLEAR_LOADING})}

// GETS A LIST OF EXAM TITLES
export const getExamList = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const response = await axios.get(`/api/contribute/examlist`);
    dispatch({ type: GET_CONTRIBUTE_EXAMLIST, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};