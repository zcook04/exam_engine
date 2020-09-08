import React, { useContext } from 'react';

import ExamPrompts from "./ExamPrompts"

import ExamContext from "../../context/exam/examContext"

const CurrentExam = () => {
    const examContext = useContext(ExamContext)

    const { inReview, startReview, questions, prevQuestion, nextQuestion, index, currentQuestion } = examContext




    // IF NO QUESTIONS HIDE THE BOTTOM EXAM-NAVIGATION
    // const bottomBarClass = questions.length > 0 ? 'exam-bottom-bar' : 'exam-bottom-bar hidden'

  return (
            <form id="exam" className={(!questions || inReview) ? 'hidden' : ''}>
                    <h3>{currentQuestion && currentQuestion.question}</h3>
                    {currentQuestion && currentQuestion.prompts.map((prompt) => {
                        return <ExamPrompts  
                                    key={prompt._id} 
                                    id={currentQuestion ? currentQuestion._id : ''}
                                    isAnswer={prompt.prompt.isAnswer}
                                    text={prompt.prompt.text}
                                    />
                        })}
                <div id="exam-bottom-bar" className={`exam-bottom-bar`}>
                    <span className="exam-nav" onClick={prevQuestion}>Previous Question</span>
                { //SHOW SUBMIT BUTTON AT END OF TEST
                    index === questions.length-1 ?
                    <span className="exam-nav" onClick={startReview}>Submit and Review</span> :
                    <span className="exam-nav" onClick={nextQuestion}>Next Question</span>
                }
                </div>
            </form>
  );
}

export default CurrentExam;
