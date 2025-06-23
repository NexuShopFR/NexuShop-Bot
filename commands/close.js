const { EmbedBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
  name: 'close',
  async execute(message) {
    const channel = message.channel;
    const STAFF_ROLE_ID = process.env.STAFF_ROLE_ID;
    const TICKET_LOG_CHANNEL_ID = process.env.TICKET_LOG_CHANNEL_ID;

    // Vérifie que le salon est dans une catégorie "ticket"
    if (!channel.parent || !channel.parent.name.toLowerCase().includes('ticket')) return;

    const isStaff = message.member.roles.cache.has(STAFF_ROLE_ID);
    if (!isStaff) return;

    const embed = new EmbedBuilder()
      .setTitle('🎟️ Ticket Fermé')
      .setDescription(`Le ticket **${channel.name}** a été fermé par ${message.author}`)
      .setColor('Red')
      .setTimestamp();

    const logChannel = message.guild.channels.cache.get(TICKET_LOG_CHANNEL_ID);
    if (logChannel) logChannel.send({ embeds: [embed] });

    await channel.send('✅ Fermeture dans 3 secondes...');
    setTimeout(() => {
      channel.delete().catch(() => {});
    }, 3000);
  }
};
