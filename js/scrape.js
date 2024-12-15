import axios from 'axios';
import * as cheerio from 'cheerio';

export  default async function scrapePTags(url) {
    try {
        console.log(`Fetching page: ${url}...`);
        
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36'
            },
            timeout: 15000
        });

        console.log('Page fetched successfully. Extracting <p> tags...');
        
        const $ = cheerio.load(response.data);
        const pTags = [];
        $('p').each((index, element) => {
            const text = $(element).text().trim();
            if (text) pTags.push(text);
        });

        console.log(`Extracted ${pTags.length} paragraphs from ${url}`);
        return pTags;
    } catch (error) {
        console.error(`Error scraping ${url}:`, error.message);
        return [];
    }
}
(async () => {
    const data = await scrapePTags(" https://www.bbc.com/news/articles/c89xew5nvx5o");
    console.log(data);
    
})();