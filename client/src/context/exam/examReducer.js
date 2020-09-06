import {
    SET_INREVIEW,
    REMOVE_INREVIEW
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
        default:
            return state
    }
}