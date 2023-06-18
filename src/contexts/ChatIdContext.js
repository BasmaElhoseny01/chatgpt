import {
    useContext, createContext, useState, useMemo,
} from 'react';

const ChatIdContext = createContext(null);

function ChatIdContextProvider({ children }) {
    const [chatId, setChatId] = useState(false);
    const [chats, setChats] = useState([])


    const value = useMemo(() => ({
        chatId, setChatId, chats, setChats
    }), [chatId, setChatId, chats, setChats]);
    return (
        <ChatIdContext.Provider
            value={value}
        >
            {children}
        </ChatIdContext.Provider>
    );
}

export const useChatIdContext = () => useContext(ChatIdContext);

export default ChatIdContextProvider;
