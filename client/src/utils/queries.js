import { gql } from '@apollo/client';

// export const GET_SINGLE_USER = gql`
//     query getSingle
// `

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`

export const QUERY_GET_USER = gql`
query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;