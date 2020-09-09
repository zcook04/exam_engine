import React, { useState, useEffect } from 'react';

import './ContributeExam.css'

const ContributeExam = () => {
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
            prompt1,
            prompt2,
            prompt3,
            prompt4
        ])
    },[prompt1, prompt2, prompt3, prompt4])

    const submitHandler = (e) => {
        e.preventDefault()
        

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
        console.log(e.target.value)
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
                        <select name="answer" id="answer" value={answer} onChange={changeHandler}>
                            {prompts && prompts.map(currentPrompt => {
                                return <option value={currentPrompt}>{currentPrompt}</option>
                            })}
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