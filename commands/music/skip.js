module.exports.run = async (bot, msg) => {
    let { args } = msg;
    bot.music.skipFunction(msg, args.join(' '))
}

module.exports.config = {
    name: "skip",
	description: "Skips the playing song!",
    usage: ``,
    category: `music`,
	accessableby: "Members",
    aliases: ["s"]
}
