import {
SET_FLASHCARDS,
SET_LOADING,
CLEAR_LOADING
} from './types';

// LOADS FLASHCARDS INTO STATE
export const setFlashcards = (flashcards) => (dispatch) => {
  dispatch({ type: SET_LOADING })
  dispatch({ type: SET_FLASHCARDS, payload: flashcards });
  dispatch({ type: CLEAR_LOADING })
};