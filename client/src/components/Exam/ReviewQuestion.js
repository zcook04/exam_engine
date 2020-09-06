import React, { useState, useEffect } from 'react';
import axios from 'axios'
import ReviewPrompts from './ReviewPrompts'
import Explaination from './Explaination'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

import './ReviewQuestion.css'


const ReviewQuestion = (props) => {
    const { exam, id, wasAnswer } = props
    const [question, setQuestion] = useState('')
    const [prompts, setPrompts] = useState([])

    
    useEffect(() => {
        const getQuestion = async () => {
            const response = await axios.get(`http://localhost:5000/api/exams/${exam}/${id}`)
            const data = await [response.data]
            setQuestion(data[0])
            setPrompts([...data[0].prompts])
        }
        getQuestion()
    },[])

    const reviewTitleClasses = wasAnswer ? 'review-question-question is-answer' : 'review-question-question not-answser'

    return (
        <div className="review-question">
            <h3 className={reviewTitleClasses}>
                {wasAnswer ?
                <FontAwesomeIcon icon={faCheckCircle} /> :
                <FontAwesomeIcon icon={faTimesCircle} />}

                <span className="review-question-text">{question.question}</span></h3>
            {prompts.map((prompt) => {
                        return <React.Fragment key={prompt._id}>
                        <ReviewPrompts  
                                    key={prompt._id} 
                                    id={question.id}
                                    isAnswer={prompt.prompt.isAnswer}
                                    text={prompt.prompt.text}
                                    />
                                <Explaination />
                                </React.Fragment>
                        })}
        </div>
    );
};

export default ReviewQuestion;