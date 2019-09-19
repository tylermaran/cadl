const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { // Design
        type: String,
        required: true,
        timestamps: true
    },
    author: {
        type: String
    },
    category: {
        type: String
    },
    description: {
        type: String
    },
    designs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Design'
    }],
    profile_image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Design'
    },
    profile_file: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Design'
    }
});

module.exports = mongoose.model('Project', projectSchema);

