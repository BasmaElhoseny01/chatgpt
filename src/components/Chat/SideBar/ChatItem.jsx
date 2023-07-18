import React from 'react'
import { Box, Typography } from '@mui/material'


import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useChatIdContext } from '../../../contexts/ChatIdContext';

function ChatItem(props) {
    const { chat, select, openSideBarHandler } = props

    const { setChatId } = useChatIdContext();

    return (
        <Box key={chat.id} backgroundColor={select ? "#343541" : "none"} padding="10px" margin="5px 8px" borderRadius="3px" display="flex" flexDirection="row" alignItems="center" justifyContent="flex-start"
            onClick={() => {
                setChatId(chat.id);
                if (window.innerWidth < 700) openSideBarHandler(false)
            }}
            sx={{ cursor: "pointer" }}
        >
            <ChatBubbleOutlineIcon color="grey" fontSize="0.875rem" />
            <Typography color="#ffffff" margin="0px 10px" fontSize="0.875rem" fontFamily="monospace">{chat.title}</Typography>
        </Box>
    )
}

export default ChatItem