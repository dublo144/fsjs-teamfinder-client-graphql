import { gql } from "@apollo/client";

const SIGN_IN = gql`
  query SignIn($userName: String!, $password: String!) {
    signIn(username: $userName, password: $password) {
      name
      userName
      role
      token
      tokenExpiration
    }
  }
`;

const SIGN_UP = gql`
  mutation SignUp($input: UserInput!) {
    signUp(UserInput: $input) {
      name
      userName
      role
      token
    }
  }
`;

const NEARBY_PLAYERS = gql`
  query Nearby($input: SearchInput!) {
    nearbyPlayers(input: $input) {
      userName
      position {
        longitude
        latitude
      }
    }
  }
`;

const NEARBY_GAME_AREAS = gql`
  query GameAreas($input: SearchInput!) {
    getGameAreasWithinRadius(input: $input) {
      name
      coordinates {
        longitude
        latitude
      }
    }
  }
`;

export const queries = {
  SIGN_IN,
  SIGN_UP,
  NEARBY_PLAYERS,
  NEARBY_GAME_AREAS,
};
