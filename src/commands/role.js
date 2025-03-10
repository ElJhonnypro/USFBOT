const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
function YesNo (parameter) {
	if (parameter) {
		return 'Yes';
	} else {
		return 'No';
	}
}
//
module.exports={
    data: new SlashCommandBuilder().setName('role').setDescription('Get Role Informations')
        .addRoleOption(option=>option.setName('target').setDescription('Target Role to check').setRequired(true))
        .setDMPermission(false),
    async execute(interaction) {
        await interaction.deferReply();
        const role = interaction.options.getRole('target');
        const rolePos = interaction.guild.roles.cache.size - role.position;
        const rolbed = new EmbedBuilder()
            .setTitle(`${role.name} Role Information`)
            .setDescription(`**Mention:** \`<@&${role.id}>\` | **ID:** \`${role.id}\``)
            .addFields(
                { name: 'Role Created Date', value: `<t:${Math.floor(role.createdTimestamp/1000)}:F>`, inline: true },
                { name: 'Role Hoisted', value: `${YesNo(role.hoist)}`, inline: true },
                { name: '\u200B', value: '\u200B' },
                { name: 'Role Position', value: `${rolePos}`, inline: true },
                { name: 'Role HEX Color', value: `${role.hexColor}`, inline: true },
                { name: 'Role Mentionable', value: `${role.mentionable}`, inline: true },
            )
            .setColor(role.hexColor);
            let rolePerms = role.permissions.toArray();
            if (rolePerms.length > 0) {
                let rolePermsList = '';
                for (let i = 0; i < rolePerms.length; i++) {
                    rolePermsList += `- ${rolePerms[i]}\n`;
                }
                rolbed.addFields({ name: 'Role Permissions', value: `${rolePermsList}` });
            }
        if (role.icon) {
            rolbed.setThumbnail(role.iconURL({ size: 2048 }));
        }
        return interaction.editReply({embeds: [rolbed]});
    },
};