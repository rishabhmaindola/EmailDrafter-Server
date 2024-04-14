const express = require('express');
const puppeteer = require('puppeteer');

const router = express.Router();

async function scrapeWebsite(url) {
    let browser;
    try {
        browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            headless: true
        });
        
        const page = await browser.newPage();

        // Set a timeout for the page to load
        await page.setDefaultNavigationTimeout(60000); // 60 seconds

        await page.goto(url);

        // Wait for the body content to load
        await page.waitForSelector('body');

        const bodyContent = await page.evaluate(() => document.body.innerText);

        return bodyContent;
    } catch (error) {
        console.error('Error scraping website:', error);
        return null;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

router.post('/info', async (req, res) => {
    const { websiteUrl, aboutPageUrl } = req.body;

    // Input validation
    if (!websiteUrl || !aboutPageUrl) {
        return res.status(400).json({ error: 'Missing websiteUrl or aboutPageUrl in request body' });
    }

    try {
        const [websiteInfo, aboutPageInfo] = await Promise.all([
            scrapeWebsite(websiteUrl),
            scrapeWebsite(aboutPageUrl)
        ]);
        
        // Check if both scraping operations were successful
        if (websiteInfo !== null && aboutPageInfo !== null) {
            return res.status(200).json({ website: websiteInfo, about: aboutPageInfo });
        } else {
            return res.status(400).json({ error: 'Failed to scrape website' });
        }
    } catch (error) {
        console.error('Error handling request:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
