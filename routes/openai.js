const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/completion', async (req, res) => {
    try {
        const openapiKey = req.headers['openapikey'];
        if (!openapiKey) {
            return res.status(400).json({ error: 'OpenAPI key not provided' });
        }

        const requestData = {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: req.body.message }]
        };

        const response = await axios.post('https://api.openai.com/v1/chat/completions', requestData, {
            headers: {
                'Authorization': `Bearer ${openapiKey}`,
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error processing chat completion:', error.response.data);
        if (error.response && error.response.data && error.response.data.error) {
            res.status(500).json({ error: error.response.data.error.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

router.post('/create', async (req, res) => {
    try {
        const { message, openapikey } = req.body;
        console.log(message, openapikey);

        if (!message || !openapikey) {
            return res.status(400).json({ error: 'Message or OpenAPI key not provided' });
        }

        const response = await axios.post('http://localhost:5000/openai/completion', { message }, {
            headers: {
                'openapikey': openapikey,
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;