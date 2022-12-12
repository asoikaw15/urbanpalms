import mongoose from "mongoose";
const Schema = mongoose.Schema



const UserSchema = new Schema({
    username: String,
    password: String,
    name: String,
    reviews: [{
        type: Schema.Types.ObjectId
    }]
})

const User = mongoose.model('User', UserSchema)
export default User
