const Discord = require('discord.js')

module.exports= {
    name: "info",
    description:"Gives information about the bot.",
    execute(message, args){
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#000763')
        .setTitle('Information')
        .setAuthor('Szpecter')
        .addFields(
            {name: 'About me!', value: 'I am created by Szpecter to remind people of their daily activities.'},
            {name: 'Problems?', value: 'If there are any problems with me, message my creator: Szpecter#8509'}
        )
        .setFooter('This bot is for this server only, it is a private bot.')
        .setTimestamp()

        message.channel.send(newEmbed)
    }
}