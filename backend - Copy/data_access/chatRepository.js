const Repository = require("./repository");
const { mongoErrors, decorateError } = require("../error_handling/errors");
const APIFeatures = require("./apiFeatures");
const ObjectId = require("mongodb").ObjectId;

class ChatRepository extends Repository {
  constructor({ Chat }) {
    super(Chat);
  }
}

module.exports = ChatRepository;
