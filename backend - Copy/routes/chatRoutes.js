const express = require("express");
const { container } = require("../di-setup");
const AuthenticationController = container.resolve("AuthenticationController");

const ChatController = container.resolve("ChatController");

const router = express.Router();

router.use(AuthenticationController.authorize);

router.route("/").post(ChatController.startConversation);
router.route("/:conversationId").post(ChatController.continueConversation);
router.route("/:conversationId").get(ChatController.getConversation);
router.route("/").get(ChatController.getAllConversation);


module.exports = router;
