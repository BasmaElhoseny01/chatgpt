// const { Dir } = require("fs");
const {
  chatErrors
} = require("../error_handling/errors");

class ChatController {
  constructor({ ChatService }) {
    this.chatService = ChatService;
  }


  sendMessage = async (req, res) => {
    try {
      if (!req.body || !req.body.question) {
        return res.status(400).json({
          status: "fail",
          message:"Bad Request"
        });
        // return;
      }
      const message = req.body.question;
      const response = await this.chatService.sendMessage(message);
      if (!response.success) {
        res.status(500).json({
          status: "fail",
          message:"No response"
        });
      }
      return res.status(200).json({
        status: "OK",
        data: response.data
      });
    }catch (err) {
       res.status(500).json({
         status: "fail",
         message:"Internal Server Error"
      });
    }
  }
}

module.exports = ChatController;
