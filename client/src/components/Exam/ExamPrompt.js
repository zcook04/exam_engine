import React from "react"

import "./ExamPrompt.css"



const ExamPrompt = (props) => {
  const { value, selectedAnswer, setSelectedAnswer } = props
  const changeHandler = (e) => {
    setSelectedAnswer(e.target.value)
    console.log(e.target.value)
  }
    return (
      <div className="prompt-container">
        <input value={value} name="Question" onChange={changeHandler} type="radio"></input>
        <p>{props.prompt}</p>
      </div>
    );
  }
  
export default ExamPrompt;