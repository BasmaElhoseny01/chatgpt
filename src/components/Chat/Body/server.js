export const loadChat = (chatId, setChat) => {
    //Call Endpoint to load old chat
    setChat([{ id: 1, bot: false, message: "Good Morning" }, { id: 2, bot: true, message: "Good Morning I am bot" }, { id: 3, bot: false, message: "Nice to Meet you" }])
    return;
}
