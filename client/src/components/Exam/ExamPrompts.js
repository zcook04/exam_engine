import React, { useContext } from "react"

import ExamContext from "../../context/exam/examContext"

import "./ExamPrompt.css"



const ExamPrompts = (props) => {
  const examContext = useContext(ExamContext)
  const { updateAnswers, answers, currentQuestion } = examContext

  const {text, isAnswer } = props

  const changeHandler = (e) => {
    console.log(e.target.name)
    if(e.target.value && isAnswer) {
      const currentAnswers = { ...answers }
      currentAnswers[e.target.value] = true
      updateAnswers({...currentAnswers})
    }
    if(e.target.value && !isAnswer) {
      const currentAnswers = { ...answers }
      currentAnswers[e.target.value] = false
      updateAnswers({...currentAnswers})
    }
  }

    return (
      <div className="prompt-container">
        <input value={currentQuestion._id} name={currentQuestion} onChange={changeHandler} type="radio" />
        <p>{text}</p>
      </div>
    );
  }
  
export default ExamPrompts;