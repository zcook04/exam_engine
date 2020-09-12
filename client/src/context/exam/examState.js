import React, { useReducer } from 'react'
import ExamContext from './examContext'
import examReducer from './examReducer'
import axios from 'axios'
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
    GET_ALL_EXAM_CATEGORIES,
    CLEAR_EXAM_CATEGORIES,
    UPDATE_EXAM_CATEGORIES
} from '../types'

const ExamState = props => {
    const initialState = {
        inReview: false,
        categories: null,
        index: 0,
        exam: 'ccna',
        questions: [],
        currentQuestion: null,
        answers: null,
        examList: null
    }

    const [state, dispatch] = useReducer(examReducer, initialState)

    // SETS INREVIEW STATE TO TRUE
    const startReview = () => {
        dispatch({ type: SET_INREVIEW })
    }

    // SETS INREVIEW STATE TO FALSE
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

    // EXAM?CATEGORY=COUNT&CATEGORY=COUNT
    // RETURNS EXAM QUESTIONS WITH SPECIFIED COUNTS FROM EACH CATEGORY.
    const getQuestions = async () => {
        resetExam()
        if(state.exam !== null){
            try { 
                if(state.categories !== null) {
                    const categoryString = setCategoryString()
                    let response = await axios.get(`/api/exams/${state.exam}${categoryString}`)
                    const data = await response.data
                    shuffle(data)
                    dispatch({type: LOAD_QUESTIONS, payload: data})
                    dispatch({ type: INITIALIZE_CURRENT_QUESTION})
                } else {
                    let response = await axios.get(`/api/exams/${state.exam}`)
                    const data = await response.data
                    shuffle(data)
                    dispatch({type: LOAD_QUESTIONS, payload: data})
                    dispatch({ type: INITIALIZE_CURRENT_QUESTION})
                }
            } catch(err) {
                console.log(err)
            }
        }
    }

    //ADDS OR MODIFIES CURRENT EXAMS ANSWERS BASED ON QUESTION ID BEING TRUE OR FALSE
    const updateAnswers = (newAnswer) => {
        dispatch({ type: UPDATE_ANSWER, payload: newAnswer})
    }

    // RESETS EXAM PARAMETERS
    const resetExam = () => {
        dispatch({type: RESET_EXAM})
    }

    // INCREASES INDEX AND MOVES TO THE NEXT INDEXED QUESTION
    const nextQuestion = async () => {
        if((state.questions.length -1) !== (state.index)) {
            try {
                dispatch({ type: INCREMENT_INDEX })
            } catch (err){
                console.log(err)
            }
        }
    }

    // DECREASES INDEX AND MOVES TO PREVIOUS QUESTION
    const prevQuestion = () => {
        if(state.index > 0) {
            try{
                dispatch({ type: DECREMENT_INDEX })
            } catch (err) {
                console.log(err)
            }
        }
    }

    // GETS A LIST OF EXAM TITLES
    const getExamList = async () => {
        dispatch({ type: CLEAR_EXAM_CATEGORIES })
        try {
            const response = await axios.get(`http://localhost:5000/api/exams/`)
            dispatch({ type: GET_EXAMLIST, payload: response.data })
        } catch (err) {
            console.log(err)
        }
    }

    // GIVEN A TITLE, GETS A LIST OF ITS CORRESPONDING CATEGORIES AND EACH
    // CATEGORIES QUESTION COUNT.
    const getExamCategories = async () => {
        const response = await axios.get(`http://localhost:5000/api/exams/${state.exam}/categories`)
        dispatch({ type: GET_ALL_EXAM_CATEGORIES, payload: response.data })
    }

    const updateCategories = (updatedCategories) => {
        dispatch({ type: UPDATE_EXAM_CATEGORIES, payload: updatedCategories })
        setCategoryString()
    }

    // UPDATES THE EXAM STATE WITH NEW EXAM VALUE
    const setExam = (examValue) => {
        dispatch({ type: SET_EXAM, payload: examValue })
    }

    //SETS CATEGORY SEARCH STRING FOR BACKEND API
    const setCategoryString = () => {
        const categoryValues = []
        state.categories.forEach(category => {
            if(category.count <= 0){
                return
            } else if (categoryValues.length <= 0){
                categoryValues.push(`?${category.name}=${category.count}`)
            } 
            else {
                categoryValues.push(`${category.name}=${category.count}`)
            }
        })
        return categoryValues.join('&')
    }

    return (
        <ExamContext.Provider
            value={{
                inReview: state.inReview,
                categories: state.categories,
                exam: state.exam,
                questions: state.questions,
                index: state.index,
                currentQuestion: state.currentQuestion,
                answers: state.answers,
                examList: state.examList,
                getExamList,
                startReview,
                endReview,
                shuffle,
                getQuestions,
                getExamCategories,
                updateCategories,
                resetExam,
                nextQuestion,
                prevQuestion,
                updateAnswers,
                setExam
            }}
        >
            {props.children}
        </ExamContext.Provider>
    )
}

export default ExamState