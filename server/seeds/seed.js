const db = require('../config/connection');
const { User, Pokemon, Quiz } = require('../models');

const pokemonData = require('./pokemonData.json');
const quizData = require('./quizData.json');
const userData = require('./userData.json')

db.once('open', async () => {
  await Pokemon.deleteMany({});
  await Quiz.deleteMany({});
  await User.deleteMany({})

  const pokemongos = await Pokemon.insertMany(pokemonData);
  const quizQuestions = await Quiz.insertMany(quizData);
  const users = await User.insertMany(userData);

  console.log('Database seeded!');
  process.exit(0);
});
