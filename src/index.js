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

const walutyApi = 'https://api.nbp.pl/api/exchangerates/tables/a/?format=json'


client.on('ready', (c) => {
    console.log(`${c.user.username} jest online`)
})

client.on('messageCreate', (m) => {
    if (m.author.bot) {
        return;
    }

    if (m.content === 'kocham glapinskiego') {
        m.reply('ja też')
    }
})

client.on('interactionCreate', (i) => {
    if (!i.isChatInputCommand()) {
        return;
    }

    if (i.commandName === 'waluty') {
        
        fetch('https://api.nbp.pl/api/exchangerates/tables/a/?format=json')
        .then(res => res.json())
        .then((data) => {
            console.log(data[0].rates[0])
            //i.reply(JSON.stringify(data[0].rates[0]))
            let tab = data[0].rates;
            let msg = "";
            for (let i = 0; i < tab.length; i++) {
                msg += "\r" + JSON.stringify(tab[i])
            }

            i.reply(msg);
            console.log(msg)

        })
        .catch(err => console.log(err))

    }
})

client.login(process.env.TOKEN)