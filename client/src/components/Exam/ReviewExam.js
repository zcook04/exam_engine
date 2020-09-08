import React, { useContext } from 'react';
import ReviewQuestion from './ReviewQuestion'
import ExamContext from "../../context/exam/examContext"
import './ReviewExam.css'

const ReviewExam = () => {
    const examContext = useContext(ExamContext)
    const { answers, exam, inReview } = examContext

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
        
        <div className={inReview ? "exam-review-container" : "exam-review-container hidden"}>
            <h3 className="exam-score">You scored: {examScore}%</h3>

            <div className="wrong-answers">
            {
                wrongAnswers.map(answer => {
                    return <div key={answer} className="review-question-wrong">
                    <ReviewQuestion wasAnswer={false} key={answer} id={answer} exam={exam}/>
                    </div>
            })}
            </div>
            <div className="correct-answers">
            {
                correctAnswers.map(answer => {
                    return <ReviewQuestion wasAnswer={true} key={answer} id={answer} exam={exam}/>
            })}
            </div>

        </div>
    );
};

export default ReviewExam;