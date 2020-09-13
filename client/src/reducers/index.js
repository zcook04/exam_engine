import { combineReducers } from 'redux';
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import examReducer from './examReducer';

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  exam: examReducer,
});
