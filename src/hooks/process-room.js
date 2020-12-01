module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data } = context;

    // Throw an error if we didn't get a text
    if(!data.name) {
      throw new Error('A room must have a name');
    }

    // The logged in user
    const { user } = context.params;
    // The actual room text
    // Make sure that rooms are no longer than 400 characters
    const name = context.data.name.substring(0, 400);

    // Update the original data (so that people can't submit additional stuff)
    context.data = {
      name,
      // Set the user id
      userID: user._id,
      // Add the current date
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };

    return context;
  };
};
