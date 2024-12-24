import axios from 'axios';

export default async function scrapePTags(url) {
    try {
        console.log(`Sending request to server to scrape: ${url}...`);
        
        const response = await axios.get(`http://localhost:3000/scrape`, {
            params: { url } // Send the URL as a query parameter to the server
        });
        console.log(response);
        
        console.log('Page fetched successfully. Extracting <p> tags...');
        return response.data.paragraphs; // Return the paragraphs extracted by the server
    } catch (error) {
        console.error(`Error scraping ${url}:`, error.message);
        window.location.href = url;
        return [];
    }
}
