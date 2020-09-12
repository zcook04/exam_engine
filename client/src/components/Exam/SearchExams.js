import React, {useContext, useEffect } from 'react';

import ExamCategories from './ExamCategories'

import ExamState from '../../context/exam/examContext'

const SearchExams = props => {
    const examState = useContext(ExamState)
    const { getQuestions, examList, getExamList, setExam, categories, getExamCategories, exam } = examState

    useEffect(() => {
        getExamList()
        setExam('ccna')
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        getExamCategories(exam)
        // eslint-disable-next-line
        }, [])

    useEffect(() => {
        getExamCategories(exam)
        // eslint-disable-next-line
        }, [exam])


    const examHandler = (e) => {
        setExam(e.target.value)
    }

    return (

            <div className="exam-search-container">
                <label htmlFor="exam-name">Choose An Exam: </label>
                <select onChange={examHandler} name="exam-name" id="exam-name">
                    <optgroup label="Exams">
                        {examList && examList.map(examTitle => {
                            return <option key={examTitle} value={examTitle}>{examTitle}</option>
                        })}
                    </optgroup>
                </select><br/>
                        {(categories !== null &&categories.length > 0) && <ExamCategories />}
                <br />
                <button onClick={getQuestions}>Get Questions</button>
                
            </div>
        
    );
};

export default SearchExams;