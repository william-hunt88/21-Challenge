import gql from "graphql-tag";

export const QUERY_ME = gql`
{
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        title
        authors
        bookId
        description
        image
        link
      }
    }
  }
`;
