import React, {useContext, useEffect} from 'react';
import ClipLoader from "react-spinners/ClockLoader"

import SearchExam from "./SearchExams"
import CurrentExam from "./CurrentExam"
import ReviewExam from "./ReviewExam"

import AuthContext from "../../context/auth/authContext"
import ExamContext from "../../context/exam/examContext"

import "./Exam.css"



const Exam = () => {
    const authContext = useContext(AuthContext)
    const examContext = useContext(ExamContext)

    const { inReview, currentQuestion, loading } = examContext

    useEffect(() => {
        authContext.loadUser()
        // eslint-disable-next-line
    }, [])

  return (
    <div className="exam-container">
        <SearchExam/>
        {loading && <ClipLoader loading={loading} size={200} css={{margin: "auto"}}/>}
        {(currentQuestion !== null && !inReview &&!loading) && <CurrentExam />}
        {(currentQuestion !== null && inReview &&!loading) && <ReviewExam  />}
       
    </div>
  );
}

export default Exam;
