module.exports.run = async (bot, msg) => {
    require('./functions/img')('bunny', msg);
}

module.exports.config = {
    name: "bunny",
	description: "Gives you a bunny!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: ['rabbit']
}
