import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';

import { ChatBodyContainer } from './styles'
import Message from './Message/Message'
import MessageBox from './MessageBox/MessageBox'
import { loadChat } from './server';
import { Button } from '@mui/material';


import LogoutIcon from '@mui/icons-material/Logout';
import { logOut } from '../../server';

import { useChatIdContext } from '../../../contexts/ChatIdContext';

function ChatBody(props) {
    const { chatId } = useChatIdContext();
    // const [cookies, setCookies, removeCookie] = useCookies([]);
    const { removeCookie } = props

    //useState
    const [chat, setChat] = useState([]);
    //useEffect
    useEffect(() => {
        //Load history
        loadChat(chatId, setChat);
    }, [chatId])
    return (
        <ChatBodyContainer>
            <Button variant="outlined" color="black" sx={{ margin: '2px', width: "10%" }} fontFamily="monospace" onClick={() => logOut(removeCookie)}>
                <LogoutIcon />
            </Button>
            {chat.map((message) =>
                < Message key={message._id} chat={!(message.role === 'user')} message={message.text} />
            )}
            <MessageBox chat={chat} setChat={setChat} />

        </ChatBodyContainer>
    )
}

export default ChatBody