import React, {useState, useContext, useEffect} from 'react';

import SearchExam from "./SearchExams"
import CurrentExam from "./CurrentExam"
import ReviewExam from "./ReviewExam"

import AuthContext from "../../context/auth/authContext"
import ExamContext from "../../context/exam/examContext"

import "./Exam.css"



const Exam = () => {
    const authContext = useContext(AuthContext)
    const examContext = useContext(ExamContext)

    const { inReview, startReview, questions, prevQuestion, nextQuestion, exam, index, currentQuestion } = examContext

    useEffect(() => {
        authContext.loadUser()
        // eslint-disable-next-line
    }, [])


    // IF NO QUESTIONS HIDE THE BOTTOM EXAM-NAVIGATION
    const bottomBarClass = questions.length > 0 ? 'exam-bottom-bar' : 'exam-bottom-bar hidden'

  return (
    <div className="exam-container">
        <SearchExam/>
        {(questions && !inReview) && <CurrentExam />}
        <ReviewExam  />
       
    </div>
  );
}

export default Exam;
