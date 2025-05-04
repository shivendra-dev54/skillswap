import mongoose, {Schema} from "mongoose";

interface User{
    username: string,
    email: string,
    password: string,
    skillshave: string[],
    requests: {
        user: string,
        skill: string,
        type: string, // r - received or s - sent
        status: string, // a - accepted || r - rejected || p - pending
    }[],

}

const UserModel: Schema<User> = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    skillshave: {
        type: [String],
        required: true,
        default: []
    },
    requests: {
        type: [{}],
        required: true,
        default: []
    },
})


const UserSchema = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserModel))

export default UserSchema;