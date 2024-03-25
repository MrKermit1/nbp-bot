require('dotenv').config()
const { REST, Routes } = require('discord.js')

const commands = [
    {
        name: 'waluty',
        description: 'o to waluty'
    },
]

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log("Rejestrowanie komend...")
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID)
            ,{ body: commands }
        );
        
        console.log("Wszystko ok")

    } catch (error) {
        console.log("ERROR: " + error)
    }
})();