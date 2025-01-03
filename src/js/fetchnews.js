export default async function fetchNews(endpoint,query){
    // const apiKey = "e5d67e6950b846c8a4e26bb32d67afb4";
    const apiKey = "1f0ef25771d74023a3118716b153dfc3";
    let url = " ";
    if (endpoint == "topheadline"){
        url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
    }
    else{
        url = ` https://newsapi.org/v2/everything?${query}&apiKey=${apiKey}`

    }
    // let urlTopHeadline = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
    // let urlEverything  = `https://newsapi.org/v2/everything?q=${query}?&apiKey=${apiKey}`
    try{
        const newsApiResponse = await fetch(url);
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