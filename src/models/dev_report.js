require("dotenv").config();
const mongoose = require("mongoose");

const DevReportSchema = new mongoose.Schema({
    email: {
        type: String,
        required : false,
    },
    name: {
        type: String,
        required: false,
        default : "Annonymous"
    },
    github: {
        type: String,
        required: false
    },
    risco: {
        type: Number,
        required: true,
    },
    menssage: {
        type: String,
        required : true,
    },
    sentAt: {
        type: Date,
        default: Date.now(),
    },
});

DevReportSchema.set({ autoIndex: false });

module.exports = mongoose.model("Dev_Report", DevReportSchema);
