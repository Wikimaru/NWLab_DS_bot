const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = 
{
    data: new SlashCommandBuilder()
        .setName('ping2')
        .setDescription('Replies wint "Pong!"')
        
    ,
    async execute(interaction)
    {
        await interaction.reply('Pong!');
    }
}