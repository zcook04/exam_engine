import {
    GET_CONTRIBUTE_EXAMLIST,
    SET_LOADING,
  } from '../actions/types';
  
  const initialState = {
      contributeExams: []
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case SET_LOADING:
        return {
          ...state,
          loading: true,
        };
      case GET_CONTRIBUTE_EXAMLIST:
          const newState = { ...state }
          newState.contributeExams = action.payload
        return {
          ...newState,
          loading: false,
        };
      default:
        return state;
    }
  };
  