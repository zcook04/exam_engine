import React, { memo } from 'react';
import ReviewQuestion from './ReviewQuestion'

import './ReviewExam.css'

const ReviewExam = memo((props) => {
    const { answers, exam } = props.answers ? props : {answers: {"noanswers": false}}

    //SORT CORRECT/WRONG ANSWERS INTO SEPERATE ARRAYS AND COUNTS
    const sortAnswers = () => {
        let correctAnswers = 0
        let wrongAnswers = 0
        let correctQuestions = []
        let wrongQuestions = []

        for (let answer in answers) {
            if (answer ==="noanswers"){
                return [correctAnswers, correctQuestions, wrongAnswers, wrongQuestions]
            }
            else if (answers[answer]) {
                correctAnswers++
                correctQuestions.push(answer)
            } else {
                wrongAnswers++
                wrongQuestions.push(answer)
            }
                
        }
        return [correctAnswers, correctQuestions, wrongAnswers, wrongQuestions]
    }
    let [correctCount, correctAnswers, wrongCount, wrongAnswers] = sortAnswers()
    
    let examScore = (correctCount/(correctCount+wrongCount))*100

    return (
        
        <div className="exam-review-container">
            <h3 className="exam-score">You scored: {examScore}%</h3>

            <div className="wrong-answers">
            {
                wrongAnswers.map(answer => {
                    return <div key={answer} className="review-question-wrong">
                    <ReviewQuestion key={answer} id={answer} exam={exam}/>
                    </div>
            })}
            </div>
            <div className="correct-answers">
            {
                correctAnswers.map(answer => {
                    return <ReviewQuestion key={answer} id={answer} exam={exam}/>
            })}
            </div>

        </div>
    );
});

export default ReviewExam;