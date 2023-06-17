const sendMessage = (chatId, message) => {
    //Call Endpoint
    console.log(message)
    //return object of the new message
    return { id: 1, bot: false, message: message }
}

const receiveMessage = (chatId) => {
    //Call EndPoint
    const message = "Response from Bot"
    return { id: 10, bot: true, message: message }
}

export const askChat = (chatId, message, chat, setChat, setAnswering) => {
    setAnswering(true)
    const msgDoc = sendMessage(chatId, message);
    // Add this msg to the stack
    const chat_q = chat.concat(msgDoc);
    setChat(chat.concat(msgDoc))

    setTimeout(() => {
        //Take Response from the Bot
        const resDoc = receiveMessage(chatId);
        // Add this response to the stack
        setChat(chat_q.concat(resDoc))
        setAnswering(false)
    }, 5000)


    return
}