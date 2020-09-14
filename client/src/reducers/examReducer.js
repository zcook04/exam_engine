import {
  SET_INREVIEW,
  REMOVE_INREVIEW,
  LOAD_QUESTIONS,
  RESET_EXAM,
  INCREMENT_INDEX,
  DECREMENT_INDEX,
  INITIALIZE_CURRENT_QUESTION,
  SET_SELECTED_ANSWER,
  GET_EXAMLIST,
  SET_EXAM,
  GET_ALL_EXAM_CATEGORIES,
  CLEAR_EXAM_CATEGORIES,
  UPDATE_EXAM_CATEGORIES,
  SET_LOADING,
  CLEAR_LOADING,
} from '../actions/types';

const initialState = {
  inReview: false,
  categories: null,
  index: 0,
  exam: null,
  questions: [],
  currentQuestion: null,
  answers: null,
  examList: null,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_INREVIEW:
      return {
        ...state,
        inReview: true,
      };
    case REMOVE_INREVIEW:
      return {
        ...state,
        inReview: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_LOADING:
      return {
        ...state,
        loading: false,
      };
    case LOAD_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        answers: null,
        inReview: false,
        loading: false,
        index: 0,
      };
    case INITIALIZE_CURRENT_QUESTION:
      return {
        ...state,
        currentQuestion: state.questions[state.index],
        loading: false,
      };
    case INCREMENT_INDEX:
      return {
        ...state,
        index: state.index + 1,
        currentQuestion: state.questions[state.index + 1],
      };
    case DECREMENT_INDEX:
      return {
        ...state,
        index: state.index - 1,
        currentQuestion: state.questions[state.index - 1],
      };
    case SET_SELECTED_ANSWER:
      const newState = { ...state };
      newState.questions[state.index].selectedAnswer = action.payload;
      return {
        ...newState,
      };
    case GET_EXAMLIST:
      return {
        ...state,
        examList: action.payload,
        loading: false,
      };
    case SET_EXAM:
      return {
        ...state,
        exam: action.payload,
        loading: false,
      };
    case GET_ALL_EXAM_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        loading: false,
      };
    case UPDATE_EXAM_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case CLEAR_EXAM_CATEGORIES:
      return {
        ...state,
        categories: null,
      };
    case RESET_EXAM:
      return {
        ...state,
        inReview: false,
        index: 0,
        exam: null,
        categories: null,
        questions: [],
        currentQuestion: null,
        answers: null,
        loading: false,
      };
    default:
      return state;
  }
};
