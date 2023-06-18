import {
    useContext, createContext, useState, useMemo,
} from 'react';

const ChatIdContext = createContext(null);

function ChatIdContextProvider({ children }) {
    const [chatId, setChatId] = useState(false);

    const value = useMemo(() => ({
        chatId, setChatId
    }), [chatId, setChatId]);
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
