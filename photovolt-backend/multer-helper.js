const constants = require('./config');
const multer = require('multer');
const { GridFsStorage } = require("multer-gridfs-storage");

const storage = new GridFsStorage({
    url: constants.mongoDBUri,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = file.originalname;
            const fileInfo = {
                filename: filename,
                bucketName: constants.bucket
            };
            resolve(fileInfo);
        });
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 1000000 // max file size 1MB = 1000000 bytes
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.([^.]+)$/)) {
            return cb(
                new Error(
                    'only upload files with jpg, jpeg, png, pdf, txt, json, doc, docx, xslx, xls format.'
                )
            );
        }
        cb(undefined, true); // continue with upload
    }
});

module.exports = upload