import express from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';

const router = express.Router();



router.get('/', async (req, res) => {
    const { url } = req.query; // Get URL from query parameter
    
    if (!url) {
        return res.status(400).send("URL is required");
    }

    console.log(`Received URL: ${url}`);

    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const paragraphs = [];

        $('p').each((index, element) => {
            paragraphs.push($(element).text());
        });

        console.log(`Extracted ${paragraphs.length} paragraphs`);

        res.json({ paragraphs });  // Send the paragraphs as a JSON response
    } catch (error) {
        console.error(`Error scraping ${url}:`, error.message);
        res.status(500).send("Error scraping the page");
    }
});

export default router;