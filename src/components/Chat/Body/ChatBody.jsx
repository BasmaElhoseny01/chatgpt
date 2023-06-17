import React from 'react'
import { ChatBodyContainer } from './styles'
import Message from './Message/Message'

function ChatBody() {
    return (
        <ChatBodyContainer>
            <Message message="good morning" />
            <Message message="How are you" chat={true} />
            <Message message="good morning" />
            <Message message="How are you" chat={true} />
            <Message message="good morning" />
            <Message message="How are you" chat={true} />
            <Message message="good morning" />
            <Message message="How are you" chat={true} />
            <Message message="good morning" />
            <Message message="How are you" chat={true} />
            {/* <Message message="good morning" />
            <Message message="How are you" chat={true} />
            <Message message="good morning" />
            <Message message="How are you" chat={true} />
            <Message message="good morning" />
            <Message message="How are you" chat={true} />
            <Message message="good morning" />
            <Message message="How are you" chat={true} />
            <Message message="good morning" />
            <Message message="How are you" chat={true} /> */}


        </ChatBodyContainer>
    )
}

export default ChatBody