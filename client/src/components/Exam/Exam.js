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

    const { inReview, questions } = examContext

    useEffect(() => {
        authContext.loadUser()
        // eslint-disable-next-line
    }, [])

  return (
    <div className="exam-container">
        <SearchExam/>
        {(questions && !inReview) && <CurrentExam />}
        <ReviewExam  />
       
    </div>
  );
}

export default Exam;
