const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
	apiKey: "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",
});

const openai = new OpenAIApi(config);

async function getChatCompletion() {
  
   const messages = [
        { role: "system", content: "You are a helpful assistant." },
     { role: "user", content: "what is the name of naruto mangaka?" },
         {
      role: 'assistant',
      content: 'The name of the mangaka who created "Naruto" is Masashi Kishimoto.'
     },
      { role: "user", content: "what is his nationality ?" },


    ];
    

    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages
      });

  // console.log(response.data.choices[0]);
    const completion = response.data.choices[0].message.content;
    console.log('Completion:', completion);
  
}

getChatCompletion();
