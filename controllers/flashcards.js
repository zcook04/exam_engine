// PUBLIC ROUTE
// GET /API/FLASHCARDS/
// RETURNS ARRAY OF FLASHCARD TITLES AS STRINGS
flashcardList = async (req, res, next) => {
    return res.status(200).json({"result": "success"})
}


module.exports = { flashcardList }