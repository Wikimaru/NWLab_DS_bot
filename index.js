require('dotenv').config();
//------------------------------Discord_BOT-------------------------------------------
const { REST } = require('@discordjs/rest');
const { error } = require('console');
const { Routes } = require('discord-api-types/v9');
const { Client, GatewayIntentBits ,Collection} = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

//List of all commands
const commands = [];
client.commands = new Collection();

const commandPath = path.join(__dirname,"commands");
const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles)
{
    const filepath = path.join(commandPath,file);
    const command = require(filepath);

    client.commands.set(command.data.name,command);
    commands.push(command.data.toJSON());
}

client.on("ready",() => {
    //Get all ids of the servers
    const guild_ids = client.guilds.cache.map(guild => guild.id);

    const rest = new REST({version : '9'}).setToken(process.env.TOKEN);
    for (const guildId of guild_ids)
    {
        rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID,guildId),
            {body:commands})
        .then(() => console.log('Successfully update commands for guild ' + guildId))
        .catch(console.error);
            
    }
})

client.on("interactionCreate",async interaction => {
    if(!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if(!command) return;

    try
    {
        await command.execute(interaction);
    }
    catch
    {
        console.error(error);
        await interaction.reply({content : "There was an error executing this command"});
    }
})

client.login(process.env.TOKEN);

//------------------------------HTTP_Server------------------------------------------------
const http = require("http");
const PORT = process.env.PORT || 5000;
const {getProducts , getProduct} = require('./controllers/productController')
//------------------------------Server_Setup-----------------------------------------------
const server = http.createServer(async (req, res) => {
    //set the request route
    if (req.url === "/api" && req.method === 'GET') {
        getProducts(req,res);
        //response headers
        //res.writeHead(200, { "Content-Type": "application/json" });
        //set the response
        //res.write("Hi there, This is a Vanilla Node.js API");
        //end the response
        //res.end();
    }
    else if(req.url.match(/\/api\/products\/.+/) && req.method === 'GET')
    {
        const id = req.url.split('/')[3];
        console.log(id);
        getProduct(req,res,id);
    }

    // If no route present
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});

//------------------------------------------------------------------------------------------
//docker run --name=wikimaru_MYSQL -e MYSQL_ROOT_PASSWORD=1234 -e MYSQL_DATABASE=wikimaru_MYSQL -p 3306:3306 -d mysql
//docker run --name myadmin -d --link wikimaru_MYSQL:db -p 8081:80 phpmyadmin/phpmyadmin