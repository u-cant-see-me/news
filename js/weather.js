import getWeather from "./fetchWeatherInfo.js";

document.addEventListener('DOMContentLoaded',() => {
    const ctx = document.getElementById('myChart');
    console.log();
    async function plotChart(){
        const data = await getWeather();
        console.log(data);
        
    }
    const templist = [] ;
    const datelist = [];
    async function count(){
        const res = await fetch("https://api.openweathermap.org/data/2.5/forecast?q=kanpur&appid=a2847ebdcdfe3330a2ba9240b8998bcd");
        const data = await res.json();
        data.list.forEach(element => {
            templist.push((element.main.temp-273.15).toFixed(1));
            datelist.push(element.dt_txt);
            
        });

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: datelist,
                datasets: [{
                label: 'temperature',
                data: templist,
                borderWidth: 1
                }]
            },
            options: {
                scales: {
                y: {
                    beginAtZero: true
                }
                }
            }
            });
        
    }
    count();
    console.log(datelist,templist);
    

    
    plotChart();
});

