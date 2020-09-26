const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
  exam: { type: String, required: true },
  category: { type: String, required: true },
  sidea: { type: String, required: true },
  sideb: { type: String, required: true },
  isPublished: { type: Boolean, required: true, default: false },
  rating: [],
  explainations: [
    {
      contributedBy: String,
      text: String,
      ratings: [Number],
      comments: [String],
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
  contributedBy: {
    type: String,
    required: true,
  },
});

const Flashcard = mongoose.model('Flashcard', flashcardSchema);

module.exports = Flashcard;
