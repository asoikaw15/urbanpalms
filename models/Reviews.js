import mongoose from "mongoose";
const Schema = mongoose.Schema



const ReviewSchema = new Schema({
    user: Schema.Types.ObjectId,
    content: String,
    last_update: {
        type: Date,
        default: new Date
    }
})

const Review = mongoose.model('Review', ReviewSchema)
export default Review;
