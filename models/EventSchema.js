const mongoose = require("mongoose")

const EventSchema = new mongoose.Schema({
    name: {type: String, required: true},
    date: {type: String, required: true},
    creator: {type: mongoose.Types.ObjectId, required: true},
    creatorCNIC: {type: String, required: true}
}, {timestamps: true})

const Event = mongoose.model("Event", EventSchema)

module.exports = Event