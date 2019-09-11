const mongoose = require('mongoose');

const designSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { // Design
        type: String,
        required: true,
        timestamps: true
    },
    file: {
        type: String,
        required: true,
        timestamps: true
    },
    ext: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    config: {
        mm: {
            type: Boolean,
            default: true
        },
        rotate: {
            type: Array,
            default: [0, 0, 0]
        },
        translate: {
            type: Array,
            default: [0, 0, 0]
        },
        center: {
            type: Array,
            default: [0, 0]
        },
        object_color: {
            type: String,
            default: "0x4287f5"
        }
    },
    note: {
        type: String
    }, 
    author: {
        type: String
    }
});

module.exports = mongoose.model('Design', designSchema);

