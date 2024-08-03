// mockTelegram.js
if (window.Telegram) {
    window.Telegram = {
        WebApp: {
            initDataUnsafe: {
                user: {
                    id: 123456,
                    username: "mockuser",
                },
            },
            ready: () => console.log("Mock Telegram WebApp is ready"),
        },
    };
}
