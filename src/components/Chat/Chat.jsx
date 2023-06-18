import React, { useEffect } from 'react'
import { ChatContainer } from './styles'

import SideBar from './SideBar/SideBar'
import ChatBody from './Body/ChatBody'

import { useState } from 'react'
import { isLoggedIn, redirectLogin } from '../../utils'

import { useCookies } from 'react-cookie';


function Chat() {
    const [chatId, setChatId] = useState();
    const [cookies, setCookie] = useCookies();

    useEffect(() => {
        // isLoggedIn();
        console.log(cookies.jwt)
        if (!cookies.jwt) {
            redirectLogin();
        }
    }, [])

    return (
        <ChatContainer>
            <SideBar chatId={chatId} setChatId={setChatId} />

            <ChatBody chatId={chatId} />
        </ChatContainer>
    )
}

export default Chat