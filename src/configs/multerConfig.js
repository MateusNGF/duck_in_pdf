require('dotenv').config
const multer = require('multer')
const path = require('path')
const crypto = require("crypto")

const pathUp = path.resolve(__dirname, '..', '..', 'tmp', 'uploads')

module.exports = {
    dest: pathUp,
    storage: multer.diskStorage({
        destination: (req, file, cb) => { cb(null, pathUp) },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) { cb(err, null) }
                cb(null, `${hash.toString('hex')}-${file.originalname}`)
            })
        }
    }),
    limits: { fileSize: process.env.LIMIT_FILE_SIZE },
    fileFilter: (req, file, cb) => {
        const filetypes = /pdf/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Tipo de arquivo não suportado'));
        }
    }
}