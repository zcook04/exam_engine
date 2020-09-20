import axios from 'axios';

import {
SET_FLASHCARDS
} from './types';

// SETS INREVIEW STATE TO TRUE
export const setFlashcards = (flashcards) => (dispatch) => {
  dispatch({ type: SET_FLASHCARDS, payload: flashcards });
};

