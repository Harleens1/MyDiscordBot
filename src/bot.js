require('dotenv').config() 
 
const Discord = require("discord.js")
const client = new Discord.Client()
const PREFIX = "$"

client.on('ready', () => {
    console.log(`${client.user.username} has logged in.`)
}) 

client.on('message', async (message) => { 
    if(message.author.bot) return;  
    if (message.content.toLowerCase().includes('gurren lagann') === true){
        message.reply('THE BEST ANIME OF ALL TIME')
    }
    if(message.content.startsWith(PREFIX)){
        const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/)  
        if(CMD_NAME === 'kick'){  
            if (!message.member.hasPermission('KICK_MEMBERS')) {
                return message.reply('You do not have permission to use that command')
            }
            if (args.length === 0) {return message.reply('Please provide an ID')}
            const member = message.guild.members.cache.get(args[0]) 
            if(member) {
                member
                  .kick() 
                  .then((member) => message.channel.send(`${member} was kicked.`)) 
                  .catch((err) => message.channel.send('I do not have permission :('))
            } else {
                message.channel.send('That member was not found')
            }
        } else if (CMD_NAME === 'ban'){
            if (!message.member.hasPermission('BAN_MEMBERS')) {
                return message.reply('You do not have permission to use that command')
            } 
            if (args.length === 0) {return message.reply('Please provide an ID')} 
            try{
                const user = await message.guild.members.ban(args[0]) 
                message.channel.send('User was banned succesffully.')
            }  catch (err) {
                message.channel.send('Was not able to ban the user.')
            }
            
        }
            
    }
    console.log(`[${message.author.tag}]: ${message.content}`) 
    if(message.content === 'hello'){
        message.reply('hello there!')
    }
}) 

client.login(process.env.DISCORD_BOT_TOKEN) 

