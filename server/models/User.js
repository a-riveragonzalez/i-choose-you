const { Schema, model } = require("mongoose");


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,        
    },
    password: {
        type: String,
        required: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    quizResult: {
        type: Schema.Types.ObjectId,
        ref: "Quiz"
    },
    pokemon: {
        type: Schema.Types.ObjectId,
        ref: "Pokemon"
    },
    battle:[{
        type: Schema.Types.ObjectId,
        ref: "Battle"
    }]

  });
  
  const User = model('User', userSchema);
  
  module.exports = User;