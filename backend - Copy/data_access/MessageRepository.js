const Repository = require("./repository");
const { mongoErrors, decorateError } = require("../error_handling/errors");
const APIFeatures = require("./apiFeatures");
const ObjectId = require("mongodb").ObjectId;

class ChatRepository extends Repository {
  constructor({ Message }) {
    super(Message);
  }

 async addMessage(message,role) {
     try {
        
         const messageObject = {
             role: role,
             text: message
         };
         const doc = await this.model.create(messageObject);

      
      if (!doc) return { success: false, error: mongoErrors.UNKOWN };

      return { success: true, doc: doc };
      
    } catch (err) {
        return { success: false, ...decorateError(err) };
    }
  }


}

module.exports = ChatRepository;
