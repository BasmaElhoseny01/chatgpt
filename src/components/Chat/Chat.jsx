import React, { useEffect } from 'react'
import { ChatContainer } from './styles'

import SideBar from './SideBar/SideBar'
import ChatBody from './Body/ChatBody'

import { useState } from 'react'
import { isLoggedIn, redirectLogin } from '../../utils'

import { useCookies } from 'react-cookie';
import { useChatIdContext } from '../../contexts/ChatIdContext'

function Chat() {
    const [openSideBar, setOpenSideBar] = useState(false)
    // const [openChat, setOpenChat] = useState(false)

    const { setChatId } = useChatIdContext();

    const [cookies, setCookie, removeCookie] = useCookies([]);


    useEffect(() => {
        // console.log(cookies.jwt)
        if (!cookies.chatgpt) {
            redirectLogin();
        }
        //newChat
        setChatId(-1);

        //On Resize Change only
        const handleResize = () => {
            if (window.innerWidth < 700) {
                setOpenSideBar(false);
            }
            else {
                // setOpenChat(true)
                setOpenSideBar(true)
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();//call initially

        // Clean up event listener when component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])



    const openSideBarHandler = (value) => {
        setOpenSideBar(value);
        // console.log("called", value)
        if (window.innerWidth < 700) {
            // setOpenChat(!value)
        }
    }

    return (
        <ChatContainer>
            <SideBar openSideBar={openSideBar} openSideBarHandler={openSideBarHandler} />
            {/* {openChat ? <ChatBody removeCookie={removeCookie} /> : null} */}
            <ChatBody removeCookie={removeCookie} />

        </ChatContainer>
    )
}

export default Chat