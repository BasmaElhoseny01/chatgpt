import React, { useEffect, useState } from 'react'
import { ChatBodyContainer } from './styles'
import Message from './Message/Message'
import MessageBox from './MessageBox/MessageBox'
import { loadChat } from './server';

function ChatBody(props) {
    const { chatId } = props;

    //useState
    const [chat, setChat] = useState([]);
    //useEffect
    useEffect(() => {
        //Load history
        loadChat(chatId, setChat)

    }, [chatId])
    return (
        <ChatBodyContainer>
            {chat.map((message) =>
                < Message key={message.id} chat={message.bot} message={message.message} />
            )}
            <MessageBox chatId={chatId} chat={chat} setChat={setChat} />

        </ChatBodyContainer>
    )
}

export default ChatBody