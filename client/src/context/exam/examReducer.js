import {
    SET_INREVIEW,
    REMOVE_INREVIEW,
    LOAD_QUESTIONS,
    RESET_EXAM,
    INCREMENT_INDEX,
    DECREMENT_INDEX,
    INITIALIZE_CURRENT_QUESTION,
    UPDATE_ANSWER,
    GET_EXAMLIST,
    SET_EXAM,
    ADD_EXAM_CATEGORIES,
    CLEAR_EXAM_CATEGORIES
} from '../types'

export default (state, action) => {
    switch(action.type) {
        case SET_INREVIEW:
            return {
                ...state,
                inReview: true
            }
        case REMOVE_INREVIEW:
            return {
                ...state,
                inReview: false
            }
        case LOAD_QUESTIONS:
            return {
                ...state,
                questions: action.payload,
            }
        case INITIALIZE_CURRENT_QUESTION:
            return {
                ...state,
                currentQuestion: state.questions[state.index]
            }
        case INCREMENT_INDEX:
            return {
                ...state,
                index: state.index + 1,
                currentQuestion: state.questions[state.index +1]
            }
        case DECREMENT_INDEX:
            return {
                ...state,
                index: state.index - 1,
                currentQuestion: state.questions[state.index -1]
            }
        case UPDATE_ANSWER:
            return {
                ...state,
                answers: {...state.answers, ...action.payload}
            }
        case GET_EXAMLIST:
            return {
                ...state,
                examList: action.payload
            }
        case SET_EXAM:
            return {
                ...state,
                exam: action.payload
            }
        case ADD_EXAM_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        case CLEAR_EXAM_CATEGORIES:
            return {
                ...state,
                categories: null
            }
        case RESET_EXAM:
            return {
                ...state,
                inReview: false,
                categories: null, //NEEDS TO BE REMOVED ONCE CATEGORY SEARCH FUNCTION WORKS.
                index: 0,
                questions: [],
                currentQuestion: null,
                answers: null
            }
        default:
            return state
    }
}