const db = require('../config/connection');
const { User, Pokemon, Quiz, Battle } = require('../models');

const pokemonData = require('./pokemonData.json');
const quizData = require('./quizData.json');
const userData = require('./userData.json')
const battleData = require('./battleData.json')

db.once('open', async () => {
  await Pokemon.deleteMany({});
  await Quiz.deleteMany({});
  // await User.deleteMany({});
  // await Battle.deleteMany({})


  const pokemongos = await Pokemon.insertMany(pokemonData);
  const quizQuestions = await Quiz.insertMany(quizData);
  // const users = await User.insertMany(userData);
  // const battles = await Battle.insertMany(battleData);

  console.log('Database seeded!');
  process.exit(0);
});
