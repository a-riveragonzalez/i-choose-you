import { gql } from "@apollo/client";

export const CREATE_MESSAGE = gql`
  mutation createMessage($battleId: String!, $messageContent: String!) {
    createMessage(battleId: $battleId, messageContent: $messageContent) {
      user1_id {
        username
      }
      user2_id {
        username
      }
      messages {
        user {
          username
        }
        dateCreated
        messageContent
      }
    }
  }
`;

export const CREATE_BATTLE = gql`
  mutation createBattle($user2Id: String!) {
  createBattle(user2_id: $user2Id) {
    _id
  }
} 
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        username
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
      }
    }
  }
`;

export const UPDATE_USER_TYPE = gql`
  mutation UPDATE_USER_TYPE($pokemonType: String!) {
    updateUserType(pokemonType: $pokemonType) {
      username
      quizResult
      email
    }
  }
`;
