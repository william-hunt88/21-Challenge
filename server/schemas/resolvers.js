const { User, bookSchema } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (
      parent,
      { authors, description, title, bookId, image, link },
      context
    ) => {

      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $push: {
              savedBooks: {
                authors: authors,
                description: description,
                title: title,
                bookId: bookId,
                link: link,
                image: image
              },
            },
          },
          { new: true, runValidators: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    removeBook: async (
      parent,
      { bookId },
      context
    ) => {

      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: {
              savedBooks: {
                bookId: bookId
              },
            },
          },
          { new: true, runValidators: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    // saveBook: async (parent, args, context) => {
    //   console.log(args);
    //   if (context.user) {
    //     // const book = await bookSchema.create({
    //     //   ...args,
    //     //   username: context.user.username,
    //     // });
    //     const book = {
    //       authors: args.authors,
    //       description: args.description,
    //       title: args.title,
    //       bookId: args.bookId,
    //     };

    //     await User.findByIdAndUpdate(
    //       { _id: context.user._id },
    //       { $push: { savedBooks: {book} } },
    //       { new: true }
    //     );

    //     return book;
    //   }

    //   throw new AuthenticationError("You need to be logged in!");
    // },
  },
};

module.exports = resolvers;
