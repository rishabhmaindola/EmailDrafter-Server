const puppeteer = require('puppeteer');

async function scrapeAboutPage(url) {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.setDefaultNavigationTimeout(60000);
        await page.goto(url);

        const bodyContent = await page.evaluate(() => document.body.innerText);

        await browser.close();

        return bodyContent;
    } catch (error) {
        console.error('Error scraping about page:', error);
        return null;
    }
}

module.exports = scrapeAboutPage;
