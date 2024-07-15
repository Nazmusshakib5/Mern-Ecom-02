const mongoose = require('mongoose');
const LegalSchema = new mongoose.Schema({
        type: {type: String, unique: true, required: true},
        description: {type: String, required: true}
    },
    {timestamps: true, versionKey: false}
)
const LegalModel = mongoose.model('legals', LegalSchema)
module.exports = LegalModel