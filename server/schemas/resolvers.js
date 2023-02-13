const { User } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findById(context.user._id)
          .select("-__V -password")
          .populate("books");
        return userData;
      }
      throw new AuthenticationError("User not logged in!");
    },
  },
};

module.exports = resolvers;
