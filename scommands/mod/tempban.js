const { db } = require('../../Database.js');
const moment = require('moment');
const ms = require('ms');
const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "tempban",
    description: "Temporary Ban a User",
    ownerOnly: false,
    options: [
        {
            type: 'USER',
            description: 'User to tempmute',
            name: 'user',
            required: true,
        },
       {
            type: 'STRING',
            description: 'Time till tempban',
            name: 'time',
            required: true,
        },
{
            type: 'STRING',
            description: 'Reason to tempban',
            name: 'reason',
            required: true,
        },
    ],
    userperm: ["BAN_MEMBERS"],
    botperm: ["BAN_MEMBERS"],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args, message) => {
		const reason = args.splice(2).join(" ");
		const tbuser = interaction.options.getUser('user') || interaction.guild.members.cache.get(args[0]);
		const regex = args.splice(1).join(" ");
		if(tbuser === interaction.guild.me) {
			return interaction.editReply("Why you wanna ban me!!");
      }
	
		if (tbuser.id == interaction.author.id) {
			return interaction.editReply("Really!! Are you going to ban yourself..");
		}
		if(tbuser.roles.highest.position >= message.member.roles.highest.position) {
			return interaction.editReply("You cant ban that person\nreason: Highest perms or roles");
		}

		if(tbuser.id == interaction.guild.owner.id) {
			return interaction.editReply("I think you cant have that role to ban Owner");
		}
		if(!reason) reason = "No Reason Provided";
		
		const tbuembed = new MessageEmbed()
			.setTitle(" Youhave been banned!")
			.setColor("#F4B3CA")
			.addField("Reason:", reason)
			.addField("Time (s)", regex)
			.addField("Moderator:", message.author.username);
		tbuser.send(tbuembed);
		const tbembed = new MessageEmbed()
			.setTitle("Action: Tempban")
			.addField("User:", tbuser)
			.setAuthor(`${interaction.user.username}`)
			.setColor("#F4B3CA")
			.addField("Reason:", reason)
			.addField("Time (s)", regex)
			.addField("Moderator:", interuserna.userusername);
      
		interaction.editReply(tbembed);
		tbuser.send({embeds: [ tbuembed ]});
		
		tbuser.ban({reason: reason }).then(() => {
      setTimeout( function (){
		interaction.editReply(`<@${tbuser.id} has been unbanned after tempban of ${regex}`);
		}, ms(regex));
		return undefined;
	})
	}
}