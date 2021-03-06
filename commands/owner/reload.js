var { now } = require('microseconds');
var nodegit = require('nodegit');
var path = require("path");

module.exports.run = async (bot, msg) => {
    let { args } = msg;
    if(!args[0]) return msg.channel.send("You have to define an handler to reload")
    var begin = now();
    const cmddir = `../../handlers/commands.js`;
    const eventdir = `../../handlers/events.js`;
    const consdir = `../../handlers/console.js`;
    try{
        switch(args[0]){
            case "commands":
            case "command":
            case "cmds":
            case "cmd":
                await bot.commands.forEach(c => {
                    bot.commands.delete(c);
                });
                await bot.aliases.forEach(a => {
                    bot.commands.delete(a);
                });
                delete require.cache[require.resolve(cmddir)];
                require(cmddir)(bot);
                break
            case "events":
            case "event":
            case "eve":
            case "ev":
                delete require.cache[require.resolve(eventdir)];
                require(eventdir)(bot);
                break
            case "console":
            case "cons":
                await delete require.cache[require.resolve(consdir)];
                require(consdir)(bot);    
                break
            case "bot":
            case "git":
            case "repo":
                
                let repoDir = "./";

                let repository;

                // Open a repository that needs to be fetched and fast-forwarded
                nodegit.Repository.open(path.resolve(repoDir))
                .then(function(repo) {
                    repository = repo;

                    return repository.fetchAll({
                        callbacks: {
                            credentials: function(url, userName) {
                                return nodegit.Cred.sshKeyFromAgent(userName);
                            },
                            certificateCheck: function() {
                                return 0;
                            }
                        }
                    });
                })
                // Now that we're finished fetching, go ahead and merge our local branch
                // with the new one
                .then(function() {
                    return repository.mergeBranches("master", "origin/master");
                })
                .done(function() {
                    console.log("Done!");
                });

                break
            /*
            case "npm":
            case "modules":
            case "packages":
                const cmd = require('node-cmd');
                cmd.run(`
                    cd ../
                    npm i
                `)
                break
            */
            default:
                return msg.channel.send("Module to reload is invalid")
        }
    }catch(e){
        console.log(`ERROR: ${e.message}`);
        return
    }
    const end = now();
    const diff = end - begin;
    msg.channel.send(`**${args[0]}** got reloaded! (${parseFloat(diff/1000).toFixed(3)}ms)`).then(ms => ms.delete(10000)).catch()
    msg.delete(5000)
}

module.exports.config = {
    name: "reload",
	description: "The bot will reload a specific handler!",
    usage: `<handler>`,
    category: `owner`,
	accessableby: "Bot Owner",
    aliases: ["rld","rl"]
}
