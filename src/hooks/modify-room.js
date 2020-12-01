module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { app, method, params, data } = context;

    // The logged in user
    const { user } = context.params;

    const getRoom = async () => {
      return await app.service('rooms').get(context.id, params);
    };

    const room = await getRoom();

    if (user._id !== room.userID) {
      throw new Error('You are not the owner of this room');
    }

    if (method === 'remove') {
      return context;
    }

    // Throw an error if we didn't get a text
    if(!data.name) {
      throw new Error('A room must have a name');
    }

    // The actual room text
    // Make sure that rooms are no longer than 400 characters
    const name = context.data.name.substring(0, 400);

    // Update the original data (so that people can't submit additional stuff)
    context.data = {
      name,
      // Set the user id
      userID: user._id,
      // Add the current date
      createdAt: room.createdAt,
      updatedAt: new Date().getTime(),
    };

    return context;
  };
};
