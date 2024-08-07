const { Telegraf } = require("telegraf");
const TOKEN = "6730911696:AAGGI_xTz8aWvWmdRht5QtBotIAxQQ0vSSY";
const bot = new Telegraf(TOKEN);

const web_link = "https://mining-bot-48179.web.app";

bot.start((ctx) => {
    const user = ctx.message.from;
    const payload = ctx.payload;
    const userName = user.username ? `@${user.username}` : user.first_name;
    const urlSent = `${web_link}?ref=${payload}`; // Example of using user ID for tracking

    ctx.reply(
        `*Hey, ${userName} Welcome to Quick Token* Tap on the coin and see your balance rise

        *Quick Token* is a Decentralized Exchange on the TON Blockchain

        Got friends, relatives, co-workers?
        Bring them all into the game
        More buddies, more coins`,
        {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Start now", web_app: { url: urlSent } }]
                ]
            }
        }
    );
});

bot.launch();
