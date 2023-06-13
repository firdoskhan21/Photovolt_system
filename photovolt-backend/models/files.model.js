const mongoose = require('mongoose');

const documentSchema = mongoose.Schema(
    {
        _id: {
            type: String,
            required: true,
            trim: true
        },
        originalfilename: {
            type: String,
            required: true,
            trim: true
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        file_url: {
            type: String,
            required: false
        },
        mimetype: {
            type: String,
            required: true
        },
        is_blocked: {
            type: Boolean,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Document = mongoose.model('File', documentSchema);

module.exports = Document;




