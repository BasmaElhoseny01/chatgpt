import axios from '../../../services/instance'

export const loadChat = (chatId, setChat) => {
    if (chatId === -1 || chatId === false) {
        setChat([])
        return
    }
    else {
        axios.get(`/chats/${chatId}`).then((res) => {
            res.data.data.messages.shift()
            setChat(res.data.data.messages)
        }).catch((error) => {
            setChat([])
        })
    }

    return;
}
