import axios from '../../../../services/instance'
const sendMessage = (message) => {
    //return message
    return { id: new Date(), bot: false, message: message }
}

const receiveMessage = (chatId, setChatId, message, setChat, setAnswering, chat_q) => {
    if (chatId === -1) {
        //new Chat
        axios.post('/chats', { question: message }).then((res) => {
            setChatId(res.data.data.chat_id);

            // Add this response to the stack
            const resDoc = { id: new Date(), bot: true, message: res.data.data.answer }
            setChat(chat_q.concat(resDoc))
            setAnswering(false);

        }).catch((error) => {
            console.log(error)
        })

    }
    else {
        //old chat
    }
    //Call EndPoint
    // const message = "Response from Bot"
    return { id: 10, bot: true, message: message }
}

export const askChat = (chatId, setChatId, message, chat, setChat, setAnswering) => {
    setAnswering(true)
    const msgDoc = sendMessage(message);
    // Add this msg to the stack
    const chat_q = chat.concat(msgDoc);
    setChat(chat.concat(msgDoc))


    //Take Response from the Bot
    const resDoc = receiveMessage(chatId, setChatId, message, setChat, setAnswering, chat_q);
    // setChat(chat_q.concat(resDoc))
    // setAnswering(false)


    return
}