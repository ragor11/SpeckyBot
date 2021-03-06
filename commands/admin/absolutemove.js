module.exports.run = async (bot, msg) => {
    let { args } = msg;
    if(!args[0]){return msg.channel.send("You didn't include a Voice Channel ID.")}
    if(isNaN(args[0])){return msg.channel.send("The Vocal Channel ID (#1) is invalid.")}
    var VC1;
    if(!args[1]){

        if(!msg.member.voiceChannel){return msg.channel.send("You aren't in a Voice Channel.")}
        
        VC1 = msg.member.voiceChannel;

        VC1.members.forEach(member => {
            try{
                member.setVoiceChannel(args[0]);
            }catch{return msg.channel.send("Error happend (Wrong ID?)")}
        })

    }else{
        if(isNaN(args[1])){return msg.channel.send("The Vocal Channel ID (#2) is invalid.")}
        
        try{
            VC1 = bot.channels.get(args[0]);
        }catch{return msg.channel.send("Error happend (Wrong ID?)")}
        
        VC1.members.forEach(member => {
            try{
                member.setVoiceChannel(args[1]);
            }catch{return msg.channel.send("Error happend (Wrong ID?)")}
        })
    }
}

module.exports.config = {
    name: "absolutemove",
	description: "Moves all users from one VC to another one!",
    usage: `<vocalchannelID> <vocalchannelID>`,
    category: `admin`,
	accessableby: "Server Admins and Moderators",
    aliases: ["am","moveid","idmove"],
    perms: ['MOVE_MEMBERS'],
    cmdperms: ['MOVE_MEMBERS']
}