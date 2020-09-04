import React from "react"

import "./ExamPrompt.css"



const ExamPrompts = (props) => {
  const changeHandler = (e) => {
    setSelectedAnswer(e.target.value)
  }

  const { value, text, prompt, selectedAnswer, setSelectedAnswer} = props
    return (
      <div className="prompt-container">
        <input value={value} name="Question" onChange={changeHandler} type="radio"></input>
        <p>{text}</p>
      </div>
    );
  }
  
export default ExamPrompts;