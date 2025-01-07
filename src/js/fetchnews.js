
export default async function fetchNews(endpoint,query){

    try{

        const newsApiResponse = await fetch(`http://localhost:3000/api/news?query=${encodeURIComponent(query)}&endpoint=${endpoint}`);
        
        if(newsApiResponse.ok){
            const data = await newsApiResponse.json();            
            return data;
        }
        else{
            console.error("Data not available");
        }

    }
    catch(error){
        console.error("Error retrieving news headlines",error);
        throw error;
        
    }

}