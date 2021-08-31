const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "vc-move",
    description: "moves a member from one vc to another",
    ownerOnly: false,
    options: [
        {
            type: 'USER',
            description: 'User to move',
            name: 'user',
            required: true,
        },
      {
            type: 'CHANNEL',
            description: 'channel to move user to',
            name: 'channel',
            required: true,
        },
    ],
    userperm: ["MOVE_MEMBERS"],
    botperm: ["MOVE_MEMBERS"],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {
        
        let member = interaction.options.getUser('user') || interaction.guild.members.cache.get(args[0]) || interaction.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase());

        if(!member) return interaction.editReply("Unable to find the mentioned user in this guild.")

        let channel = interaction.options.getChannel('channel') || bot.guilds.cache.get(interaction.guild.id).channels.cache.get(args[1]) || interaction.guild.channels.cache.find(c => c.name.toLowerCase() === args.slice(1).join(' ').toLocaleLowerCase());
        if (!channel.type === "GUILD_VOICE") return interaction.editReply("Unable to locate the voice channel. Make sure to mention a voice channel not a text channel!") 

        try {
            member.setChannel(channel);
            interaction.editReply("Success ✅ : Member Moved!")
        } 
        
        catch(error) {
            console.log(error);
            interaction.editReply(`Oops! An unknown error occured. Error: ${error}`)
        }

    }
}