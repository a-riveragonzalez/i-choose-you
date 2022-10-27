const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # ******************* Models ******************* # 
  type User {
    _id: ID!
    email: String!
    username: String!
    password: String!
    quizResult: Quiz
    pokemon: Pokemon
    battle: [Battle]
  }

  type Battle {
    _id: ID!
    user1_id: User
    user2_id: User
    messages: [Message] 
  }

  type Message {
    _id: ID!
    user: User
    dateCreated: String
    messageContent: String!
  }

  type Quiz {
    _id: ID!
    question: String!
    choices: [Choice] 
    firePoints: Int
    grassPoints: Int
    waterPoints: Int
  }

  type Choice {
    answer: String!
    pokemonType: String!
  }

  type Pokemon {
    _id: ID!
    pokemonName: String!
    pokemonType: String!
    pokemonImg: String!
  }

  type Auth{
    token: ID!
    user: User
  }

  # ******************* Schema ******************* # 

  type Query {
    users: [User]
    user: User
    battles: [Battle]
    battle(_id: String): Battle 
    quizzes: [Quiz]
    pokemongos: [Pokemon]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth

    createMessage(battleId: String!, messageContent: String!): Battle

    createBattle(user1_id: String!, user2_id: String!): Battle 

    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
