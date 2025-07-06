
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({

    title:{
        type: String,
        required:true,
        trim: true
    },
    plot: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        require: true,
        trim: true
    },
    user:{
        type: mongoose.Schema.Type.ObjectId,
        ref: "User",
        required: true
    }

},{timestamps: true});

module.exports = mongoose.model("Movie", movieSchema);