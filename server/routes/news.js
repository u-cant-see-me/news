import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req, res) => {
    const apiKey = '5d85911247de45da875f3b9278ac47fb'; 
    const { query = '', endpoint = 'everything' } = req.query;

    let url = '';
    const params = {};

    if (endpoint === 'topheadline') {
        url = 'https://newsapi.org/v2/top-headlines';
        params.country = 'us';
        params.apiKey = apiKey;
    } else {
        url = 'https://newsapi.org/v2/everything';
        params.q = query; 
        params.apiKey = apiKey;
    }

    try {
        const newsApiRes = await axios.get(url, { params });

        res.json(newsApiRes.data); 
    } catch (error) {
        console.error('Error fetching news:', error.message);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

export default router;
