import axios from 'axios';
import {
FLASHCARDS_LOADING,
LOAD_CARDS,
RESET_CARDS
} from './types';

export const loadCards = (exam, categories) => async (dispatch) => {
  const practiceCards = await axios.get(`/api/flashcards/getcards/${exam}/${categoryString(categories)}`)
  dispatch({type: FLASHCARDS_LOADING })
  dispatch({type: LOAD_CARDS, payload: practiceCards})
}

export const resetCards = () => (dispatch) => {
  dispatch({type: RESET_CARDS})
}

const categoryString = (categories) => {
  const categoryValues = [];
  categories.forEach((category) => {
    if (category.count <= 0) {
      return;
    } else if (categoryValues.length <= 0) {
      categoryValues.push(`?${category.name}=${category.count}`);
    } else {
      categoryValues.push(`${category.name}=${category.count}`);
    }
  });
  return categoryValues.join('&');
}