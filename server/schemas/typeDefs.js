const { gql } = require("apollo-server-express");
const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

// create our typeDefs
const typeDefs = gql`
  type Query {
    helloWorld: String
    me: String
  }

  type Mutation {
    login(email: String!, password: String!): User
    addUser(username: String!, email: String!, password: String!): User
  }
`;

// export the typeDefs
module.exports = typeDefs;
