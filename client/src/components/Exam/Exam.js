import React, {useState} from 'react';
import axios from 'axios'

import ExamPrompt from "./ExamPrompt"

import "./Exam.css"

const Exam = () => {

    const questions = []
    
    const shuffleArray = (arr) => {
        var currentIndex = arr.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = arr[currentIndex];
            arr[currentIndex] = arr[randomIndex];
            arr[randomIndex] = temporaryValue;
        }
        return arr;
    }
    
    const getPrompts = (currentQuestion) => {
        const prompts = []
        if(currentQuestion.prompt1)
            prompts.push(currentQuestion.prompt1)
        if(currentQuestion.prompt2)
            prompts.push(currentQuestion.prompt2)
        if(currentQuestion.prompt3)
            prompts.push(currentQuestion.prompt3)
        if(currentQuestion.prompt4)
            prompts.push(currentQuestion.prompt4)
        return prompts
    }

    const [index, setIndex] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState("")
    const [selectedAnswer, setSelectedAnswer] = useState('')

    const prompts = getPrompts(currentQuestion)
    
    const examLoaded = currentQuestion == "" ? "hidden" : "" 

    const nextHandler = async () => {
        await setIndex(index +1)
        setCurrentQuestion(questions[index])
        console.log(`Next Clicked ${index}`)
    }

    const prevHandler = () => {
        setIndex(index -1)
        setCurrentQuestion(questions[index])
        console.log(`Prev Clicked ${index}`)
    }

    const answerHandler = () => {
        setIndex(index -1)
        setCurrentQuestion(questions[index])
        console.log(`Answer Clicked ${index}`)
    }

  return (
    <div className="exam-container">
            <form id="exam" className={examLoaded}>
            <h3>{currentQuestion.question}</h3>
            {prompts.map(prompt => {
                return <ExamPrompt key={prompt.value} value={prompt.value} selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer} prompt={prompt.text} />
            })}

            <div className="exam-bottom-bar">
                <span className="exam-nav" onClick={prevHandler}>Previous Question</span>
                <span className="exam-nav" onClick={answerHandler}>View Answer/Explaination</span>
                <span className="exam-nav" onClick={nextHandler}>Next Question</span>
            </div>
        </form>

    </div>
  );
}

export default Exam;
