module.exports.run = async (bot, msg) => {
    require('./functions/img')('baka', msg);
}

module.exports.config = {
    name: "baka",
	description: "Gives you a baka!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: []
}
