export const loadChat = (chatId, setChat) => {
    if (chatId === -1) {
        setChat([])
        return
    }
    //Call Endpoint to load old chat
    // setChat([{ id: 1, bot: false, message: "Good Morning" }, { id: 2, bot: true, message: "Good Morning I am bot" }, { id: 3, bot: false, message: "Nice to Meet you" }])
    return;
}
