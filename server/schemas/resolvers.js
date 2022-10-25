const { User, Quiz, Pokemon, Battle } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

// user, quiz, pokemon, messages, chatroom
const resolvers = {
  Query: {
    // find all users
    users: async () => {
      return await User.find({});
    },
    // find one user by ID
    user: async (parent, args) => {
      return await User.findById(args.id)
        .populate("battle")
        .populate("pokemon")
        .populate("quizResult");
    },
    // find all quiz questions
    quizzes: async () => {
      return await Quiz.find({});
    },
    // find all Pokemon in database
    pokemongos: async () => {
      return await Pokemon.find({});
    },
    // find battle by ID (populate user ids and messages)
    battle: async (parent, args) => {
      return await Battle.findById(args.id)
        .populate("user1_id")
        .populate("user2_id")
        .populate("messages");
    },
    // find all battles
    battles: async () => {
      return await Battle.find({});
    },
  },

  Mutation: {
    // create user
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    // log in to user account
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect username");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password");
      }

      const token = signToken(user);
      return { token, user };
    },
    // create new message
    createMessage: async (parent, { battleId, messageContent }, context) => {
      if (context.user) {
        console.log(context.user);
        const updatedBattle = await Battle.findOneAndUpdate(
          { _id: battleId },
          {
            $addToSet: {
              messages: { messageContent, user: context.user._id },
            },
          },
          { new: true, runValidators: true }
        ).populate("messages");

        return updatedBattle;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // create new battle/chatroom between two users
    createBattle: async (parent, args) => {
      const battle = await Battle.create(args);
      return battle;
    },
  },
};

module.exports = resolvers;

/*
{
        "_id": "635863027cd585ee119724ed",
        "email": "garyoak@oak.com",
        "username": "garyoak",
        "password": "$2b$10$8m.clWSGkMrOcuU3umqNgOSRDjB2wXVMbAT4C/g.H4EfNAIsF.v9W"
      }

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiZ2FyeW9hayIsImVtYWlsIjoiZ2FyeW9ha0BvYWsuY29tIiwiX2lkIjoiNjM1ODYzMDI3Y2Q1ODVlZTExOTcyNGVkIn0sImlhdCI6MTY2NjczODAxNiwiZXhwIjoxNjczOTM4MDE2fQ.NeB17Nk00aYj5HaZ-cPjyvcCXVTa0xsmcHIXhb4Ml7A
      
      635863a51088ee929c0492a6
      */
