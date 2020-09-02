import React, {useState} from 'react';
import axios from 'axios'

import ExamPrompt from "./ExamPrompt"

import "./Exam.css"

//Recieve an Array of question-objs and store in state. //Update answered correctly attribute on Submit/Next
//If view answer was selected before answer submitted.  Set obj-attribute to always mark question as wrong answer.

//Create an Index State to hold the value of the current question.

//Pull Question prompts from current question

const Exam = () => {

    const questions = [{
                    exam: 'CCNA',
                    category: 'Switching',
                    question: 'What is a broadcast address used for?',
                    questionType: "Radio",
                    isPublished: true,
                    prompt1: {
                        text: 'To route packets',
                        value: 1
                    },
                    prompt2: {
                        text: 'To reply to an arp',
                        value: 2
                    },
                    prompt3: {
                        text: 'To broadcast a message to all devices on a given subnet',
                        value: 3
                    },
                    prompt4: {
                        text: 'To tell people where the broadcast is',
                        value: 4
                    },
                    answers: [false, false, true, false],
                    rating: [{user: 'user1', rating: 4}, {user: 'user2', rating: 5}],
                    contributedBy: 'Zack',
                    explainations: [{ 
                        id: '123',
                        questionId: 'Id of Q',
                        userId: 'Zack',
                        text: 'Broadcasts sent to the broadcasat address of a subnet to send packets to all available hosts on that network.',
                        ratings:  [2,4,5],
                        comments: ['Great Question!', 'Ugg...This makes no sense!']
                    }],
                    date: new Date()
                },
                    {
                        exam: 'CCNA',
                        category: 'Switching',
                        question: 'What is a broadcast address used for?',
                        questionType: "Radio",
                        isPublished: true,
                        prompt1: {
                            text: 'To route packets',
                            value: 1
                        },
                        prompt2: {
                            text: 'To reply to an arp',
                            value: 2
                        },
                        prompt3: {
                            text: 'To broadcast a message to all devices on a given subnet',
                            value: 3
                        },
                        prompt4: {
                            text: 'To tell people where the broadcast is',
                            value: 4
                        },
                        answers: [3],
                        rating: [{user: 'user1', rating: 4}, {user: 'user2', rating: 5}],
                        contributedBy: 'Zack',
                        explainations: [{ 
                            id: '123',
                            questionId: 'Id of Q',
                            userId: 'Zack',
                            text: 'Broadcasts sent to the broadcasat address of a subnet to send packets to all available hosts on that network.',
                            ratings:  [2,4,5],
                            comments: ['Great Question!', 'Ugg...This makes no sense!']
                        }],
                        date: new Date()
                }]
    
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
    const [currentQuestion, setCurrentQuestion] = useState(questions[index])
    const [selectedAnswer, setSelectedAnswer] = useState('')

    const prompts = getPrompts(currentQuestion)

  return (
    <div className="exam-container">
        <form>
            {prompts.map(prompt => {
                return <ExamPrompt key={prompt.value} value={prompt.value} selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer} prompt={prompt.text} />
            })}
        </form>
    </div>
  );
}

export default Exam;
