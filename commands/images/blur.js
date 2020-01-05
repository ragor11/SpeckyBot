module.exports.run = async (bot, msg) => {
    require('./functions/intensity')(bot, msg,'blur',false,[5,2,100],"png")
}

module.exports.config = {
    name: "blur",
	description: "Blurs the image!",
    usage: `[Amount (2-100)]`,
    category: `images`,
	accessableby: "Members",
    aliases: [],
    perms: [],
    cmdperms: []
}
