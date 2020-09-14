import {
    SET_CONTRIBUTE_EXAM,
    SET_CONTRIBUTE_EXAM_CATEGORIES,
    CLEAR_CONTRIBUTE_EXAM_CATEGORIES,
    GET_CONTRIBUTE_EXAMLIST,
    SET_LOADING,
  } from '../actions/types';
  
  const initialState = {
    categories: null,
    exam: null,
    examList: null,
    loading: false,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case SET_LOADING:
        return {
          ...state,
          loading: true,
        };
      case GET_CONTRIBUTE_EXAMLIST:
        return {
          ...state,
          examList: action.payload,
          loading: false,
        };
      case SET_CONTRIBUTE_EXAM:
        return {
          ...state,
          exam: action.payload,
          loading: false,
        };
      case SET_CONTRIBUTE_EXAM_CATEGORIES:
        return {
          ...state,
          categories: action.payload,
          loading: false,
        };
      case CLEAR_CONTRIBUTE_EXAM_CATEGORIES:
        return {
          ...state,
          categories: null,
        };
      default:
        return state;
    }
  };
  