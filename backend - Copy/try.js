const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
	apiKey: "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",
});

const openai = new OpenAIApi(config);

// const runPrompt = async () => {
// 	const prompt =
//         "write me a joke about a cat and a bowl of pasta.";

// 	const response = await openai.createCompletion({
// 		model: "text-davinci-003",
// 		prompt: prompt,
// 		max_tokens: 1024,
// 		temperature: 1,
// 	});

// 	// const parsableJSONresponse = response.data.choices[0].text;
// 	// const parsedResponse = JSON.parse(parsableJSONresponse);

// 	// console.log("Question: ", parsedResponse.Q);
// 	// console.log("Answer: ", parsedResponse.A);
//     console.log(response.data.choices[0].text[0]);


// };



// runPrompt();

// const { Configuration, OpenAIApi } = require("openai");
// require('dotenv').config()

// const configuration = new Configuration({
//   apiKey: "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",
// });
// const openai = new OpenAIApi(configuration);

async function runCompletion () {
const completion = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "How are you today?",
});
console.log(completion.data.choices[0].text);
}

runCompletion();