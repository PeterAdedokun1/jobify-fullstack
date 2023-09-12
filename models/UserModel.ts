import mongoose, { Document, Model } from "mongoose";

interface User extends Document {
    name: string;
    email: string;
    password: string;
    lastName: string;
    location: string;
    role: "user" | "admin";
    avatar: string;
    avatarPublicId: string;
}

const userSchema = new mongoose.Schema<User>({
    name: String,
    email: String,
    password: String,
    lastName: {
        type: String,
        default: 'lastName',
    },
    location: {
        type: String,
        default: 'my city',
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    avatar: String,
   avatarPublicId: String,

})

userSchema.methods.toJSON = function () {
    let obj = this.toObject();
    delete obj.password;
    return obj
}

const UserModel: Model<User> = mongoose.model<User>("User", userSchema)
export default UserModel