import axios from '../../../../services/instance'
import { addNewChat } from '../../SideBar/server'
const sendMessage = (message) => {
    //return message
    return { _id: new Date(), role: "user", text: message }
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
            if (chatTitle.length > 100) {
                //take first 3 words
                chatTitle = chatTitle.match(/\b[\w']+(?:[^\w\n]+[\w']+){0,2}\b/g)[0];
            }
            // addNewChat(chats, setChats, "temp", chatTitle)
            return axios.post('/chats', { question: message, title: chatTitle })
        }).then((res) => {
            // console.log("2")
            const chatID = res.data.data.chat_id;
            setChatId(chatID);
            // Add this Chat to the chat stack
            //Update Id for this new Chat
            addNewChat(chats, setChats, chatID, chatTitle)

            // Add this response to the stack
            const resDoc = { _id: new Date(), role: "assistant", text: res.data.data.answer }
            console.log(resDoc)
            setChat(chat_q.concat(resDoc))
            setAnswering(false);

        }).catch((error) => {
            //check if error is getting title
            console.log(error)
        })

    }
    else {
        //existing chat
        axios.post(`/chats/${chatId}`, { question: message }).then((res) => {
            // Add this response to the stack
            const resDoc = { _id: new Date(), role: "assistant", text: res.data.data }
            setChat(chat_q.concat(resDoc))
            setAnswering(false);
        }).catch((error) => {
            //check if error is getting title
            console.log(error)
        })

    }
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