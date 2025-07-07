import { gql } from '@apollo/client';

// Define the login mutation using gql.
// Use variables ($username, $password) to pass data securely.
export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(loginInput: { username: $username, password: $password }) {
      token
      error
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation Signup($username: String!, $password: String!,$role:String!) {
    signup(signupInput: { username: $username, password: $password ,role: $role }) {
      username
      role
      status
    }
  }
`;