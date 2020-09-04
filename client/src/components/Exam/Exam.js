import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

import ExamPrompts from "./ExamPrompts"

import "./Exam.css"



const Exam = () => {
    const [questions, setQuestions] = useState([])
    const [questionSearch, setQuestionSearch] = useState('')

    const [index, setIndex] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState(questions[index])
    const [prompts, setPrompts] = useState([])
    const [selectedAnswer, setSelectedAnswer] = useState('')


    const shuffle = (arr) => {
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
    
    useEffect(() => {
        const getQuestions = async (exam = "ccna", categories = null) => {
            if (categories === null) {
                try{ 
                    let response = await axios.get(`http://localhost:5000/api/exams/${exam}`)
                    const data = await response.data
                    setQuestions(shuffle(data))
                } catch (error) {
                    console.log(error)
                }
            }
        }
        getQuestions()
    }, [questionSearch])

    useEffect(() => {
        if (currentQuestion) {
            setPrompts(currentQuestion.prompts)
        } else {
            setPrompts([])
        } 
    }, [questions, currentQuestion])

    useEffect(() => {
        if(questions) {
            setCurrentQuestion(questions[index])
        } else {
            setCurrentQuestion(null)
        }
    },[questions, index])
    
    const examLoaded = currentQuestion == "" ? "hidden" : "" 

    const nextHandler = async () => {
        if((questions.length -1)!== (index)) {
            try {
                setIndex(index + 1)
            } catch (err){
                console.log(err)
            }
        }
    }

    const prevHandler = () => {
        if(index > 0) {
            try{
                setIndex(index-1)
            } catch (err) {
                console.log(err)
            }

        }
    }

    const answerHandler = () => {
        console.log(`Answer Clicked ${index}`)
    }

    const filterQuestions = () => {
        setQuestionSearch('?switching=3') //NEEDS REWORKED TO BE DYNAMIC
    }
    

  return (
    <div className="exam-container">
        <button onClick={filterQuestions}>Get Questions</button>
            <form id="exam" className={examLoaded}>
            <h3>{currentQuestion && currentQuestion.question}</h3>
            {prompts.map((prompt) => {
                console.log(prompt)
                return <ExamPrompts  
                            key={uuidv4()} 
                            isAnswer={prompt.prompt.isAnswer}
                            text={prompt.prompt.text}/>
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
