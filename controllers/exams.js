const Question = require ('../models/Exam')
const shuffleArray = require('../utils/utils')

// PUBLIC ROUTE
// GET /API/EXAMS/
// RETURNS ARRAY OF EXAM TITLES AS STRINGS
getExamTitles = async (req, res, next) => {
    let allExamTitles = []
    
    try{
        exams = await Question.find()
        //GETS EXAM TITLES
        exams.forEach(exam => {
            if(!allExamTitles.includes(exam.exam)) {
                allExamTitles.push(exam.exam)
            }
        })
    } catch (err) {
        console.log(err)
    }
    return res.json(allExamTitles)
}

// PUBLIC ROUTE
// GET /API/EXAMS/:EXAM/ID/:ID
// RETURNS QUESTION OBJECT IF QUESTION EXISTS
getExamQuestion = async (req, res, next) => {
    const id = req.params.id
    let question
    try {
        await Question.find({_id: id}, (err, result) =>{
            if(err){
                console.log(err)
                return
            }
            question = result
            
        })} catch(err) {
            console.log('TryCaught:' +err)
        }
        if(typeof(question[0]) !== undefined && question[0]){
            return res.send(question[0])
        } else {
            return res.send({})
        }
}

// PUBLIC ROUTE
// GET /API/EXAMS/:EXAM
// RETURNS SHUFFLED ARRAY OF QUESTION OBJECTS FOR SPECIFIED EXAM
getExamQuestions = async (req, res, next) => {
        //PULL EXAM, CATEGORIES AND QUANTITY FROM URL
        const exam = req.params.exam.toUpperCase()
        const categories = Object.entries(req.query)
        //GET ALL QUESTIONS FOR THE SPECIFIED EXAM
        let allExamQuestions = []
        try {
            await Question.find({"exam": exam}, (err, result) =>{
                
                if(err){
                    console.log(err)
                    return
                }
                allExamQuestions = result
                
            })} catch(err) {
                console.log('TryCaught:' +err)
            }
    
        //FILTER QUESTIONS BASED ON CATEGORY
        const filterQuestions = async (questions, categories) => {
            let filteredQuestions = categories.map(category => {
                let q = questions.filter(question => question.category === category[0].toUpperCase())
                if((q.length !==0) && (q.length<category[1])) {
                    shuffleArray(q)
                    return q
                } else if (q.length > category[1]) {
                    let shuffled = shuffleArray(q)
                    while (shuffled.length > category[1]) {
                        shuffled.pop()
                    }
                    return shuffled
                } else {
                    return null
                }
            })
            return filteredQuestions.filter(question => !undefined || !null)
        }
    
        if(categories.length >= 1) {
            const filteredQuestions = await filterQuestions(allExamQuestions, categories)
            const finalQuestions = shuffleArray(filteredQuestions.flat())
            return res.send(finalQuestions)
        } else {
            return res.send(allExamQuestions)
        }
}

getExamCategories = async (req, res) => {
    const { exam } = req.params
    try {
        let allQuestions = await Question.find({"exam": exam.toUpperCase()}) 
        const categoryPlaceholder = []
        const categories = []

        allQuestions.forEach(question => {
            if(categoryPlaceholder.indexOf(question.category) === -1 ){
                let count = 0
                allQuestions.forEach(innerQuestion => {
                    if(innerQuestion.category === question.category)
                    count++
                })
                categoryPlaceholder.push(question.category)
                categories.push({name: question.category, count })
            }
        })
        if(categories.length > 0)
            return res.status(200).json(categories)
    }catch(err) {
        console.log('TryCaught:' +err)
        return res.status(500).json({success: false, msg: `An interal error occured: ${err}`})
    }
    return res.status(404).json({success: false, msg: `No Categories Exist for exam: ${exam.toUpperCase()}`})
}


module.exports = {getExamTitles, getExamQuestion, getExamQuestions, getExamCategories}