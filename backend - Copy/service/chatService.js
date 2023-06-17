const {
  chatErrors
} = require("../error_handling/errors");
// const UserService = require("./pinService");
const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
	apiKey: "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",
});

const openai = new OpenAIApi(config);

/**
 * Post Service class for handling Post model and services
 */
class ChatService {
  constructor() {
    // this.chatRepository = ChatRepository;
  }
  async sendMessage(message) {
  // const prompt = `
    //     write me a joke about a cat and a bowl of pasta. Return response in the following parsable JSON format:

    //     {
    //         "Q": "question",
    //         "A": "answer"
    //     }

    // `;

	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: message+` . Return response in the following parsable JSON format:

        {
            "Q": "question",
            "A": "answer"
        }`,
		max_tokens: 2048,
		temperature: 1,
	});

	const parsableJSONresponse = response.data.choices[0].text;
	const parsedResponse = JSON.parse(parsableJSONresponse);

	console.log("Question: ", parsedResponse.Q);
    console.log("Answer: ", parsedResponse.A);
    return {success: true, data: parsedResponse};
    
}



}

module.exports = ChatService;
