import { combineReducers } from 'redux';
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import examReducer from './examReducer';
import contributeReducer from './contributeReducer'
import flashcardReducer from './flashcardReducer'

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  exam: examReducer,
  contribute: contributeReducer,
  flashcard: flashcardReducer
});
