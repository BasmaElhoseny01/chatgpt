import React, { useEffect, useState } from 'react'
import { Button, Drawer, Typography } from '@mui/material'

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'


import { DrawerHeader } from './styles'
import ChatItem from './ChatItem'
function SideBar(props) {
    const { chatId, setChatId } = props;

    const [open, setOpen] = useState(true)
    const [chats, setChats] = useState([])

    //useEffect
    useEffect(() => {
        //Load Chats from API
        setChats([{ id: 1, title: "Hello chat" }, { id: 2, title: "Bye chat" }])
    }, [])

    return (
        <>
            {open ?
                <Drawer
                    sx={{
                        width: 240,
                        flexShrink: 0,
                        padding: "3px",
                        '& .MuiDrawer-paper': {
                            width: 240,
                            boxSizing: 'border-box',
                            backgroundColor: "#202123"
                        },

                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader>
                        <Button variant="outlined" color="grey" sx={{ margin: '2px', width: "70%" }} fontFamily="monospace" onClick={() => console.log("new chat")}>+ New chat</Button>
                        <Button variant="outlined" color="grey" sx={{ margin: '2px', width: "20%" }} onClick={() => setOpen(false)}>
                            <ChevronLeftIcon />
                        </Button>
                    </DrawerHeader>

                    <Typography variant='p' fontWeight="600" fontSize="0.75rem" color="#8E8EA0" margin="5px 20px" fontFamily="monospace">Today</Typography>
                    {
                        chats.map((chat) =>
                            <ChatItem chat={chat} setChatId={setChatId} select={chat.id === chatId} />)
                    }


                    <Typography variant='p' fontWeight="600" fontSize="0.75rem" color="#8E8EA0" margin="5px 20px" fontFamily="monospace">Yesterday</Typography>
                    {
                        chats.map((chat) =>
                            <ChatItem chat={chat} setChatId={setChatId} select={chat.id === chatId} />)
                    }

                </Drawer>
                :
                <DrawerHeader>
                    <Button variant="outlined" color="black" sx={{ margin: '2px', padding: '5px', minWidth: '10px' }} onClick={() => setOpen(true)}>
                        <ChevronRightIcon />
                    </Button>
                </DrawerHeader>

            }
        </>


        // <SideBarContainer>
        //     Side Bar
        // </SideBarContainer>
    )
}

export default SideBar