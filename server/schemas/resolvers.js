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
    user: async (parent, args, context) => {
      
      const userData = await User.findById(context.user._id)
        .populate("battle")
        .populate("pokemon")
        .populate("quizResult");
        console.log(userData)
        console.log(context)

        return userData
    },
    // find all quiz questions
    quizzes: async () => {
      return await Quiz.find({}).populate("choices");
    },
    // find all Pokemon in database
    pokemongos: async () => {
      return await Pokemon.find({});
    },
    // find battle by ID (populate user ids and messages)
    battle: async (parent, args) => {
      const battleData = await Battle.findById(args._id)
        .populate({ path: "messages", populate: "user" })
        .populate("user1_id")
        .populate("user2_id");

      // console.log(battleData);
      return battleData;
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
      // console.log("before creation")

      if (context.user) {
        const updatedBattle = await Battle.findOneAndUpdate(
          { _id: battleId },
          {
            $addToSet: {
              messages: { messageContent, user: context.user._id },
            },
          },
          { new: true, runValidators: true }
        ).populate({path:"messages", populate: "user"}).populate('user1_id').populate('user2_id');
          // console.log(updatedBattle)
        return updatedBattle;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // create new battle/chatroom between two users
    createBattle: async (parent, {user2_id}, context) => {
      // const battle = await Battle.create(args);
      // return battle;
      console.log("i am in the createBattle")
      if (context.user) {
        const battle = await Battle.create({user1_id: context.user._id, user2_id: user2_id});
        return battle;
      }
      throw new AuthenticationError("You need to be logged in!");
      console.log("I am outside createBattle")
    },
    // update the logged in user with their quiz result Pokemon type
    updateUserType: async (parent, { pokemonType }, context) => {
      if (context.user) {
        // console.log(context.user._id);
        // console.log(pokemonType);
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {pokemonType},
          { new: true}
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
