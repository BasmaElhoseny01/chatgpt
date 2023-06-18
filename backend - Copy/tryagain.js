const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
	apiKey: "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",
});

const openai = new OpenAIApi(config);

const runPrompt = async () => {
	const prompt = `
        write me a joke about a cat and a bowl of pasta. Return response in the following parsable JSON format:

        {
            "Q": "question",
            "A": "answer"
        }

    `;

	const conversation = await openai.conversation.create({
		model: "text-davinci-003",
		prompt: prompt,
		max_tokens: 2048,
		temperature: 1,
	});
const response = conversation.messages[0].text;
	const parsableJSONresponse = response.data.choices[0].text;
	const parsedResponse = JSON.parse(parsableJSONresponse);

	console.log("Question: ", parsedResponse.Q);
    console.log("Answer: ", parsedResponse.A);
    console.log(conversation.id)
};

runPrompt();