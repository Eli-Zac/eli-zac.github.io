function addBot(botId) {
    let inviteLink;
    
    switch(botId) {
        case 1:
            inviteLink = "https://discord.com/oauth2/authorize?client_id=BOT_1_ID&permissions=BOT_PERMISSIONS&scope=bot";
            break;
        case 2:
            inviteLink = "https://discord.com/oauth2/authorize?client_id=BOT_2_ID&permissions=BOT_PERMISSIONS&scope=bot";
            break;
        case 3:
            inviteLink = "https://discord.com/oauth2/authorize?client_id=BOT_3_ID&permissions=BOT_PERMISSIONS&scope=bot";
            break;
        default:
            alert("Bot not found");
            return;
    }
    
    window.open(inviteLink, "_blank");
}
