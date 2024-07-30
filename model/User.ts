import mongoose, { Model, Schema } from "mongoose";

interface UnlockedItemsInterface {
    id: string;
    price: number;
    level: number;
    profitPerHour: number;
}

interface DailyBoosterInterface {
    name: string;
    remains: number;
}

interface MultitapInterface {
    price: number,
    level: number;
}

interface RechargeLimitInterface {
    price: number,
    level: number;
}

export interface UserInterface extends Document {
    id: number;
    telegramID: string;
    balance: number;
    userLevel: string;
    unlockedItems: UnlockedItemsInterface[];
    profitPerHour: number;
    tapLimit: number;
    dayOnDailyReward: number;
    collectedDailyReward: boolean;
    collectedDailyCombo: boolean;
    collectedDailyCipher: boolean;
    selectedExchangeID: number;
    multitap: MultitapInterface;
    rechargeLimit: RechargeLimitInterface;
    comboCollected: number[];
    dailyBoosters: DailyBoosterInterface[];
    invitedFriendsList: number[];
}

const UnlockItemSchema: Schema<UnlockedItemsInterface> = new Schema({
    id: { type: String, required: true },
    price: { type: Number, requird: true },
    level: { type: Number, required: true },
    profitPerHour: { type: Number, required: true }

});

const UserSchema: Schema<UserInterface> = new Schema(
    {
        telegramID: { type: String, required: true, unique: true },
        balance: { type: Number, defualt: 0 },
        profitPerHour: { type: Number, default: 0 },
        unlockedItems: [{ type: [UnlockItemSchema], default: [] }]
    },
    {
        timestamps: true
    }
);

const User: Model<UserInterface> = mongoose.model<UserInterface>('User', UserSchema);
export { User };