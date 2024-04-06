const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Prompt = require('../models/PromptSchema');

router.use(bodyParser.json());

router.post('/new', async (req, res) => {
    const { prompt } = req.body;
    try {
        const newPrompt = new Prompt({ label: prompt });
        await newPrompt.save();
        res.status(200).json({ message: 'Prompt saved successfully' });
    } catch (error) {
        console.error('Error saving prompt:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/prompts', async (req, res) => {
    try {
        const prompts = await Prompt.find();
        res.status(200).json(prompts);
    } catch (error) {
        console.error('Error fetching prompts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPrompt = await Prompt.findByIdAndDelete(id);
        if (!deletedPrompt) {
            return res.status(404).json({ error: 'Prompt not found' });
        }
        res.status(200).json({ message: 'Prompt deleted successfully' });
    } catch (error) {
        console.error('Error deleting prompt:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;