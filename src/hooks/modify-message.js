module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { app, method, params, data } = context;

    // The logged in user
    const { user } = context.params;

    const getMessage = async () => {
      return await app.service('messages').get(context.id, params);
    };

    const message = await getMessage();

    if (data.action && data.action === 'rename') {

      if (message.userId !== user._id) {
        throw new Error('You are not the owner of this message');
      }

      context.data.text = data.text;

      return context;

    }

    const addOrRemove = (arr, item) => arr.includes(item) ? arr.filter(i => i !== item) : [ ...arr, item ];

    let likes = [];

    if (message.likes.length) {
      likes = addOrRemove(message.likes, user._id);
    } else {
      likes.push(user._id);
    }

    context.data.likes = likes;

    // context.data = {
    //   text: message.text,
    //   // Set the user id
    //   roomId: message.roomId,
    //   userId: message.userId,
    //   likes: likes,
    //   // Add the current date
    //   createdAt: message.createdAt
    // };

    return context;

  };
};
