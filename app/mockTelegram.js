// mockTelegram.js
if (window.Telegram) {
    window.Telegram = {
        WebApp: {
            initDataUnsafe: {
                user: {
                    id: 123456,
                    username: "mockuser",
                    // perTap: 3,
                    // balance: 55555000,
                    // exchangeId: 5,
                    // TapLimit: 300,
                    // quickPerHour: 2000,
                    // increasePerSecond: 3,
                    // multitap: {
                    //     price: 50000,
                    //     level: 3
                    // },
                    // energyLimit: {
                    //     price: 50000,
                    //     level: 3
                    // },
                },
            },
            ready: () => console.log("Mock Telegram WebApp is ready"),
        },
    };
}
