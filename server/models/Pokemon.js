const { Schema, model } = require("mongoose");

const pokemonSchema = new Schema({
    pokemonName: {
        type: String,
        required: true
    },
    pokemonType: {
        type: String,
        required: true
    },
    pokemonImg: {
        type: String,
        required: true
    },
  });

const Pokemon = model('Pokemon', pokemonSchema);

module.exports = Pokemon