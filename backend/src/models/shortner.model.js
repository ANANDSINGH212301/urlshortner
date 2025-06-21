import mongoose, { mongo } from "mongoose";

const shorturlmodel = new mongoose.Schema({
    full_url:{
        type: String,
        require: true
    },
    short_url:{
        type: String,
        require: true,
        index: true,
        unique: true,
    },
    clicks:{
        type: Number,
        require: true,
        default: 0,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }
})

const shortSchema = mongoose.model("shortSchema", shorturlmodel)

export default shortSchema