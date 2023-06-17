const awilix = require("awilix");

// Require Controllers
// const PinController = require("./controllers/pinController");
// const BoardController = require("./controllers/boardController");
const AuthenticationController = require("./controllers/authenticationController");

const ChatController = require("./controllers/chatController");


// Require Services
// const PinService = require("./service/pinService");
// const BoardService = require("./service/boardService");

const ChatService = require("./service/chatService");
const UserService = require("./service/userService");
const Email = require("./service/emailService");

// Require Data access
// const PinRepository = require("./data_access/PinRepository");
// const BoardRepository = require("./data_access/BoardRepository");
const UserRepository = require("./data_access/UserRepository");

//Require Models
// const Pin = require("./models/pinModel");
// const Board = require("./models/boardModel");
const User = require("./models/userModel");

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

function setup() {
  container.register({
    // controllers
    // PinController: awilix.asClass(PinController),
    // BoardController: awilix.asClass(BoardController),
    AuthenticationController: awilix.asClass(AuthenticationController),

     ChatController: awilix.asClass(ChatController),

    // services
    // PinService: awilix.asClass(PinService),
    // BoardService: awilix.asClass(BoardService),
    ChatService: awilix.asClass(ChatService),
        Email: awilix.asClass(Email),
    UserService: awilix.asClass(UserService),



    // DAOs

    //Repository: 
        UserRepository: awilix.asClass(UserRepository),

    // awilix.asClass(Repository),
    // PinRepository: awilix.asClass(PinRepository),
    // BoardRepository: awilix.asClass(BoardRepository),

    // inject knexjs object with database connection pooling
    // support
        
            User: awilix.asValue(User),

    // Pin: awilix.asValue(Pin),
    // Board: awilix.asValue(Board),
  });
}

module.exports = {
  container,
  setup,
};
