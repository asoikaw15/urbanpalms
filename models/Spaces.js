import mongoose from "mongoose";
const Schema = mongoose.Schema

const ImageSchema = new Schema({
    url: String,
    filename: String
});

const randomRating = Math.floor(5).toFixed(2)

const SpaceSchema = new Schema({
    name: String,
    roomNumber: Number,
    address: String,
    isOccupied: Boolean,
    pricePerNight: Number,
    image: [ImageSchema],
    rating: {
        type: Number,
        default: randomRating
    }

})

const Space = mongoose.model('Space', SpaceSchema)
export default Space;
