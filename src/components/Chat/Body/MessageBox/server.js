import axios from '../../../../services/instance'
const sendMessage = (message) => {
    //return message
    return { id: 1, bot: false, message: message }
}

const receiveMessage = (chatId, setchatId, message, chat, setChat, setAnswering) => {
    if (chatId === -1) {
        //new Chat
        axios.post('/chats', { question: message }).then((res) => {
            setAnswering(false);

            setchatId(res.data.data.chat_id);

        }).catch((error) => {
            // if (error.response.status === 400) {
            // }
        })

    }
    else {
        //old chat
    }
    //Call EndPoint
    // const message = "Response from Bot"
    return { id: 10, bot: true, message: message }
}

export const askChat = (chatId, setchatId, message, chat, setChat, setAnswering) => {
    setAnswering(true)
    const msgDoc = sendMessage(message);
    // Add this msg to the stack
    const chat_q = chat.concat(msgDoc);
    setChat(chat.concat(msgDoc))


    //Take Response from the Bot
    const resDoc = receiveMessage(chatId, setchatId, message, chat, setChat, setAnswering);
    // Add this response to the stack
    // setChat(chat_q.concat(resDoc))
    // setAnswering(false)


    return
}