const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');


const resolvers = {
  Query: {
    getUsers: async () => {
      return User.find();
    },

    getSingleUser: async (parent, { userId }) => {
      return User.findOne({ _id: userId })
    },
    me: async (parent, args, context) => {
      if (context.user) {
        console.log(context.user)
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const newProfile = await User.create({ username, email, password });
      const token = signToken(newProfile)
      return { token, newProfile }
    },

    login: async (parent, { email, password }) => {
      const profile = await User.findOne({ email });

      if (!profile) {

        throw new AuthenticationError('No profile with this email found!');
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(profile);
      return { token, profile };
    },

    saveBook: async (parent, { authors, description, bookId, image, title }) => {
      const newBook = await Book.create({ authors, description, bookId, image, title });
      const addBook = await User.findOneAndUpdate({ _id: context.user._id }, { $addToSet: { savedBooks: newBook } }, { new: true });
    }
  }
}
module.exports = resolvers;
