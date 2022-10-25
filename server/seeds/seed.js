const db = require('../config/connection');
const { User, Pokemon, Quiz } = require('../models');

const pokemonData = require('./pokemonData.json');
const quizData = require('./quizData.json');

db.once('open', async () => {
  await Pokemon.deleteMany({});
  await Quiz.deleteMany({});

  const pokemongos = await Pokemon.insertMany(pokemonData);
  const quizQuestions = await Quiz.insertmany(quizData);

  console.log('Database seeded!');
  process.exit(0);
});
