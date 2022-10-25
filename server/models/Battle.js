const { Schema, model } = require("mongoose");
const messageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  dateCreated: {
    type: Date,
    default: Date.now,
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
  messages: [messageSchema],
});

const Battle = model("Battle", battleSchema);

module.exports = Battle;
