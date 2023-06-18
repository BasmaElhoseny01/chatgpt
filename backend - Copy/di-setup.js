const awilix = require("awilix");

// Require Controllers

const AuthenticationController = require("./controllers/authenticationController");
const ChatController = require("./controllers/chatController");


// Require Services

const ChatService = require("./service/chatService");
const UserService = require("./service/userService");
const Email = require("./service/emailService");

// Require Data access

const UserRepository = require("./data_access/UserRepository");
const ChatRepository = require("./data_access/ChatRepository");
const MessageRepository = require("./data_access/MessageRepository");

//Require Models

const User = require("./models/userModel");
const Chat = require("./models/chatModel");
const Message = require("./models/messageModel");



const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

function setup() {
  container.register({
    // controllers
    
    AuthenticationController: awilix.asClass(AuthenticationController),
    ChatController: awilix.asClass(ChatController),

    // services
  
    ChatService: awilix.asClass(ChatService),
    Email: awilix.asClass(Email),
    UserService: awilix.asClass(UserService),



    // DAOs

    //Repository: 
    UserRepository: awilix.asClass(UserRepository),
    ChatRepository: awilix.asClass(ChatRepository),
    MessageRepository: awilix.asClass(MessageRepository),

   
    // inject knexjs object with database connection pooling
    // support
        
    User: awilix.asValue(User),
    Message: awilix.asValue(Message),
    Chat: awilix.asValue(Chat),
 
  });
}

module.exports = {
  container,
  setup,
};
