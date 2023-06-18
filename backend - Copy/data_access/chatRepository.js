const Repository = require("./repository");
const { mongoErrors, decorateError } = require("../error_handling/errors");
const APIFeatures = require("./apiFeatures");
const ObjectId = require("mongodb").ObjectId;

class ChatRepository extends Repository {
  constructor({ Chat }) {
    super(Chat);
  }

 async addChat(messageId,userId) {
     try {
        
         const chatObj = {
             user : userId,
             messages: [messageId]
         };
         const doc = await this.model.create(chatObj);

      
      if (!doc) return { success: false, error: mongoErrors.UNKOWN };

      return { success: true, doc: doc };
      
    } catch (err) {
        return { success: false, ...decorateError(err) };
    }
  }

   async appendToChat(messageId,chatId) {
     try {
        
       await this.model.findByIdAndUpdate(chatId, {
         $push: { messages: messageId }
       });
       
      //    const chatObj = {
      //        user : userId,
      //        messages: [messageId]
      //    };
      //    const doc = await this.model.create(chatObj);

      
      // if (!doc) return { success: false, error: mongoErrors.UNKOWN };

      // return { success: true, doc: doc };
      
    } catch (err) {
        return { success: false, ...decorateError(err) };
    }
  }

  async getAllConversation(userId) {
    try {
     
      let doc = await this.model.find({ "user": userId }).select({_id: false, id: '$_id' ,title:1, createdAt:1});
      // console.log(doc[0].owner);
      if (!doc) return { success: false, error: mongoErrors.NOT_FOUND };
      return { success: true, doc: doc };
    } catch (err) {
      return { success: false, ...decorateError(err) };
    }
  }
   async findChatWithTopMsgs(chatId) {
     try {
       console.log("uuuuuuuuuuuuuuuuuuuu");
       console.log(chatId);
       const doc = await this.model
          .findOne({ _id: ObjectId(chatId) },
                  { title: 1, user: 1, createdAt: 1, messages: { $slice: -10 } })
          .populate({ path: 'messages', options: { sort: { createdAt: 1 } } });

       if (doc) {
         return { success: true, doc: doc };
       }
       return { success: false, error: mongoErrors.UNKOWN };
    }   
     catch (err) {
       console.log(err);
        return { success: false, ...decorateError(err) };
    }
  }


}

module.exports = ChatRepository;
