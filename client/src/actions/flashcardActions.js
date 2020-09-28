import axios from 'axios';
import {
FLASHCARDS_LOADING,
LOAD_CARDS,
RESET_CARDS,
INC_FLASHCARD_INDEX,
DEC_FLASHCARD_INDEX
} from './types';

export const loadCards = (exam, categories) => async (dispatch) => {
  try{
    axios.get(`/api/flashcards/getcards/${exam}/${categoryString(categories)}`)
      .then((result) => {
        dispatch({type: FLASHCARDS_LOADING })
        dispatch({type: LOAD_CARDS, payload: result.data})})
      .catch(err => {
        console.error(err)
      })
  } catch (err) {
    console.error(err)
  }}

export const resetCards = () => (dispatch) => {
  dispatch({type: RESET_CARDS})
}

export const incIndex = () => (dispatch, getState) => {
  const {index, flashcards} = getState().flashcards
  if(index >= flashcards.length-1) {
    return
  } else {
    dispatch({type: INC_FLASHCARD_INDEX})
  }
}

export const decIndex = () => (dispatch, getState) => {
  const {index} = getState().flashcards
  if(index <= 0) {
    return
  } else {
    dispatch({type: DEC_FLASHCARD_INDEX})
  }
  
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