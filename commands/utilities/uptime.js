module.exports.run = async (bot, msg) => {
    msg.channel.send(`I have been online* for: ${bot.msToTime(bot.uptime)}\n*Since last reboot`)
}

module.exports.config = {
    name: "uptime",
	description: "Information about how long the bot has been online!",
    usage: ``,
    category: `utilities`,
	accessableby: "Members",
    aliases: ["upt"]
}
