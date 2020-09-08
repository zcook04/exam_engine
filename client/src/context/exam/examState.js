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
    SET_EXAM
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

    const getQuestions = async () => {
        resetExam()
        if(state.categories !== null){
            try {
                let response = await axios.get(`http://localhost:5000/api/exams/${state.exam}/${state.categories}`)
                const data = await response.data
                shuffle(data)
                dispatch({type: LOAD_QUESTIONS, payload: data})
            } catch(err) {
                console.log(err)
            }
        } else {
            try { 
                let response = await axios.get(`http://localhost:5000/api/exams/${state.exam}`)
                const data = await response.data
                shuffle(data)
                await dispatch({type: LOAD_QUESTIONS, payload: data})
                dispatch({ type: INITIALIZE_CURRENT_QUESTION})
            } catch(err) {
                console.log(err)
            }
        }
    }

    const updateAnswers = (newAnswer) => {
        dispatch({ type: UPDATE_ANSWER, payload: newAnswer})
    }

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

    const getExamList = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/exams/`)
            const data = await response.data
            dispatch({ type: GET_EXAMLIST, payload: data })
        } catch (err) {
            console.log(err)
        }
    }

    const setExam = (examValue) => {
        dispatch({ type: SET_EXAM, payload: examValue })
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