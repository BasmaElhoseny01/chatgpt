const express = require("express");
const { container } = require("../di-setup");

const ChatController = container.resolve("ChatController");

const router = express.Router();


router.route("/").post(ChatController.sendMessage);
module.exports = router;
