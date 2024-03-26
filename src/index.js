require('dotenv').config()

const { Client, IntentsBitField } = require('discord.js')

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
})

const walutyApi = 'https://api.nbp.pl/api/exchangerates/tables/c/?format=json'


client.on('ready', (c) => {
    console.log(`${c.user.username} jest online`)
})

client.on('messageCreate', (m) => {
    if (m.author.bot) {
        return;
    }
})

const apiTab = [];

client.on('interactionCreate', (i) => {
    if (!i.isChatInputCommand()) {
        return;
    }

    if (i.commandName === 'waluty') {
        
        fetch('https://api.nbp.pl/api/exchangerates/tables/c/?format=json')
        .then(res => res.json())
        .then((data) => {
            for (let i = 0; i < data[0].rates.length; i++) {
                apiTab.push(data[0].rates[i]);
            }
            
            const valCode = i.options.get('kod-waluty')
            
            const output = apiTab.find((element) => element.code == valCode.value.toUpperCase())

            if (!output) {
                i.reply("coś ci się pomyliło")
                return;
            }

            console.log(output)

            i.reply(`Nazwa: ${output.currency}\rKupno: ${output.bid} PLN\rSprzedaż: ${output.ask} PLN`)

        })
        .catch(err => console.log(err))

    }
})

client.login(process.env.TOKEN)