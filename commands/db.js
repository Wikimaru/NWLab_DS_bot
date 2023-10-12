const {SlashCommandBuilder} = require('@discordjs/builders');
const {InsertData,EditName,EditPrice,DeleteData} = require('../Service/dataService')

module.exports = 
{
    data: new SlashCommandBuilder()
        .setName('db')
        .setDescription('Manage Database')
        .addSubcommand(subcommand => 
            subcommand
                .setName("create")
                .setDescription("create")
                .addStringOption(option =>
                    option.setName("barcode_id").setDescription("barcode id").setRequired(true).setMaxLength(64).setMinLength(1)
                )
                .addStringOption(option =>
                    option.setName("product_name").setDescription("product name").setRequired(true).setMaxLength(64).setMinLength(1)
                )
                .addIntegerOption(option =>
                    option.setName("product_price").setDescription("product price").setRequired(true).setMinValue(1).setMaxValue(1000)
                )
            )
        .addSubcommand(subcommand => 
            subcommand.setName("editname").setDescription("Edite Product Name")
            .addStringOption(option =>
                option.setName("barcode_id").setDescription("barcode id").setRequired(true).setMaxLength(64).setMinLength(1)
            )
            .addStringOption(option =>
                option.setName("product_name").setDescription("product name").setRequired(true).setMaxLength(64).setMinLength(1)
            )
        )
        .addSubcommand(subcommand => 
            subcommand.setName("editprice").setDescription("Edite Product Price")
            .addStringOption(option =>
                option.setName("barcode_id").setDescription("barcode id").setRequired(true).setMaxLength(64).setMinLength(1)
            )
            .addIntegerOption(option =>
                option.setName("product_price").setDescription("product price").setRequired(true).setMinValue(1).setMaxValue(1000)
            )
        )
        .addSubcommand(subcommand => 
            subcommand.setName("delete").setDescription("delete product data")
            .addStringOption(option =>
                option.setName("barcode_id").setDescription("barcode id").setRequired(true).setMaxLength(64).setMinLength(1)
            )
        )
    ,
    async execute(interaction)
    {
        //await interaction.reply('work');
        const hasRole = interaction.member.roles.cache.some(r => r.name === process.env.EDITER_ROLE)
        console.log(hasRole)
        if (hasRole == false)
        {   
            interaction.reply("u don't have permission :3")
        }
        else
        {
            if (interaction.options.getSubcommand() === "create")
            {
                let p_id = interaction.options.getString("barcode_id")
                let p_name = interaction.options.getString("product_name")
                let p_price = interaction.options.getInteger("product_price")
                var editer_username = interaction.user.username
                console.log(editer_username)
                InsertData(p_id,p_name,p_price,editer_username,interaction)
            }
            else if(interaction.options.getSubcommand() === "editname") 
            {
                let p_id = interaction.options.getString("barcode_id")
                let p_name = interaction.options.getString("product_name")
                var editer_username = interaction.user.username
                EditName(p_id,p_name,editer_username,interaction)
            }
            else if(interaction.options.getSubcommand() === "editprice") 
            {
                let p_id = interaction.options.getString("barcode_id")
                let p_price = interaction.options.getInteger("product_price")
                var editer_username = interaction.user.username
                EditPrice(p_id,p_price,editer_username,interaction)
            }
            else if(interaction.options.getSubcommand() === "delete") 
            {
                let p_id = interaction.options.getString("barcode_id")
                var editer_username = interaction.user.username
                DeleteData(p_id,editer_username,interaction)
            }
            else
            {
                await interaction.reply('not_work');
            }
        }
    }
}