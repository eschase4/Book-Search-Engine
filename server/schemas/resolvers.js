const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    getSingleUser: async (parent, { userId }) => {
      return User.findOne({_id: userId})
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    createUser: async (parent, {username, email, password}) => {
      const newProfile = await User.create({username, email, password});
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
  }
}
module.exports = resolvers;
