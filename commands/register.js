const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kayıt')
        .setDescription('Bir kullanıcıyı kayıt eder.')
        .addStringOption(option =>
            option.setName('steam')
                .setDescription('Steam profil linki')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('isim')
                .setDescription('Profil ismi')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('yaş')
                .setDescription('Yaş')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('nick')
                .setDescription('Oyun içi nick')
                .setRequired(true)),

    async execute(interaction) {
        const steam = interaction.options.getString('steam');
        const isim = interaction.options.getString('isim');
        const yaş = interaction.options.getInteger('yaş');
        const nick = interaction.options.getString('nick');

        const member = interaction.member;
        const kayıtRolü = interaction.guild.roles.cache.get(process.env.KAYIT_ROL_ID);
        const logKanalı = interaction.guild.channels.cache.get(process.env.LOG_KANAL_ID);

        if (kayıtRolü) {
            await member.roles.add(kayıtRolü);
        }

        await interaction.reply({
            content: `✅ Başarıyla kayıt oldun!\n**Steam:** ${steam}\n**İsim:** ${isim}\n**Yaş:** ${yaş}\n**Nick:** ${nick}`,
            ephemeral: true
        });

        if (logKanalı) {
            logKanalı.send({
                content: `📝 Yeni Kayıt:
- 👤 Kullanıcı: ${member}
- 🕹️ Nick: ${nick}
- 🔗 Steam: ${steam}
- 📛 İsim: ${isim}
- 🎂 Yaş: ${yaş}`
            });
        }
    }
};
