import React from 'react'
import { ChatContainer } from './styles'

import SideBar from './SideBar/SideBar'
import ChatBody from './Body/ChatBody'

import { useState } from 'react'

function Chat() {
    const [chatId, setChatId] = useState();
    return (
        <ChatContainer>
            <SideBar chatId={chatId} setChatId={setChatId} />
            
            <ChatBody chatId={chatId} />
        </ChatContainer>
    )
}

export default Chat