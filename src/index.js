require('dotenv').config()

const { Client, IntentsBitField } = require('discord.js')

let apiData;
let apiTab = []
let codeTab = []
fetch('https://api.nbp.pl/api/exchangerates/tables/c/?format=json')
        .then(res => res.json())
        .then((data) => {

            apiData = data[0].rates

            apiData.forEach(element => {
                apiTab.push(element)
            });

            apiData.forEach(element => {
                codeTab.push(`Waluta: ${element.currency}\rSkrót: ${element.code}\r`)
            });

        })

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



client.on('interactionCreate', (i) => {
    if (!i.isChatInputCommand()) {
        return;
    }

    if (i.commandName === 'waluty') {
        //const element = apiData[i];
        const valCode = i.options.get('kod-waluty')
        
        const output = apiTab.find((element) => element.code == valCode.value.toUpperCase())
        console.log(apiTab)
        i.reply(`Nazwa: ${output.currency}\rKupno: ${output.bid} PLN\rSprzedaż: ${output.ask} PLN`)
        

    }

    if (i.commandName ==='jakie-sa-kody') {
        let msg = "";

        if ((i.options.get('nazwa-wauty'))) {
            
            //trzeba pomyśleć

        }else{
            codeTab.forEach((element) => {
                msg += element
            })

            i.reply(msg);
        }
    }
})

client.login(process.env.TOKEN)