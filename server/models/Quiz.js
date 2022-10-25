const { Schema, model } = require('mongoose');

const quizSchema = new Schema({
  question: {
    type: String,
    required: true,
    unique: true,
  },
  choices: [{
    type: Object,
    required: true
  }]
  // firePoints: {
  //   type: Number
  // },
  // grassPoints: {
  //   type: Number
  // },
  // waterPoints: {
  //   type: Number
  // }
});

const Quiz = model('Quiz', quizSchema);

module.exports = Quiz;
