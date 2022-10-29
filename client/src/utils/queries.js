import { gql } from "@apollo/client";

// getting users for matches
export const QUERY_USERS = gql`
  query getUsers {
    users {
      _id
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
    user {
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

// getting a single battle data
export const QUERY_BATTLE = gql`
  query getBattle($id: String) {
    battle(_id: $id) {
      _id
      user1_id {
        username
        # pokemon {
        #   pokemonImg
        # }
        _id
      }
      user2_id {
        username
        # pokemon {
        #   pokemonImg
        # }
        _id
      }
      messages {
        _id
        dateCreated
        messageContent
        user {
          _id
          username
        }
      }
    }
  }
`;

// getting all pokemon data
export const QUERY_POKEMONGOS = gql`
  query getPokemongos {
    pokemongos {
      pokemonName
      pokemonType
      pokemonImg
    }
  }
`;

// getting all battle data
export const QUERY_BATTLES = gql`
  query getBattles {
  battles {
    _id
    user1_id {
      _id
      username
    }
    user2_id {
      _id
      username
    }
  }
}
`;