import React from "react"

import "./ExamPrompt.css"



const ExamPrompts = (props) => {
  const {text, isAnswer, answers, setAnswers, id, currentQuestion} = props

  const changeHandler = (e) => {
    if(e.target.value && isAnswer) {
      const currentAnswers = { ... answers }
      currentAnswers[e.target.value] = true
    setAnswers(currentAnswers)    
    }

    if(e.target.value && !isAnswer) {
      const currentAnswers = { ... answers }
      currentAnswers[e.target.value] = false
    setAnswers(currentAnswers) 
    }
  }

    return (
      <div className="prompt-container">
        <input value={id} name={currentQuestion} onChange={changeHandler} type="radio" />
        <p>{text}</p>
      </div>
    );
  }
  
export default ExamPrompts;