// services
import axios from '../../../services/instance';
import { groupBy, relativeTime } from '../../../utils';

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
    axios.get('/chats').then((res) => {
        let chats = res.data.data
        chats.map((chat) => {
            chat.date = relativeTime(chat.createdAt)
            return null
        })
        chats = groupBy(chats, 'date')
        console.log(chats)
        setChats(chats)
    }).catch((error) => {
        setChats([])
    })
}

export const addNewChat = (chats, setChats, chatId, chatTitle) => {
    //Title of Chat
    setChats(chats.concat({ id: chatId, title: chatTitle }))
}