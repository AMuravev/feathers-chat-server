const { authenticate } = require('@feathersjs/authentication').hooks;

const processRoom = require('../../hooks/process-room');
const modifyRoom = require('../../hooks/modify-room');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [processRoom()],
    update: [modifyRoom()],
    patch: [],
    remove: [modifyRoom()]
  },

  after: {
    all: [],
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
