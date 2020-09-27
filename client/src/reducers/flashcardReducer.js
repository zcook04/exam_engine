import {
    SET_LOADING,
    CLEAR_LOADING,
  } from '../actions/types';
  
  const initialState = {
    exam: null,
    categories: null,
    index: 0,
    flashcards: [],
    currentCard: null,
    loading: false,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case SET_LOADING:
        return {
          ...state,
          loading: true,
        };
      case CLEAR_LOADING:
        return {
          ...state,
          loading: false,
        };
      default:
        return state;
    }
  };
  