import React, { useReducer } from 'react'
import ExamContext from './examContext'
import examReducer from './examReducer'
import axios from 'axios'
import {
    SET_INREVIEW,
    REMOVE_INREVIEW
} from '../types'

const ExamState = props => {
    const initialState = {
        inReview: false,
        categories: null
    }

    const [state, dispatch] = useReducer(examReducer, initialState)

    const startReview = () => {
        dispatch({ type: SET_INREVIEW })
    }

    const endReview = () => {
        dispatch({ type: REMOVE_INREVIEW })
    }

    // USED TO RANDOMIZE ORDER OF QUESTIONS RECEIVED FROM DB
    const shuffle = (arr) => {
        var currentIndex = arr.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = arr[currentIndex];
            arr[currentIndex] = arr[randomIndex];
            arr[randomIndex] = temporaryValue;
        }
        return arr;
    }

    return (
        <ExamContext.Provider
            value={{
                inReview: state.inReview,
                categories: state.categories,
                startReview,
                endReview,
                shuffle
            }}
        >
            {props.children}
        </ExamContext.Provider>
    )
}

export default ExamState