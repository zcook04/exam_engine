import React from 'react';
import axios from 'axios';

const getQuestions = async () => {
    try { 
        let response = await axios.get(`http://localhost:5000/api/exams/${exam}`)
        const data = await response.data
        setQuestions(shuffle(data))
        setInReview(false)
    } catch(err) {
        console.log(err)
    }
}

const SearchExams = props => {
    return (
        
            <div className="exam-search-container">
                <button onClick={getQuestions}>Get Questions</button>
            </div>
        
    );
};

export default SearchExams;