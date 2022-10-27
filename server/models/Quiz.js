const { Schema, model } = require('mongoose');

const choiceSchema = new Schema ({
  answer: {
    type: String,
    // required: true,
  },
  pokemonType: {
    type: String,
    // required: true,
  },
});

const quizSchema = new Schema({
  question: {
    type: String,
    // required: true,
    unique: true,
  },
  choices: [choiceSchema],
  firePoints: {
    type: Number
  },
  grassPoints: {
    type: Number
  },
  waterPoints: {
    type: Number
  }
});

const Quiz = model('Quiz', quizSchema);

module.exports = Quiz;
