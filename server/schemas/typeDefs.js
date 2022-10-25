const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # ******************* Models ******************* # 
  type User {
    _id: ID!
    email: email
    username: String!
    quizResult: Quiz
    pokemon: Pokemon
    battle: [Battle]
  }

  type Battle {
    _id: ID!
    user1_id: String!
    user2_id: String!
    messages: [Message] 
  }

  type Message {
    _id: ID!
    user: String!
    dateCreated: String!
    messageContent: String!
  }

  type Quiz {
    _id: ID!
    question: String!
    choices: String!
    firePoints: Int
    grassPoints: Int
    waterPoints: Int
  }

  type Pokemon {
    _id: ID!
    pokemonName: String!
    pokemonType: String!
    pokemonImg: String!
  }

  # ******************* Schema ******************* # 

  type Query {
    users: [User]
    user: (_id: String): User
    battles: [Battle]
    quizzes: [Quiz]
    pokemongos: [Pokemon]
    battle(_id: String): Battle 
  }

  type Mutation {
    createUser(user1: String!, user2: String!): Battle
    createMessage(user1: String!, user2: String!): Battle
    createBattle(user1: String!, user2: String!): Battle 
  }
`;

module.exports = typeDefs;
