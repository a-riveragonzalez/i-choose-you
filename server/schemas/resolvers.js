const { User, Quiz, Pokemon, Message, Battle } = require('../models');

// user, quiz, pokemon, messages, chatroom
const resolvers = {
  Query: {
    // find all users
    users: async () => {
      return await User.find({});
    },
    // find one user by ID
    user: async (parent, args) => {
      return await User.findById(args.id).populate('battles').populate("pokemon").populate("quiz");
    },
    // find all quiz questions
    quiz: async () => {
      return await Quiz.find({});
    },
    // find all Pokemon in database
    pokemon: async() => {
      return await Pokemon.find({});
    },
    // find battle by ID (user ids?)
    
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      return user;
    },
    
    // 
    // create new message
    // create new battle/chatroom


    // createMatchup: async (parent, args) => {
    //   const matchup = await Matchup.create(args);
    //   return matchup;
    // },
    // createVote: async (parent, { _id, techNum }) => {
    //   const vote = await Matchup.findOneAndUpdate(
    //     { _id },
    //     { $inc: { [`tech${techNum}_votes`]: 1 } },
    //     { new: true }
    //   );
    //   return vote;
    // },
  },
};

module.exports = resolvers;
