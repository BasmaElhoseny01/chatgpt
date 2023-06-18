const {
  chatErrors
} = require("../error_handling/errors");
// const UserService = require("./pinService");
const { Configuration, OpenAIApi } = require("openai");
const API_KEY = process.env.API_KEY;
const config = new Configuration({

	apiKey: API_KEY,
});

const openai = new OpenAIApi(config);

/**
 * Post Service class for handling Post model and services
 */
class ChatService {
  constructor({ChatRepository,MessageRepository}) {
    this.chatRepository = ChatRepository;
    this.messageRepository = MessageRepository;
  }
  async startConversation(message,title,userId) {
  

    // try {

      const messages = [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: message }

      ];
    
    // console.log("inrrrrrrrrrrrrrrrrrrrr");

      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages
      });
    // console.log("instartttttttttttttt");
	
      const answer = response.data.choices[0].message.content;
    // const answer = "hi";
    console.log(answer);
      //add to messge and to chat
      const firstMessage = await this.messageRepository.addMessage(messages[0].content, "system");
      const addedQuestion = await this.messageRepository.addMessage(message, "user");
      const addedAnswer = await this.messageRepository.addMessage(answer, "assistant");
    // console.log("nnnnnnnniiiiiiiiiii");
    if (firstMessage.success && addedQuestion.success && addedAnswer.success) {
        //create chat with first message
          // console.log("uuuuuuuuuuuuuuuuuuuu");

      const chatObject = await this.chatRepository.addChat(firstMessage.doc._id,title, userId);
      console.log(chatObject);
        //append other messages to the chat 
        const appendQuestion = await this.chatRepository.appendToChat(addedQuestion.doc._id, chatObject.doc._id);
        const appendAnswer = await this.chatRepository.appendToChat(addedAnswer.doc._id, chatObject.doc._id);
      
        return { success: true, data:{chat_id:chatObject.doc._id, answer:answer} };
      }

    
        

    
      return { success: false, error: chatErrors.MONGO_ERR };
    

    // } catch (err) {
    //   return { success: false, error: chatErrors.IN_OPENAI };
    // }


    
}

  async continueConversation(message,userId,chatId) {
  


    try {


//no such conversation
      // const chat = await this.chatRepository.findById(chatId);

      const chat = await this.chatRepository.findChatWithTopMsgs(chatId);
// console.log(chat);

      if (!chat.success) {
        return { success: false, error: chatErrors.CONVERSATION_NOT_FOUND };
      }
//the user not the owner of the conversation
      if (!userId.equals(chat.doc.user)) {
        return { success: false, error: chatErrors.NOT_OWNER };

      }

//get the messages history to send it to the ai 
      const messages = chat.doc.messages.map(element => {
        return {
          role: element.role,
          content: element.text
        }
      });
      //add the user question to the context
      messages.push({ role: "user", content: message });





    
      // console.log("fffffffffffffffffffffffff");
      // console.log(messages);

      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages
      });
      console.log("hererrererereerrrrrrr");
      const answer = response.data.choices[0].message.content;
            console.log(response);

      // console.log(answer.messages);
      console.log("fffffffffffffffffffffffff");
      //add to messge to table
      const addedQuestion = await this.messageRepository.addMessage(message, "user");
      const addedAnswer = await this.messageRepository.addMessage(answer, "assistant");
      if (addedQuestion.success && addedAnswer.success) {
        //append other messages to the chat 
        const appendQuestion = await this.chatRepository.appendToChat(addedQuestion.doc._id, chatId);
        const appendAnswer = await this.chatRepository.appendToChat(addedAnswer.doc._id, chatId);
      
        return { success: true, data:answer };
      }

    
        

    
      return { success: false, error: chatErrors.MONGO_ERR };
    

    } catch (err) {
      console.log("eror!!!!!!!!!!!!!!!!!");
      console.log(err.response);
      return { success: false, error: chatErrors.IN_OPENAI };
    }


    
  }
  

 async getConversation(userId,chatId) {
  


    try {

     
      const chat = await this.chatRepository.findById(chatId,"","messages");
      if (!chat.success) {
        return { success: false, error: chatErrors.CONVERSATION_NOT_FOUND };
      }
      //the user not the owner of the conversation
      // console.log(userId);
      // console.log(chat.doc);
      if (!userId.equals(chat.doc.user)) {
        return { success: false, error: chatErrors.NOT_OWNER };

      }

      

    
        

    
      return { success: true, data: chat.doc };
    

    } catch (err) {
      return { success: false, error: chatErrors.IN_OPENAI };
    }


    
  }
  

 async getTitleFromText(message) {
  


    try {

     const prompt = `
        Give me a short title for the following text : ${message} . Return response in the following parsable JSON format:

        {
           "title":"answer"
        }

    `;

	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: prompt,
		max_tokens: 2048,
		temperature: 1,
	});

	const parsableJSONresponse = response.data.choices[0].text;
	const parsedResponse = JSON.parse(parsableJSONresponse);

	// console.log("Question: ", parsedResponse.Q);
	// console.log("Answer: ", parsedResponse.A);

      

    
        

    
      return { success: true, data: parsedResponse.title };
    

    } catch (err) {
      return { success: false, error: chatErrors.IN_OPENAI };
    }


    
  }
  

  
 async getAllConversation(userId) {
  


    try {

     
      const chat = await this.chatRepository.getAllConversation(userId);
      console.log(chat);
      if (!chat.success) {
        return { success: false, error: chatErrors.MONGO_ERR };
      }
     

      

      console.log(chat);
        

    
      return { success: true, data: chat.doc };
    

    } catch (err) {
      console.log(err);
      return { success: false, error: chatErrors.IN_OPENAI };
    }


    
}

}

module.exports = ChatService;
