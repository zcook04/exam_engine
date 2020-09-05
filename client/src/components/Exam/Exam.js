import React, {useState, useEffect} from 'react';
import axios from 'axios'

import ExamPrompts from "./ExamPrompts"
import ReviewExam from "./ReviewExam"

import "./Exam.css"



const Exam = () => {
    const [exam, setExam] = useState('ccna')
    const [categories, setCategories] = useState(null)
    const [questions, setQuestions] = useState([])
    const [questionSearch, setQuestionSearch] = useState('')

    const [index, setIndex] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState(questions[index])
    const [prompts, setPrompts] = useState([])
    const [answers, setAnswers] = useState()
    const [inReview, setInReview] = useState(true)

    // USED TO RANDOMIZE ORDER OF QUESTIONS RECEIVED FROM DB
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

    // GETS QUESTIONS FROM DATABASE.  REQUIRES AN EXAM AND OPTIONAL CATEGORIES
    const getQuestions = async () => {
        try { 
            let response = await axios.get(`http://localhost:5000/api/exams/${exam}`)
            const data = await response.data
            setQuestions(shuffle(data))
        } catch(err) {
            console.log(err)
        }
    }

    // UPDATES PROMPTS WHEN NEW QUESTIONS ARE LOADED OR CURRENT QUESTION CHANGES
    useEffect(() => {
        if (currentQuestion) {
            setPrompts(currentQuestion.prompts)
        } else {
            setPrompts([])
        } 
    }, [questions, currentQuestion])

    // UPDATES CURRENT QUESTION WHEN NEW QUESTIONS ARE LOADED OR INDEX IS CHANGED
    useEffect(() => {
        if(questions) {
            setCurrentQuestion(questions[index])
        } else {
            setCurrentQuestion(null)
        }
    },[questions, index])
    
    // INCREASES INDEX AND MOVES TO THE NEXT INDEXED QUESTION
    const nextHandler = async () => {
        if((questions.length -1)!== (index)) {
            try {
                setIndex(index + 1)
            } catch (err){
                console.log(err)
            }
        }
    }

    // DECREASES INDEX AND MOVES TO PREVIOUS QUESTION
    const prevHandler = () => {
        if(index > 0) {
            try{
                setIndex(index-1)
            } catch (err) {
                console.log(err)
            }

        }
    }

    // UNLOADS QUESTIONS, RESETS INDEX AND DISPLAYS RESULTS.
    const reviewHandler = () => {
        setQuestions([])
        setIndex(0)
        setInReview(true)
    }

    // IF NO QUESTIONS HIDE THE BOTTOM EXAM-NAVIGATION
    const bottomBarClass = questions.length > 0 ? 'exam-bottom-bar' : 'exam-bottom-bar hidden'
    const reviewClass = inReview ? 'exam-review-container' : 'exam-review-container hidden'

  return (
    <div className="exam-container">
        {/* SEARCH FORM */}
            <div className="exam-search-container">
                <button onClick={getQuestions}>Get Questions</button>
            </div>
        


        {/* EXAM FORM -- SHOWS WHEN QUESTIONS ARE LOADED. */}
            <form id="exam" className={!questions ? 'hidden' : ''}>
                    <h3>{currentQuestion && currentQuestion.question}</h3>
                    {prompts.map((prompt) => {
                        return <ExamPrompts  
                                    key={prompt._id} 
                                    id={currentQuestion ? currentQuestion._id : ''}
                                    isAnswer={prompt.prompt.isAnswer}
                                    text={prompt.prompt.text}
                                    setAnswers={setAnswers}
                                    answers={answers}
                                    currentQuestion={currentQuestion}
                                    />
                        })}
                <div id="exam-bottom-bar" className={bottomBarClass}>
                    <span className="exam-nav" onClick={prevHandler}>Previous Question</span>
                { //SHOW SUBMIT BUTTON AT END OF TEST
                    index === questions.length-1 ?
                    <span className="exam-nav" onClick={reviewHandler}>Submit and Review</span> :
                    <span className="exam-nav" onClick={nextHandler}>Next Question</span>
                }
                </div>
            </form>

        {/* REVIEW EXAM */}
        {inReview && <ReviewExam answers={answers} exam={exam} />}
       
    </div>
  );
}

export default Exam;
