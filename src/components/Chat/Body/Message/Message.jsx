import React, { useState } from 'react'
import { Avatar, Box, Typography } from '@mui/material'

//Icons
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DoneIcon from '@mui/icons-material/Done';

import { ContentPasteIconCustom, MessageBox } from './styles'
import CopyToClipboard from 'react-copy-to-clipboard';

function Message(props) {
  const { chat, message } = props
  //useState
  const [copy, setCopy] = useState(false);
  return (

    <MessageBox chat={chat}>
      {chat ? <Avatar alt="chat" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYSV1x9Hp5YGIHh0uPwGnN2fZxZUHRG4_13A&usqp=CAU" /> :
        <Avatar sx={{ bgcolor: "green" }}>N</Avatar>
      }
      <Typography margin="auto 15px" width="90%">{message}</Typography>
      {chat ?
        <>
          {copy
            ? <Box sx={{ margin: "auto 15px", }}><DoneIcon color="black" sx={{ margin: "-5px 10px", float: "right" }} /></Box>
            : <CopyToClipboard text={message}
              onCopy={() => { setCopy(true) }}>
              <ContentPasteIconCustom><ContentPasteIcon color="lightBlack" sx={{ margin: "-5px 10px", float: "right" }} /></ContentPasteIconCustom>
            </CopyToClipboard>
          }
        </>
        : null
      }
    </MessageBox >
  )
}

export default Message