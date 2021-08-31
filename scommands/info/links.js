const { CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'links',
    description: 'check the bots links',
    
    run: async (bot, interaction, args) => {
        
        const links = new MessageEmbed()
    .setTitle('<a:hi:873308382868672602>  Hello!')
    .setDescription('Thank you for checking my links! here is all of my support links! make sure you joined our support server if you want to something \:>')
    .addField('<:help:872851064452435978> Support Server', '[Click Me](tt)')
    .addField('<a:duckparty:870928436573634581> Invite me','[Invite me](noob)')
    .addField('<:ee:878627845709107211> Website', 'soon <a:hype:878628211305631775> ')
    .addField('<:vote:877972532916011039> Top.gg', '[Click Me](0)')
    .addField('<:bot:872851667324895272> discordbotlist', '[Click me](e)')
    .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
    .setColor('#F4B3CA')
    .setFooter('🔗 Comfi Links');
        
         interaction.followUp({ embeds: [ links ] });
    }
}