import React, { useEffect, useState } from 'react'
import { ChatBodyContainer } from './styles'
import Message from './Message/Message'
import MessageBox from './MessageBox/MessageBox'
import { loadChat } from './server';
import { Button } from '@mui/material';


import LogoutIcon from '@mui/icons-material/Logout';
import { logOut } from '../../server';

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
            <Button variant="outlined" color="black" sx={{ margin: '2px', width: "10%" }} fontFamily="monospace" onClick={() => logOut()}>
                <LogoutIcon />
            </Button>
            {chat.map((message) =>
                < Message key={message.id} chat={message.bot} message={message.message} />
            )}
            <MessageBox chatId={chatId} chat={chat} setChat={setChat} />

        </ChatBodyContainer>
    )
}

export default ChatBody