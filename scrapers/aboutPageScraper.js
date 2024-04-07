const puppeteer = require('puppeteer');

async function scrapeAboutPage(url) {
    let browser;
    try {
        browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            headless: true
        });

        const page = await browser.newPage();

        await page.setDefaultNavigationTimeout(60000);

        await page.goto(url);

        const bodyContent = await page.evaluate(() => document.body.innerText);

        return bodyContent;
    } catch (error) {
        console.error('Error scraping about page:', error);
        return null;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

module.exports = scrapeAboutPage;
