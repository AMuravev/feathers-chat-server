const { authenticate } = require('@feathersjs/authentication').hooks;

const processMessage = require('../../hooks/process-message');
const populateUser = require('../../hooks/populate-user');
const updateMessage = require('../../hooks/modify-message');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [processMessage()],
    update: [],
    patch: [updateMessage()],
    remove: []
  },

  after: {
    all: [populateUser()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
