import React, { useEffect, useState } from 'react'
import { Button, Drawer, Typography } from '@mui/material'

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'


import { DrawerHeader } from './styles'
import ChatItem from './ChatItem'

import { useChatIdContext } from '../../../contexts/ChatIdContext'

import { loadChats } from './server'


function SideBar(props) {

    const { chatId, setChatId, chats, setChats } = useChatIdContext();

    const { openSideBar, openSideBarHandler } = props
    const [time, setTime] = useState(-1)

    //useEffect
    useEffect(() => {
        //Load Chats from API
        loadChats(setChats);
    }, [])

    return (
        <>
            {openSideBar ?
                <Drawer
                    sx={{
                        width: 240,
                        flexShrink: 0,
                        padding: "3px",
                        '& .MuiDrawer-paper': {
                            // width: 240,
                            width: openSideBar && window.innerWidth < 700 ? '100vw' : 240,
                            boxSizing: 'border-box',
                            backgroundColor: "#202123"
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={openSideBar}
                >
                    <DrawerHeader>
                        <Button variant="outlined" color="grey" sx={{ margin: '2px', width: "70%" }} fontFamily="monospace" onClick={() => {
                            if (window.innerWidth < 700) openSideBarHandler(false)
                            setChatId(-1)
                        }}>+ New chat</Button>
                        <Button variant="outlined" color="grey" sx={{ margin: '2px', width: "20%" }} onClick={() => openSideBarHandler(false)}>
                            <ChevronLeftIcon />
                        </Button>
                    </DrawerHeader>
                    {
                        Object.keys(chats).map((time_stamp) => {
                            return <>
                                <Typography key={time_stamp} variant='p' fontWeight="600" fontSize="0.75rem" color="#8E8EA0" margin="5px 20px" fontFamily="monospace">{time_stamp}</Typography>
                                {
                                    chats[time_stamp].map((chat) => {
                                        return <ChatItem chat={chat} select={chat.id === chatId} key={chat.id} openSideBarHandler={openSideBarHandler} />
                                    })
                                }
                            </>
                        })
                    }
                </Drawer >
                :
                <DrawerHeader>
                    <Button variant="outlined" color="black" sx={{ margin: '2px', padding: '5px', minWidth: '10px' }} onClick={() => openSideBarHandler(true)}>
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