import { gql } from "@apollo/client";

// getting users for matches
export const QUERY_USERS = gql`
  query getUsers {
    users {
      pokemon {
        pokemonName
        pokemonType
        pokemonImg
      }
      username
    }
  }
`;

// getting for user dashboard and profile
export const QUERY_USER = gql`
  query getUser {
    user(_id: $id) {
      username
      quizResult {
        firePoints
        grassPoints
        waterPoints
      }
      pokemon {
        pokemonName
        pokemonType
        pokemonImg
      }
      battle {
        _id
      }
    }
  }
`;

// getting quiz data
export const QUERY_QUIZ = gql`
  query getQuizzes {
    quizzes {
      _id
      question
      choices {
        answer
        pokemonType
      }
    }
  }
`;

// getting battle data
export const QUERY_BATTLE = gql`
  query getBattle {
    battle(_id: $id) {
      user1_id
      user2_id
      messages {
        user
        dateCreated
        messageContent
      }
    }
  }
`;

// getting pokemon data
export const QUERY_POKEMONGOS = gql`
  query getPokemongos {
    pokemongos {
      pokemonName
      pokemonType
      pokemonImg
    }
  }
`;
