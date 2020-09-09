import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'


import './ContributeExam.css'

import AuthContext from '../../context/auth/authContext'
import AlertContext from '../../context/alert/alertContext'

const ContributeExam = () => {
    const authContext = useContext(AuthContext)
    const alertContext = useContext(AlertContext)

    const { user } = authContext
    const { setAlert } = alertContext

    const [exam, setExam] = useState('')
    const [category, setCategory] = useState('')
    const [question, setQuestion] = useState('')
    const [questionType, setQuestionType] = useState('')
    const [prompt1, setPrompt1] = useState('')
    const [prompt2, setPrompt2] = useState('')
    const [prompt3, setPrompt3] = useState('')
    const [prompt4, setPrompt4] = useState('')
    const [explaination, setExplaination] = useState('')
    const [answer, setAnswer] = useState('')
    const [prompts, setPrompts] = useState([])

    useEffect(() => {
        setPrompts([
            {prompt: {text: prompt1, isAnswer: (answer === prompt1)}},
            {prompt: {text: prompt2, isAnswer: (answer === prompt2)}},
            {prompt: {text: prompt3, isAnswer: (answer === prompt3)}},
            {prompt: {text: prompt4, isAnswer: (answer === prompt4)}}
        ])
    },[prompt1, prompt2, prompt3, prompt4, answer])

    const submitHandler = async (e) => {        
        e.preventDefault()
        try{
            await axios.post('http://localhost:5000/api/contribute/question', {
                exam,
                category,
                question,
                questionType,
                prompts,
                explainations: [{
                    contributedBy: user._id,
                    text: explaination,
                }],
                contributedBy: user._id,
            })
        } catch(err) {
            setAlert('error', 'An error occurred.  Question could not be submitted.')
            window.scrollTo(0,0)
            return
        }
        window.scrollTo(0,0)
        setQuestion('')
        setPrompt1('')
        setPrompt2('')
        setPrompt3('')
        setPrompt4('')
        setExplaination('')
        setAnswer('')
        setAlert('success', 'Question was submitted successfully!')
    }

    const changeHandler = (e) => {
        switch(e.target.name) {
            case ('exam'):
                setExam(e.target.value)
                break
            case ('category'):
                setCategory(e.target.value)
                break
            case ('question'):
                setQuestion(e.target.value)
                break
            case ('questionType'):
                setQuestionType(e.target.value)
                break
            case ('prompt1'):
                setPrompt1(e.target.value)
                break
            case ('prompt2'):
                setPrompt2(e.target.value)
                break
            case ('prompt3'):
                setPrompt3(e.target.value)
                break
            case ('prompt4'):
                setPrompt4(e.target.value)
                break
            case ('explaination'):
                setExplaination(e.target.value)
                break
            case ('answer'):
                setAnswer(e.target.value)
                break
            default:
                break
        }
    }

    return (
        <div className="contribute-exam-container">
            <div className="contribute-exam-form">
                <form>
                    <label htmlFor="exam" >Name of exam you are contributing to:
                        <input type="text" value={exam} name="exam" onChange={changeHandler} placeholder="Exam Name" />
                    </label>
                    <label htmlFor="category" >Which category does your question belong to:
                        <input type="text" value={category} name="category" onChange={changeHandler} placeholder="Category"/>
                    </label>
                    <label htmlFor="questionType" >What type of question will this be:
                        <input type="text" value={questionType} name="questionType" onChange={changeHandler} placeholder="Question Type"/>
                    </label>
                    <label htmlFor="question" >What question should be asked:
                        <input type="text" value={question} name="question" onChange={changeHandler} placeholder="Question"></input>
                    </label>
                    <label htmlFor="prompt1" >Prompt 1:
                        <input type="text" value={prompt1} name="prompt1" onChange={changeHandler} placeholder="Prompt1"/>
                    </label>
                    <label htmlFor="prompt2" >Prompt 2:
                        <input type="text" value={prompt2} name="prompt2" onChange={changeHandler} placeholder="Prompt2"/>
                    </label>
                    <label htmlFor="prompt3" >Prompt 3:
                        <input type="text" value={prompt3} name="prompt3" onChange={changeHandler} placeholder="Prompt3"/>
                    </label>
                    <label htmlFor="prompt4" >Prompt 4:
                        <input type="text" value={prompt4} name="prompt4" onChange={changeHandler} placeholder="Prompt4"/>
                        </label>
                    <label htmlFor="answer">What is the correct answer:
                        <select name="answer" id="answer" onChange={changeHandler}>
                            <option value="defaultValue">Please select the correct answer</option>
                            {prompt1 && <option value={prompt1}>{prompt1}</option>}
                            {prompt2 && <option value={prompt2}>{prompt2}</option>}
                            {prompt3 && <option value={prompt3}>{prompt3}</option>}
                            {prompt4 && <option value={prompt4}>{prompt4}</option>}
                        </select>
                    </label>
                    <label htmlFor="explaination" >Provide an explaination to help users understand the topic better:
                        <input type="text" value={explaination} name="explaination" onChange={changeHandler} placeholder="Explaination"/>
                        </label>
                    <button onClick={submitHandler}>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default ContributeExam;