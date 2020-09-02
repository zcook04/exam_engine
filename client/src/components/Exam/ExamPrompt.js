import React from "react"

import "./ExamPrompt.css"



const ExamPrompt = (props) => {
    return (
      <div className="prompt-container">
        <input value={props.value} type="radio"></input>
        <p>{props.prompt}</p>
      </div>
    );
  }
  
export default ExamPrompt;