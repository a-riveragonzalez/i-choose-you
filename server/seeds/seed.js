const db = require('../config/connection');
const { Tech } = require('../models');

const pokemonData = require('./pokemonData.json');

db.once('open', async () => {
  await Tech.deleteMany({});

  const technologies = await Tech.insertMany(techData);

  console.log('Technologies seeded!');
  process.exit(0);
});
