const { Schema, model } = require("mongoose");
const messageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User" 
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  messageContent: {
    type: String,
  },
});

const battleSchema = new Schema({
  user1: {
    type: String,
    required: true,
  },
  user2: {
    type: String,
    required: true,
  },
  messages: [messageSchema],
});

const Battle = model("Battle", battleSchema);

module.exports = Battle;
