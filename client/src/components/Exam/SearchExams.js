import React, {useContext} from 'react';

import ExamState from '../../context/exam/examContext'

const SearchExams = props => {
    const examState = useContext(ExamState)
    const { getQuestions } = examState
    return (
        
            <div className="exam-search-container">
                <button onClick={getQuestions}>Get Questions</button>
            </div>
        
    );
};

export default SearchExams;