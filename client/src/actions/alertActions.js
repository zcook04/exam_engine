import { SET_ALERT, REMOVE_ALERT } from './types';
import uuid from 'uuid';

//CREATE ALERTS
export const setAlert = (alertType, msg, timeout = 5000) => (dispatch) => {
  console.log(`Alert Type: ${alertType}
msg: ${msg}`);
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { alertType, msg, id },
  });

  setTimeout(() => {
    dispatch({ type: REMOVE_ALERT, payload: id });
  }, timeout);
};
