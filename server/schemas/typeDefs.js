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
    user1_id: String!
    user2_id: String!
    messages: [Message] 
  }

  type Message {
    _id: ID!
    user: String!
    dateCreated: String
    messageContent: String!
  }

  type Quiz {
    _id: ID!
    question: String!
    choices: [String]!
    # firePoints: Int
    # grassPoints: Int
    # waterPoints: Int
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
    user(_id: String): User
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
