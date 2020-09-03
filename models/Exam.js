const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema ({
    exam: { type: String, required: true },
    category: { type: String, required: true },
    question: {type: String, required: true},
    questionType: {type: String, required: true},
    isPublished: {type: Boolean, required: true, default: false},
    prompts: {
        prompt1: { 
            text: {
                type: String, required: true
            },
            value: {
                type: Number, required: true
            },
            isAnswer: {
                type: Boolean, required: true
            }},
        prompt2: { 
            text: {
                type: String, required: true
            },
            value: {
                type: Number, required: true
            },
            isAnswer: {
                type: Boolean, required: true
            }},
        prompt3: { 
            text: {
                type: String, required: true
            },
            value: {
                type: Number, required: true
            },
            isAnswer: {
                type: Boolean, required: true
            }},
        prompt4: { 
            text: {
                type: String, required: true
            },
            value: {
                type: Number, required: true
            },
            isAnswer: {
                type: Boolean, required: true
            }}
    },
    rating: [],
    explainations: [{ 
        id: String,
        questionId: String,
        userId: String,
        text: String,
        ratings:  [Number],
        comments: [String]
    }],
    date: {
        type: Date,
        default: Date.now()
    }
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question