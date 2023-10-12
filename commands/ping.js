const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = 
{
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies wint "Pong!"')
        
    ,
    async execute(interaction)
    {
        //const role = interaction.member.roles.cache.find(r => r.name === process.env.EDITER_ROLE)
        //console.log(role)
        //const hasRole = interaction.member.roles.cache.some(r => r.name === process.env.EDITER_ROLE)
        //console.log(hasRole)
        await interaction.reply('Pong!');
    }
}