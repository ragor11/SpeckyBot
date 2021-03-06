module.exports.run = async (bot, msg) => {
    let { args } = msg;
    if(!args[0]) return msg.channel.send("You have to define a server");
    guild = bot.guilds.get(args[0]);
    try{
        guild.leave();
        msg.channel.send("It should have worked!")
    }catch(e){
        msg.channel.send("An error occourred")
    }
}

module.exports.config = {
    name: "leaveserver",
	description: "The bot will leave the desired server!",
    usage: `<serverID>`,
    category: `owner`,
	accessableby: "Bot Owner",
    aliases: ["ls","sl","serverleave"]
}
