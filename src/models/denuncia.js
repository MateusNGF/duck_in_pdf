require("dotenv").config();
const mongoose = require("mongoose");

const DenunciaShema = new mongoose.Schema({
    idDocument: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Documento",
        index: true,
        unique: true,
    },
    complaints: [
        {
            sentBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Usuario",
                required: true,
            },
            motive: {
                type: String,
                required: true,
                index: true,
            },
            sentAt: {
                type: Date,
                default: Date.now(),
            },
        },
    ],
});

DenunciaShema.set({ autoIndex: false });

module.exports = mongoose.model("Denuncia", DenunciaShema);
