module.exports.run = async (bot, msg, args, config) => {
    require('./functions/img')('bird', msg);
}

module.exports.config = {
    name: "bird",
	description: "Gives you a bird!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: ['birb']
}
