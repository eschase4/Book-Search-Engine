import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      savedBooks {
        bookId
        authors
        description
        image
        title
      }
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