export default async function getUserData() {
    const apiKey = "f36d981ffd208f"; 
    const url = `https://ipinfo.io/json?token=${apiKey}`;

    try
        {        
            const response = await fetch(url);

            if(response.ok){
                const data = await response.json();
                
                return data;
            }
            else{
                console.error("Failed to fetch city data",error);
            }
        }
    catch(error){
        console.error("Error retriving a city",error);
        throw error;
    }
}
