// const { Dir } = require("fs");
const {
  chatErrors
} = require("../error_handling/errors");

class ChatController {
  constructor({ ChatService }) {
    this.chatService = ChatService;
  }

 getTitleFromText = async (req, res) => {
          console.log("heeeeeeeeeeeeeeeeeeee");

   try {
     if (!req.query.message) {
         return res.status(400).json({
          status: "fail",
          message:"Bad Request"
        });
      }
      console.log("heeeeeeeeeeeeeeeeeeee");
      const response = await this.chatService.getTitleFromText(req.query.message);
      if (!response.success) {
      
        return res.status(500).json({
          status: "fail",
          message: " Internal server error"
        });
      }
      return res.status(200).json({
        status: "OK",
        data: response.data
      });
    }catch (err) {
      return res.status(500).json({
         status: "fail",
         message:"Internal Server Error"
      });
    }
  }
  startConversation = async (req, res) => {
    try {
      if (!req.body || !req.body.question||!req.body.title||!req.user._id) {
        return res.status(400).json({
          status: "fail",
          message:"Bad Request"
        });
        // return;
      }
      const message = req.body.question;
      const response = await this.chatService.startConversation(message,req.body.title,req.user._id);
           console.log(response);

      if (!response.success) {
        let msg, stat;
        switch (response.error) {
          case chatErrors.NO_VALID_RESPONSE:
            msg = "No response found";
            stat = 404;
            break;
          case chatErrors.MONGO_ERR:
            msg = " Internal server error";
            stat = 500;
            break;
        }
        return res.status(stat).json({
          status: "fail",
          message:msg
        });
      }
      return res.status(200).json({
        status: "OK",
        data: response.data
      });
    }catch (err) {
       return res.status(500).json({
         status: "fail",
         message:"Internal Server Error"
      });
    }
  }


  continueConversation = async (req, res) => {
    try {
      if (!req.body || !req.body.question||!req.user._id) {
        return res.status(400).json({
          status: "fail",
          message:"Bad Request"
        });
        // return;
      }
      const message = req.body.question;
      const response = await this.chatService.continueConversation(message,req.user._id,req.params.conversationId);
      if (!response.success) {
        let msg, stat;
        switch (response.error) {
          case chatErrors.CONVERSATION_NOT_FOUND:
            msg = "The given conversation does not exist";
            stat = 404;
            break;
          case chatErrors.NO_VALID_RESPONSE:
            msg = "No response found";
            stat = 404;
            break;
          case chatErrors.NOT_OWNER:
            msg = "The user is not the conversation owner ";
            stat = 401;
            break;
          case chatErrors.MONGO_ERR:
            msg = " Internal server error";
            stat = 500;
            break;
        }
        return res.status(stat).json({
          status: "fail",
          message: msg
        });
      }
      return res.status(200).json({
        status: "OK",
        data: response.data
      });
    }catch (err) {
      return res.status(500).json({
         status: "fail",
         message:"Internal Server Error"
      });
    }
  }

 
 getConversation = async (req, res) => {
    try {
      if (!req.body ||!req.user._id) {
        return res.status(400).json({
          status: "fail",
          message:"Bad Request"
        });
        // return;
      }
      const response = await this.chatService.getConversation(req.user._id,req.params.conversationId);
      if (!response.success) {
        let msg, stat;
        switch (response.error) {
          case chatErrors.CONVERSATION_NOT_FOUND:
            msg = "The given conversation does not exist";
            stat = 404;
            break;
          case chatErrors.NOT_OWNER:
            msg = "The user is not the conversation owner ";
            stat = 401;
            break;
          case chatErrors.MONGO_ERR:
            msg = " Internal server error";
            stat = 500;
            break;
        }
        return res.status(stat).json({
          status: "fail",
          message: msg
        });
      }
      return res.status(200).json({
        status: "OK",
        data: response.data
      });
    }catch (err) {
      return res.status(500).json({
         status: "fail",
         message:"Internal Server Error"
      });
    }
  }
 getAllConversation = async (req, res) => {
    try {
     
      const response = await this.chatService.getAllConversation(req.user._id);
      if (!response.success) {
      
        return res.status(500).json({
          status: "fail",
          message: " Internal server error"
        });
      }
      return res.status(200).json({
        status: "OK",
        data: response.data
      });
    }catch (err) {
      return res.status(500).json({
         status: "fail",
         message:"Internal Server Error"
      });
    }
  }
 
}

module.exports = ChatController;
