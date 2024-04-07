const express = require('express');
const router = express.Router();
const scrapeWebsite = require('../scrapers/websiteScraper');
const scrapeSitemap = require('../scrapers/aboutPageScraper');

router.post('/info', async (req, res) => {
    const { websiteUrl, aboutPageUrl } = req.body;
    console.log(websiteUrl, aboutPageUrl);
    try {
        const [websiteInfo, aboutPageInfo] = await Promise.all([
            scrapeWebsite(websiteUrl),
            scrapeSitemap(aboutPageUrl)
        ]);
        if (websiteInfo && aboutPageInfo) {
            res.status(200).json({ website: websiteInfo, about: aboutPageInfo });
        } else {
            res.status(400).json({ error: 'Failed to scrape website' });
        }
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
