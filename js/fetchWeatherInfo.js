import getUserData from './fetchuserdata.js'

export default async function getWeather(){

    const data = await getUserData();

    const [latitude,longitude] = data.loc.split(",");
    const key = "a2847ebdcdfe3330a2ba9240b8998bcd";
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    try {
        const weatherApiResponse = await fetch(url);
        if(weatherApiResponse.ok){
            const weatherData = await weatherApiResponse.json();
            return {
                city:data.city,
                main:weatherData
            };
        }
        else{
            throw new error("Failed to fetch weather data");
        }
    }
    catch(error){
        console.error("there was an error",error);          
    }

}