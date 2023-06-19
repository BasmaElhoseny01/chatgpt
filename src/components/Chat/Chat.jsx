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

    const [cookies, setCookie] = useCookies();

    useEffect(() => {
        // console.log(cookies.jwt)
        if (!cookies.jwt) {
            // redirectLogin();
        }
        //newChat
        setChatId(-1);
    }, [])

    return (
        <ChatContainer>
            <h1>NNNN</h1>
            <SideBar />
            <ChatBody />
        </ChatContainer>
    )
}

export default Chat