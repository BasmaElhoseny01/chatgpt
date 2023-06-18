import axios from '../../../../services/instance'
import { addNewChat } from '../../SideBar/server'
const sendMessage = (message) => {
    //return message
    return { id: new Date(), bot: false, message: message }
}

const receiveMessage = async (chatId, setChatId, message, setChat, setAnswering, chat_q, chats, setChats) => {
    if (chatId === -1) {
        let chatTitle = ""
        // New Chat
        //get title for this Question
        axios.get('/chats/title',
            {
                params: {
                    message
                }
            }
        ).then((response) => {
            chatTitle = response.data.data;
            // addNewChat(chats, setChats, "temp", chatTitle)
            console.log("1")
            return axios.post('/chats', { question: message, title: chatTitle })
        }).then((res) => {
            // console.log("2")
            const chatID = res.data.data.chat_id;
            setChatId(chatID);
            // Add this Chat to the chat stack
            //Update Id for this new Chat
            addNewChat(chats, setChats, chatID, chatTitle)

            // Add this response to the stack
            const resDoc = { id: new Date(), bot: true, message: res.data.data.answer }
            setChat(chat_q.concat(resDoc))
            setAnswering(false);

        }).catch((error) => {
            //check if error is getting title
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

export const askChat = (chatId, setChatId, message, chat, setChat, setAnswering, chats, setChats) => {
    setAnswering(true)
    const msgDoc = sendMessage(message);
    // Add this msg to the stack
    const chat_q = chat.concat(msgDoc);
    setChat(chat.concat(msgDoc))


    //Take Response from the Bot
    const resDoc = receiveMessage(chatId, setChatId, message, setChat, setAnswering, chat_q, chats, setChats);
    // setChat(chat_q.concat(resDoc))
    // setAnswering(false)

    return
}