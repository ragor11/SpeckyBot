module.exports = async (bot) => {

    bot.msToVars = (ms) => {
        const mil = Math.floor((ms % 1000)).toString();
        const sec = Math.floor((ms / 1000) % 60).toString();
        const min = Math.floor((ms / (1000 * 60)) % 60).toString();
        const hrs = Math.floor((ms / (1000 * 60   * 60)) % 24).toString();
        const day = Math.floor((ms / (1000 * 60   * 60   * 24)) % 60).toString();
        return {mil,sec,min,hrs,day}
    }

    bot.msToTime = (ms) => {
        const {mil,sec,min,hrs,day} = bot.msToVars(ms);
        return `${day.padStart(1, "0")}d ${hrs.padStart(2, "0")}h ${min.padStart(2, "0")}m ${sec.padStart(1, "0")}s ${mil.padStart(3, "0")}ms`
    }



    bot.formatTime = (ms) => {
        const {sec,min,hrs,day} = bot.msToVars(ms);

        if(day > 0){
            return `${day} Day${(day == 1) ? '' : 's'}`
        }else if(hrs > 0){
            return `${hrs} Hour${(hrs == 1) ? '' : 's'}`
        }else if(min > 0){
            return `${min} Minut${(min == 1) ? '' : 's'}`
        }else{
            return `${sec} Second${(sec == 1) ? '' : 's'}`
        }
    }



    bot.getChannel = (input, guild) => {
        var ch = guild.channels.find( item => {
            try{
                return item.name.toLowerCase() === input.toLowerCase()
            }catch(err){
                return null
            }});
        if( ch != null && typeof ch != undefined) {
            return ch
        }
        var ch = guild.channels.get(input);
        if(typeof ch != null && typeof ch != undefined){
            return ch
        }
        return input;
    }



    bot.highFirst = string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }



    bot.debug = () => {
        console.log(bot.debugN++)
    }



    bot.resetDebug = () => {
        bot.debugN = 0;
    }


    bot.setLastImageCache = (msg) => {
        bot.cache.lastImage[msg.member.id] = msg.member.user.displayAvatarURL;
    }
}