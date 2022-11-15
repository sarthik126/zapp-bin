const mongoose = require('mongoose')

const zappData = new mongoose.Schema(
    { 
        link1: String, 
        context: String
    }
);

module.exports = mongoose.model("ZappData",zappData)