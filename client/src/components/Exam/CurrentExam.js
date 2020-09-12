import React, { useContext } from 'react';

import ExamPrompts from "./ExamPrompts"

import ExamContext from "../../context/exam/examContext"

const CurrentExam = () => {
    const examContext = useContext(ExamContext)

    const { inReview, startReview, questions, prevQuestion, nextQuestion, index, currentQuestion } = examContext

    const bottomBarClass = questions.length > 0 ? 'exam-bottom-bar' : 'exam-bottom-bar hidden'

    const nextHandler = () => {
        nextQuestion()
        document.getElementById("exam-form").reset()
    }

    const prevHandler = () => {
        prevQuestion()
        document.getElementById("exam-form").reset()
    }

  return (
            <form id="exam-form" className={(!questions || inReview) ? 'hidden' : ''}>
                    <h3>{currentQuestion && currentQuestion.question}</h3>
                    {currentQuestion && currentQuestion.prompts.map((prompt) => {
                        return <ExamPrompts  
                                    key={prompt._id} 
                                    id={currentQuestion._id}
                                    isAnswer={prompt.prompt.isAnswer}
                                    text={prompt.prompt.text}
                                    />
                        })}
                <div id="exam-bottom-bar" className={bottomBarClass}>
                    <span className="exam-nav" onClick={prevHandler}>Previous Question</span>
                { //SHOW SUBMIT BUTTON AT END OF TEST
                    (questions && (index === questions.length-1)) ?
                    <span className="exam-nav" onClick={startReview}>Submit and Review</span> :
                    <span className="exam-nav" onClick={nextHandler}>Next Question</span>
                }
                </div>
            </form>
  );
}

export default CurrentExam;
