import React, {useContext, useEffect} from 'react';

import SearchExam from "./SearchExams"
import CurrentExam from "./CurrentExam"
import ReviewExam from "./ReviewExam"

import AuthContext from "../../context/auth/authContext"
import ExamContext from "../../context/exam/examContext"

import "./Exam.css"



const Exam = () => {
    const authContext = useContext(AuthContext)
    const examContext = useContext(ExamContext)

    const { inReview, currentQuestion } = examContext

    useEffect(() => {
        authContext.loadUser()
        // eslint-disable-next-line
    }, [])

  return (
    <div className="exam-container">
        <SearchExam/>
        {(currentQuestion !== null && !inReview) && <CurrentExam />}
        <ReviewExam  />
       
    </div>
  );
}

export default Exam;
