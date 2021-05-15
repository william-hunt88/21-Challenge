const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  input bookInput {
    authors: [String!]
    description: String!
    title: String!
    bookId: Int!
    image: String
    link: String
  }

  type Book {
    _id: ID
    bookId: Int!
    authors: [String!]
    title: String!
    description: String!
    image: String
    link: String
  }

  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Query {
    me: User
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    removeBook(bookId: Int!): User
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(
      authors: [String!]
      description: String!
      title: String!
      bookId: Int!
      image: String
      link: String
    ): User
  }
`;

// export the typeDefs
module.exports = typeDefs;
