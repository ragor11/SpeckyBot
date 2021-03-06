const { RichEmbed } = require("discord.js");
const { readdirSync } = require("fs")
const { randomInt } = require('mathjs')

module.exports.run = async (bot, msg) => {
	let { config } = bot;
    let { args } = msg;
	var embed = new RichEmbed()
	.setColor('#FF00AA')
	.setAuthor(`${msg.guild.me.displayName} Help`, msg.guild.iconURL)
	.setThumbnail(bot.user.displayAvatarURL)

	if(!args[0] || (msg.author.id == config.owner && args[0] == "all")) {
		let categories = readdirSync('./commands/')

		embed.setDescription(`These are the avaliable commands for ${msg.guild.me.displayName}\nThe bot prefix is: **${config.prefix}**`)
		embed.setFooter(`© ${msg.guild.me.displayName} | Total Commands: ${bot.commands.size}`, bot.user.displayAvatarURL);

		categories.forEach(category => {
			let dir = bot.commands.filter(c => (c.config.category === category && c.config.category != "private"))
			let capitalise = bot.highFirst(category)
			try{
				if(args[0] || categoryCheck(category, msg, config)){
					embed.addField(`❯ ${capitalise} [${dir.size}]:`, `${dir.map(c => `\`${c.config.name}\``).join(" ")}`)
				}
			}catch{}
		})
		let diduknow = [`you can use the \`${config.prefix}serversettings\` command to personalize your server!`,
						`you can use the \`${config.prefix}serversettings\` command to personalize your profile!`,
						`you can send a message that contains \`:EMB:\` to turn your message into an embed!`,
						`you can include \`--emb\` in the \`${config.prefix}say\` command to turn the text into an embed!`,
						`you can type in a channel topic \`Next number: 1\` to turn it into a counting-up channel!`,
						`in counting-up channels, you can end the channel topic with \`[ALTERNATE]\` so all users have to alternate!`];

		embed.addBlankField()
		embed.addField('Did you know that', diduknow[randomInt(0,diduknow.length)])

		return msg.channel.send(embed)
	} else {
		let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
		if(!command) return msg.channel.send(invalidcmd(embed,config));

		command = command.config

		if(!categoryCheck(command.category, msg, config)) return msg.channel.send(invalidcmd(embed,config));
		
		const cmd = bot.highFirst(command.name)
		const description = command.description || "No Description provided."
		const usage = `${command.usage ? `\`${config.prefix}${command.name} ${command.usage}\`` : "No Usage"}`
		const usableby = command.accessableby || "Members"
		const aliases = `${command.aliases ? command.aliases.join(", ") : "None"}`
		const perms = `${command.perms ? command.perms.join(", ") : "None"}`
		const cmdperms = `${command.cmdperms ? command.cmdperms.join(", ") : "None"}`

		embed.setDescription(`The bot's prefix is: \`${config.prefix}\`\n\n**Command:** ${cmd}\n**Description:** ${description}\n**Usage:** ${usage}\n**Accessible by:** ${usableby}\n**Aliases:** ${aliases}\n**Required User Permissions:** ${perms}\n**Required Bot Permissions:** ${cmdperms}`)
		return msg.channel.send(embed)
	}
}

function invalidcmd(embed,config){
	return embed.setTitle("Invalid Command.")
				.setDescription(`Do \`${config.prefix}help\` for the list of the commands.`)
}

function categoryCheck(category,msg,config){
	category = category.toLowerCase()
	return (
	!(category == "nsfw" && !msg.channel.nsfw) &&
	!(category == "owner" && msg.author.id != config.owner) &&
	!(category == "admin" && !msg.member.permissions.toArray().join(' ').includes('MANAGE_'))
	)
}

module.exports.config = {
	name: "help",
	description: "The help for this bot!",
	usage: `<command>`,
	category: `utilities`,
	accessableby: "Members",
    aliases: ["h", "halp", "hel","hwlp","cmds","commands"]
}