import React, { useState } from 'react'
import { MessageBoxContainer } from './styles'
import { Button, CircularProgress, FormControl, Input } from '@mui/material'


import SendIcon from '@mui/icons-material/Send';

//Server
import { askChat } from './server';
import { useChatIdContext } from '../../../../contexts/ChatIdContext';

function MessageBox(props) {
    const { chatId, setChatId, chats, setChats } = useChatIdContext();


    const { chat, setChat } = props

    const [message, setMessage] = useState("")
    const [answering, setAnswering] = useState(false)

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            askChat(chatId, setChatId, message, chat, setChat, setAnswering);
            setMessage("");
        }
    }

    return (
        <MessageBoxContainer>
            <FormControl variant="outlined" sx={{ padding: "10px", borderRadius: "5px", width: "90%", backgroundColor: "#FFFFFF", boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;" }}>
                <Input sx={{ border: "none" }} disabled={answering} value={answering ? "" : message} onChange={(e) => {
                    setMessage(e.target.value)
                }}
                    onKeyDown={handleKeyDown}
                    endAdornment={
                        <Button disabled={answering} position="end" onClick={() => {
                            askChat(chatId, setChatId, message, chat, setChat, setAnswering, chatId === -1 ? chats : null, chatId === -1 ? setChats : null);
                            setMessage("")
                        }}>
                            {answering ? <CircularProgress size={20} thickness={5} /> : <SendIcon />}
                        </Button>
                    }
                    placeholder={answering ? 'Answering' : 'Send a message'}
                />
            </FormControl>
        </MessageBoxContainer>
    )
}

export default MessageBox