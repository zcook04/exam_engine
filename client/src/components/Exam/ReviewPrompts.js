import React from "react"

import "./ReviewPrompts.css"



const ExamPrompts = (props) => {
  const {text, isAnswer} = props
  
  const isAnswerClass = isAnswer ? 'review-prompt-container is-answer' : 'review-prompt-container not-answer'
    return (
      <div className={isAnswerClass}>
        <p>{text}</p>
      </div>
    );
  }
  
export default ExamPrompts;