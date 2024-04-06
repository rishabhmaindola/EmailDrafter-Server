const mongoose = require('mongoose');

const PromptSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    label: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Prompt = mongoose.model('Prompt', PromptSchema);

module.exports = Prompt;