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

   async findChatWithTopMsgs(chatId) {
     try {
       console.log("uuuuuuuuuuuuuuuuuuuu");
       console.log(chatId);
       const doc = await this.model
          .findOne({ _id: ObjectId(chatId) },
                  { title: 1, user: 1, createdAt: 1, messages: { $slice: -10 } })
          .populate({ path: 'messages', options: { sort: { createdAt: 1 } } });
//       const doc = await this.model.aggregate([
//          {
//            $match: {
//              _id: ObjectId(chatId)
//            }
//          },
//          {
//            $project: {
//               _id: 1,
//                 title: 1,
//                 user: 1,
//                 createdAt:1,
//                 messages: {
//                   $slice: ["$messages", -10 ]  
//                 }
//             }   
//          },
//          {
//    $lookup:
//      {
//        from: "Message",
//        localField: "messages",
//        foreignField: "_id",
//        as: "messages"
//      }
// },
//   {
//     $group: {
//       _id: "$_id",
//       title: { $first: "$title" },
//       user: { $first: "$user" },
//       createdAt: { $first: "$createdAt" },
//       messages: { $push: "$messages" }
//     }
//   }
  
//        ]);
      //  console.log("iiiiiiiiiiiiiiiiiiiiiiii");
      //  console.log(doc);  
      //  console.log("ooooooooooooooooooooooooooo");
      //  console.log(doc[0].messages);
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
