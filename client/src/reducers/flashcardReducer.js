import {
    FLASHCARDS_LOADING,
    LOAD_CARDS,
    RESET_CARDS
  } from '../actions/types';
  
  const initialState = {
    index: 0,
    flashcards: [],
    cardsLoaded: false,
    loading: false,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FLASHCARDS_LOADING:
        return {
          ...state,
          loading: true,
        };
      case LOAD_CARDS:
        return {
          ...state,
          flashcards: action.payload.data,
          loading: false,
          cardsLoaded: true
        }
      case RESET_CARDS:
        return {
          ...state,
          flashcards: [],
          loading: false,
          index: 0,
          cardsLoaded: false
        }
      default:
        return state;
    }
  };
  