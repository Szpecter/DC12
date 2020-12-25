require("dotenv").config()

const Discord = require('discord.js')
const client = new Discord.Client();
const prefix = 'w!'
const fs = require('fs')

var CronJob = require('cron').CronJob
var Timer = false

client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for(const file of commandFiles){
    const command = require(`./commands/${file}`)

    client.commands.set(command.name, command)
}

client.once('ready',() => {
    console.log('Warden is visible')
})

//Set up cron for reminder
//Guild ID 788093162765287494
//Channel ID 789112310072737792
//Role ID 789658515265683522
//For testing purposes, this is GID, CHID and RID:789984817667637281 ; 789984818149589024 ; 791749227746951168
var WardenDaily = new CronJob('00 17 * * *', () => {
    let myRole = 789658515265683522n
    const dailyChannel = client.channels.cache.find(channel => channel.id === "789112310072737792")
    const prisonReminder = new Discord.MessageEmbed()
        .setColor('#000763')
        .setTitle('Time to vote!')
        .setDescription(`This is a reminder for <@&${myRole}> to vote on the server and do the daily tasks!`)
        .addFields(
            {name: 'What to do?', value: 'Simply do these 3 tasks to help us take over the world!'},
            {name: 'Vote on the website', value:'https://manacube.com/vote/', inline: true},
            {name: 'Do the basic commands', value:'/kingdom and /kit mana', inline: true},
            {name: 'Collect your daily reward', value:'Stay on the server for 1 hour, then /gary.', inline: true},
            { name: '\u200B', value: '\u200B' },
            {name: 'Problems?', value: 'If there are any problems with me, message my creator: Szpecter#8509'}
        )
        .setFooter('This bot is for this server only, it is a private bot.')
        .setTimestamp()

    dailyChannel.send(prisonReminder);
    })

    //PONDROLE 791775749853544459n
    var Pond1 = new CronJob('55 12 * * *', () => {
        let myRole = 791775749853544459n
        const dailyChannel = client.channels.cache.find(channel => channel.id === "789112310072737792")
        const pondReminder = new Discord.MessageEmbed()
        .setColor('#000763')
        .setTitle('Mana Pond!')
        .setDescription(`This is a reminder for <@&${myRole}> to get to the mana pond!`)
        .addFields(
            {name: 'What to do?', value: 'Join the server in 5 minutes and start fishing at the mana pond!'},
            {name: "Where's the fishing rod?", value:'/kit fishingrod', inline: true},
            {name: 'Any tips?', value:'To efficiently catch the items, aim your fishingrod a bit below the items so they hit the end of your fishing rod and then right-click to reel them in.', inline: true},
            { name: '\u200B', value: '\u200B' },
            {name: 'Problems?', value: 'If there are any problems with me, message my creator: Szpecter#8509'}
        )
        .setFooter('This bot is for this server only, it is a private bot.')
        .setTimestamp()

    dailyChannel.send(pondReminder);
    })

    var Pond2 = new CronJob('55 15 * * *', () => {
        let myRole = 791775749853544459n
        const dailyChannel = client.channels.cache.find(channel => channel.id === "789112310072737792")
        const pondReminder = new Discord.MessageEmbed()
        .setColor('#000763')
        .setTitle('Mana Pond!')
        .setDescription(`This is a reminder for <@&${myRole}> to get to the mana pond!`)
        .addFields(
            {name: 'What to do?', value: 'Join the server in 5 minutes and start fishing at the mana pond!'},
            {name: "Where's the fishing rod?", value:'/kit fishingrod', inline: true},
            {name: 'Any tips?', value:'To efficiently catch the items, aim your fishingrod a bit below the items so they hit the end of your fishing rod and then right-click to reel them in.', inline: true},
            { name: '\u200B', value: '\u200B' },
            {name: 'Problems?', value: 'If there are any problems with me, message my creator: Szpecter#8509'}
        )
        .setFooter('This bot is for this server only, it is a private bot.')
        .setTimestamp()

    dailyChannel.send(pondReminder);
    })

    var Pond3 = new CronJob('55 19 * * *', () => {
        let myRole = 791775749853544459n
        const dailyChannel = client.channels.cache.find(channel => channel.id === "789112310072737792")
        const pondReminder = new Discord.MessageEmbed()
        .setColor('#000763')
        .setTitle('Mana Pond!')
        .setDescription(`This is a reminder for <@&${myRole}> to get to the mana pond!`)
        .addFields(
            {name: 'What to do?', value: 'Join the server in 5 minutes and start fishing at the mana pond!'},
            {name: "Where's the fishing rod?", value:'/kit fishingrod', inline: true},
            {name: 'Any tips?', value:'To efficiently catch the items, aim your fishingrod a bit below the items so they hit the end of your fishing rod and then right-click to reel them in.', inline: true},
            { name: '\u200B', value: '\u200B' },
            {name: 'Problems?', value: 'If there are any problems with me, message my creator: Szpecter#8509'}
        )
        .setFooter('This bot is for this server only, it is a private bot.')
        .setTimestamp()

    dailyChannel.send(pondReminder);
    })

client.on('message', (message) => {
    if(!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if (command === 'ping'){
        client.commands.get('ping').execute(message, args, Discord)
    } 
    
    if (command === 'info'){
         client.commands.get('info').execute(message, args)
    }

    if (command === 'remind') {
        if (!Timer) {
            WardenDaily.start()
            Pond1.start()
            Pond2.start()
            Pond3.start()
            Timer = true
            message.channel.send("Reminders have started to appear. To change the time, ask Szpecter. To stop it, type !remind again")
        } else {
            WardenDaily.stop()
            Pond1.stop()
            Pond2.stop()
            Pond3.stop()
            Timer = false
            message.channel.send("Reminders have stopped appearing. To change the time, ask Szpecter. To start it, type !remind again")
        }
    }

    if (command === 'vanish') {
            message.channel.send('Warden, going out.').then(() => {
                client.destroy();
            })
        }
})


client.login(process.env.TOKENID)