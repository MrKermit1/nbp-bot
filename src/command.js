require('dotenv').config()
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js')

const commands = [
    {
        name: 'waluty',
        description: 'kurs wybranej waluty',
        options: [
            {
                name: 'kod-waluty',
                description: 'skrót waluty',
                type: ApplicationCommandOptionType.String,
                required: true,
            }
        ]
    },
    {
        name: 'jakie-sa-kody',
        description: 'zwraca skróty dostępnych walut',
        options:[
            {
                name: 'nazwa-waluty',
                description: 'pełna nazwa waluty',
                type: ApplicationCommandOptionType.String,
                required: false,
            }
        ]
    }
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