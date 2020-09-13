import React, {useContext, useEffect } from 'react';

import ExamCategories from './ExamCategories'

import ExamState from '../../context/exam/examContext'

const SearchExams = props => {
    const examState = useContext(ExamState)
    const { getQuestions, examList, getExamList, setExam, categories, getExamCategories, exam, resetExam, loading, endReview } = examState

    useEffect(() => {
        getExamList()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        getExamCategories(exam)
        // eslint-disable-next-line
        }, [exam])


    const examHandler = (e) => {
        if(e.target.value === 'Select an exam to get started'){
            resetExam()
            return
        } else {
            resetExam()
            setExam(e.target.value)
            return
        }
    }

    return (

            <div className="exam-search-container">
                <select onChange={examHandler} name="exam-name" id="exam-name">
                    <optgroup label="Exams">
                        <option defaultValue>Select an exam to get started</option>
                        {examList && examList.map(examTitle => {
                            return <option key={examTitle} value={examTitle}>{examTitle}</option>
                        })}
                    </optgroup>
                </select><br/>
                        {(categories !== null && categories.length > 0 && !loading) && <ExamCategories />}
                <br />
                <button onClick={getQuestions}>Get Questions</button>
                
            </div>
        
    );
};

export default SearchExams;