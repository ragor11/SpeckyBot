module.exports.run = async (bot, msg) => {
    require('./functions/img')("keta",msg);
}

module.exports.config = {
    name: "keta",
	description: "Gives you a keta!",
    usage: ``,
    category: `nsfw`,
	accessableby: "Members",
    aliases: []
}
