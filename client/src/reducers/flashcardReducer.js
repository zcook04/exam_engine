import {
    FLASHCARDS_LOADING,
    LOAD_CARDS,
    RESET_CARDS,
    INC_FLASHCARD_INDEX,
    DEC_FLASHCARD_INDEX
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
          flashcards: action.payload,
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
      case INC_FLASHCARD_INDEX:
        return {
          ...state,
          index: state.index+=1
        }
      case DEC_FLASHCARD_INDEX:
        return {
          ...state,
          index: state.index-=1
        }
      default:
        return state;
    }
  };
  