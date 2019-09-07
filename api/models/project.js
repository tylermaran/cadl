const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { // Design
        type: String,
        required: true,
        timestamps: true
    },
    category: {
        type: String
    },
    description: {
        type: String
    },
    files: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Design',
        unique: true
    }
});

module.exports = mongoose.model('Project', projectSchema);

