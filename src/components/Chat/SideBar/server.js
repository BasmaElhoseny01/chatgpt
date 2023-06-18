// services
import axios from '../../../services/instance';

// export const newChat = (chats, setChats) => {
// // NewChat Endpoint
// axios.post('/chats', {}).then((res) => {

//     chats.concat()


// }).catch((error) => {
//     if (error.response.status === 400) {
//     }
// })


// chat.concat(msgDoc);
//Call Endpoint to load old chat
// setChat([{ id: 1, bot: false, message: "Good Morning" }, { id: 2, bot: true, message: "Good Morning I am bot" }, { id: 3, bot: false, message: "Nice to Meet you" }])
//     return;
// }


export const loadChats = (setChats) => {
    //call end point to load chats for a user
    setChats([{ id: 1, title: "Hello chat" }, { id: 2, title: "Bye chat" }])
}

export const addNewChat = (chats, setChats, chatId, chatTitle) => {
    //Title of Chat
    setChats(chats.concat({ id: chatId, title: chatTitle }))
}