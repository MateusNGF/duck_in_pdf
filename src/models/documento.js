require("dotenv").config();
const mongoose = require("mongoose");

let URL_FILE = `${process.env.DOMAIN}:${process.env.PORT}`

const DocumentoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    postedBy: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario",
        },
        name: {
            type: String,
            required : true
        }
    },
    name: String,
    key: {
        type: String,
        unique: true,
    },
    size: Number,
    url: String,
    tags: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Marcador",
                index: true,
            },
            name: {
                type: String,
                required: true,
                index: true,
            },
        },
    ],
    votes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario",
        },
    ],
    comments: [
        {
            content: {
                type: String,
                required: true,
            },
            postedBy: {
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Usuario",
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                    index: true,
                },
                urlProfile: String,
            },
            creatAt: {
                type: Date,
                default: Date.now(),
            },
            updateAt: {
                type: Date,
                default: Date.now(),
            },
        },
    ],
    creatAt: {
        type: Date,
        default: Date.now(),
    },
    updateAt: {
        type: Date,
        default: Date.now(),
    },
});

DocumentoSchema.pre("save", function () {
    if (!this.url) {
        this.url = `${URL_FILE}/files/${this.key}`;
    }
});

DocumentoSchema.set({ autoIndex: false });

module.exports = mongoose.model("Documento", DocumentoSchema);
