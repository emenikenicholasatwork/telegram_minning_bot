import mongoose, { Model, Schema } from "mongoose";

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
    tapLimit: number;
    selectedExchangeID: number;
    multitap: MultitapInterface;
    rechargeLimit: RechargeLimitInterface;
    dailyBoosters: DailyBoosterInterface[];
    invitedFriendsList: number[];
}

const UserSchema: Schema<UserInterface> = new Schema(
    {
        telegramID: { type: String, required: true, unique: true },
        balance: { type: Number, defualt: 0 },
        userLevel: { type: String, default: "Broonze" },
        tapLimit: { type: Number, default: 1500 },
        multitap: { type: {} }
    },
    {
        timestamps: true
    }
);

const User: Model<UserInterface> = mongoose.model<UserInterface>('User', UserSchema);
export { User };