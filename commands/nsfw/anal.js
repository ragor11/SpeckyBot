module.exports.run = async (bot, msg) => {
    require('./functions/img')("anal",msg);
}

module.exports.config = {
    name: "anal",
	description: "Gives you a anal porn!",
    usage: ``,
    category: `nsfw`,
	accessableby: "Members",
    aliases: ["ass"]
}
