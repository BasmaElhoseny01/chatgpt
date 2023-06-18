// services
import axios from '../../../services/instance';
import { groupBy, relativeTime } from '../../../utils';

export const loadChats = (setChats) => {
    //call end point to load chats for a user
    axios.get('/chats').then((res) => {
        let chats = res.data.data
        chats.map((chat) => {
            chat.date = relativeTime(chat.createdAt)
            return null
        })
        chats = groupBy(chats, 'date')
        setChats(chats)
    }).catch((error) => {
        setChats([])
    })
}

export const addNewChat = (chats, setChats, chatId, chatTitle) => {
    // Title of Chat
    if (!('today' in chats)) {
        chats.today = [{ id: chatId, title: chatTitle }];
    }
    else {
        chats['today'].unshift({ id: chatId, title: chatTitle })
    }
    setChats(chats)
}