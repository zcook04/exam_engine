const mongoose = require('mongoose');

const examsCollectionSchema = new mongoose.Schema({
  exam: { type: String, required: true },
  categories: {
      type: [String],
      required: true
  }
})

const ExamsCollection = mongoose.model('ExamsCollection', examsCollectionSchema);

module.exports = ExamsCollection;
