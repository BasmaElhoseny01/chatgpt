import React from 'react'
import { ChatContainer } from './styles'

import SideBar from './SideBar/SideBar'
import ChatBody from './Body/ChatBody'


function Chat() {
    return (
        <ChatContainer>
            <SideBar />
            <ChatBody />
        </ChatContainer>
    )
}

export default Chat