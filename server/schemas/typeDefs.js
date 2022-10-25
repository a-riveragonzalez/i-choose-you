const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # type Tech {
  #   _id: ID!
  #   name: String!
  # }

  # type Matchup {
  #   _id: ID!
  #   tech1: String!
  #   tech2: String!
  #   tech1_votes: Int
  #   tech2_votes: Int
  # }

  # ******************* do we reference schema only? ******************* # 

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
    messages: [messageSchema] #is this Messages?
  }

  type Quiz {
    _id: ID!
    question: String!
    choices: String!
    firePoints: Int
    grassPoints: Int
    waterPoints: Int
  }

  

  # ******************* Schema ******************* # 

  type Query {
    tech: [Tech]
    matchups(_id: String): [Matchup]
  }

  type Mutation {
    createMatchup(tech1: String!, tech2: String!): Matchup
    createVote(_id: String!, techNum: Int!): Matchup
  }
`;

module.exports = typeDefs;
