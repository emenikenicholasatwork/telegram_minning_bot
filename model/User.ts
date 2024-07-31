import mongoose, { Model, Schema } from "mongoose";

interface ItemCollectedInterface {
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


const UserItemsSchema: Schema<ItemCollectedInterface> = new Schema({
    id: { type: String, required: true },
    price: { type: Number, requird: true },
    level: { type: Number, required: true },
    profitPerHour: { type: Number, required: true }

});
export interface UserInterface extends Document {
    id: number;
    telegramID: string;
    balance: number;
    userLevel: string;
    userItems: ItemCollectedInterface[];
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

const UserSchema: Schema<UserInterface> = new Schema(
    {
        telegramID: { type: String, required: true, unique: true },
        balance: { type: Number, defualt: 0 },
        profitPerHour: { type: Number, default: 0 },
        userItems: [{ type: [UserItemsSchema], default: [] }],
        userLevel: { type: String, default: "Broonze" },
        tapLimit: { type: Number, default: 1500 },
        dayOnDailyReward: { type: Number, default: 1 },
        collectedDailyCipher: { type: Boolean, default: false },
        collectedDailyCombo: { type: Boolean, default: false },
        collectedDailyReward: { type: Boolean, default: false },
        comboCollected: [{ type: Number }],
        multitap: { type: {} }
    },
    {
        timestamps: true
    }
);

const User: Model<UserInterface> = mongoose.model<UserInterface>('User', UserSchema);
export { User };