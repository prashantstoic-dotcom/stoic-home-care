const puppeteer = require('puppeteer');
const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Enterprise SEO Tool: DOM vs Source HTML Analyzer
 * This script compares what a basic crawler sees (Source) vs what Googlebot sees (Rendered DOM).
 */
async function analyzeJsSeo(url) {
    console.log(`\n--- Starting JS SEO Analysis for: ${url} ---`);

    try {
        // 1. Fetch Source HTML (Like a basic crawler / curl)
        const { data: sourceHtml } = await axios.get(url);
        const $source = cheerio.load(sourceHtml);
        const sourceH1 = $source('h1').text().trim();
        const sourceLinks = $source('a').length;

        console.log(`[SOURCE HTML - Fast Crawl]`);
        console.log(`H1 Tag: ${sourceH1 || 'MISSING'}`);
        console.log(`Total Links found: ${sourceLinks}`);

        // 2. Fetch Rendered DOM (Like Googlebot with JS enabled)
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        
        // Emulate Googlebot user agent
        await page.setUserAgent('Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/W.X.Y.Z Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)');
        
        await page.goto(url, { waitUntil: 'networkidle2' });
        
        const domHtml = await page.content();
        const $dom = cheerio.load(domHtml);
        const domH1 = $dom('h1').text().trim();
        const domLinks = $dom('a').length;

        console.log(`\n[RENDERED DOM - Googlebot View]`);
        console.log(`H1 Tag: ${domH1 || 'MISSING'}`);
        console.log(`Total Links found: ${domLinks}`);

        // 3. Diff Analysis
        console.log(`\n[ANALYSIS RESULTS]`);
        if (sourceH1 !== domH1) {
            console.error(`❌ SEO ISSUE: H1 tags do not match! (Source: "${sourceH1}" vs DOM: "${domH1}") - This means JS is heavily modifying critical content.`);
        } else {
            console.log(`✅ H1 tags match.`);
        }

        if (domLinks > sourceLinks) {
            console.error(`❌ SEO ISSUE: ${domLinks - sourceLinks} links are only injected via JavaScript. Googlebot might miss crawling them if rendering fails or timeouts.`);
        } else {
            console.log(`✅ Link counts are consistent.`);
        }

        await browser.close();

    } catch (error) {
        console.error('Error analyzing URL:', error.message);
    }
}

// Example Execution
// analyzeJsSeo('https://example-react-spa.com');
