const express = require("express");
const next = require("next");
const { schedule } = require("node-cron");
const { writeFile } = require("fs");
const { join } = require("path");
const dailyCombo = require("./data/dailyCombo.json");
const dailyCipher = require("./data/dailyCipher.json");
const MILLISECONDS_IN_DAY = 86400000;

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const WORDS = [
    "BLOCK",
    "CHAIN",
    "COINS",
    "PROOF",
    "TOKEN",
    "STAKE",
    "MINER",
    "TRADE",
    "DAPPS",
    "NODES",
    "BYTES",
    "ETHER",
    "SPEND",
    "ZCASH",
    "SWIPE",
    "ASSET",
    "LEDGER",
    "TRUST",
    "VALID",
    "HASH",
    "CURVE",
    "CLAIM",
    "SPLIT",
    "YIELD",
    "AUDI",
    "BATCH",
    "LIMIT",
    "MERGE",
    "PAYER",
    "TRACE",
    "BATCH",
    "CRYPTO",
];

function randomNumberGenerator(count, min, max) {
    const numbers = new Set();
    while (numbers.size < count) {
        const randomNumber = Math.floor(Math.random() * (max - min)) + min;
        numbers.add(randomNumber);
    }
    return Array.from(numbers);
}

function getRandomWord() {
    return (Math.floor(Math.random() * WORDS.length));
}

function updateDailyCipher() {
    const hiddenCipherDuration = Date.now() - dailyCipher.time;
    if (hiddenCipherDuration > MILLISECONDS_IN_DAY) {
        const uniqueWord = getRandomWord();
        const newWord = {
            time: Date.now(),
            word: uniqueWord
        };
        const filePath = join(process.cwd(), 'data', 'dailyCipher.json');
        writeFile(filePath, JSON.stringify(newWord, null, 2), 'utf-8', (err) => {
            if (err) {
                console.log("Error saving DailyCipher: ", err);
            } else {
                console.log("Successfully saved new Cipher");
            }
        });
    }
}

function updateDailyCombo() {
    const RANGE_MIN = 0;
    const RANGE_MAX = 68;
    const hiddenComboDuration = Date.now() - dailyCombo.time;

    if (hiddenComboDuration > MILLISECONDS_IN_DAY) {
        const uniqueRandomNumber = randomNumberGenerator(3, RANGE_MIN, RANGE_MAX);
        const newCombo = {
            time: Date.now(),
            firstItemID: uniqueRandomNumber[0],
            secondItemID: uniqueRandomNumber[1],
            thirdItemID: uniqueRandomNumber[2]
        };
        const filePath = join(process.cwd(), 'data', 'dailyCombo.json');
        writeFile(filePath, JSON.stringify(newCombo, null, 2), 'utf-8', (err) => {
            if (err) {
                console.log("Error saving DailyCombo: ", err);
            } else {
                console.log("Successfully saved new combo");
            }
        });
    }
}

schedule('0 0 * * * *', () => {
    updateDailyCombo();
    updateDailyCipher();
});

app.prepare().then(() => {
    const server = express();

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(3001, (err) => {
        if (err) throw err;
        console.log(' > Ready on http://localhost:3001');
    });

    updateDailyCombo();
});