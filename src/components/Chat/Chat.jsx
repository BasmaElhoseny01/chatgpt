import React, { useEffect } from 'react'
import { ChatContainer } from './styles'

import SideBar from './SideBar/SideBar'
import ChatBody from './Body/ChatBody'

import { useState } from 'react'
import { isLoggedIn, redirectLogin } from '../../utils'

import { useCookies } from 'react-cookie';
import { useChatIdContext } from '../../contexts/ChatIdContext'


function Chat() {
    // const [chatId, setChatId] = useState();
    const { setChatId } = useChatIdContext()

    const [cookies, setCookie, removeCookie] = useCookies([]);

    useEffect(() => {
        // console.log(cookies.jwt)
        if (!cookies.chatgpt) {
            redirectLogin();
        }
        //newChat
        setChatId(-1);
    }, [])

    return (
        <ChatContainer>
            <SideBar />
            <ChatBody removeCookie={removeCookie} />
        </ChatContainer>
    )
}

export default Chat