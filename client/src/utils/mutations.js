import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($authors: [String!], $description: String!, $bookId: String!, $image: String!, $title: String!) {
    saveBook(authors: $authors, description: $description, bookId: $bookId, image: $image, title: $title) {
      savedBooks{
        authors
        title
        description
      }
    }
  }
`

export const DELETE_BOOK = gql`
  mutation deleteBook($bookId: String!) {
    deleteBook(bookId: $bookId) {
      savedBooks{
        authors
        title
        description
      }
    }
  }
`