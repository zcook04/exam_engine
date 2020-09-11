const Question = require ('../models/Exam')

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
    res.json(allExamTitles)
}

// PUBLIC ROUTE
// GET /API/EXAMS/:EXAM/:ID
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
            res.send(question[0])
        } else {
            res.send({})
        }
}

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
            res.send(finalQuestions)
        } else {
            res.send(allExamQuestions)
        }
}

module.exports = {getExamTitles, getExamQuestion, getExamQuestions}