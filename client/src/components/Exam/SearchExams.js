import React, {useContext, useEffect } from 'react';

import ExamState from '../../context/exam/examContext'

const SearchExams = props => {
    const examState = useContext(ExamState)
    const { getQuestions, examList, getExamList, setExam } = examState

    useEffect(() => {
        getExamList()
        //eslint-disable-next-line
    }, [])

    const examHandler = (e) => {
        setExam(e.target.value)
    }

    return (

            <div className="exam-search-container">
                <h2>Lets get started...</h2>
                <label htmlFor="exam-name">Choose An Exam: </label>
                <select onChange={examHandler} name="exam-name" id="exam-name">
                    <optgroup label="Exams">
                        {examList && examList.map(examTitle => {
                            return <option key={examTitle} value={examTitle}>{examTitle}</option>
                        })}
                    </optgroup>
                </select>
                <button onClick={getQuestions}>Get Questions</button>
                
            </div>
        
    );
};

export default SearchExams;