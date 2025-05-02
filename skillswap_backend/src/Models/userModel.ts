import mongoose, {Schema} from "mongoose";

interface User{
    username: string,
    email: string,
    password: string,
    skillswant: string[],
    skillshave: string[],
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
    skillswant: {
        type: [String],
        required: true,
        default: []
    },
    skillshave: {
        type: [String],
        required: true,
        default: []
    },
})


const UserSchema = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserModel))

export default UserSchema;