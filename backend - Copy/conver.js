const openai = require('openai');

openai.api_key = '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';


async function sendMessage() {
    // Create a new session 
    const session = await openai.createSession();

    // Send a prompt to that session
    await openai.continueSession({
        session: session.id,
        prompt: "ChatGPT:",
        temperature: 0.7
    });

    // Continue the conversation from the previous response
    await openai.continueSession({
        session: session.id,
        prompt: "Hi!",
        temperature: 0.7
    });

    // Create a new session for a fresh conversation
    const newSession = await openai.createSession();

    // Send a new prompt to the new session 
    await openai.continueSession({
        session: newSession.id,
        prompt: "ChatGPT, how are you today?",
        temperature: 0.7
    });
}

sendMessage();