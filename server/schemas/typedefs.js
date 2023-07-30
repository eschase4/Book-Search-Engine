const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        savedBooks: [Book]
    }

    type Book {
        _id: ID
        authors: [String]
        description: String
        bookId: String
        image: String
        title: String
    }

    type Auth {
        token: ID!
        user: User
      }

    type Query {
        savedBooks: [Book]
        users: [User]
        getSingleUser(userID: ID!): User
        me: User
        getUsers: [User]
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        login(username: String!, password: String!): Auth
        saveBook(authors: [String!], description: String!, bookId: String!, image: String!, title: String!): User
        deleteBook(bookId: String!): User
    }
`;

module.exports = typeDefs;