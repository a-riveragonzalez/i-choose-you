const { Schema, model } = require("mongoose");
const User = require("./User")

const messageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  messageContent: {
    type: String,
  },
});

const battleSchema = new Schema({
  user1_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  user2_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // user1_id: ,
  // user2_id: ,
  messages: [messageSchema],
});

const Battle = model("Battle", battleSchema);

module.exports = Battle;
