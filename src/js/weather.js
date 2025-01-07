import getWeather from "./fetchWeatherInfo.js";
import { graphTemp,graphAll} from "./allChart.js";
import loadComponent from "./loadcomponents.js"
import addHamburger from "./hamburger.js"

document.addEventListener('DOMContentLoaded',()=>{

    loadComponent("header2","header",()=>addHamburger());
    loadComponent("sidebar","sidebar");

    gsap.registerPlugin(Flip,ScrollTrigger,ScrollToPlugin);

    function preLoader() {
        document.querySelector(".pl-logo").innerHTML = "Weather";
        const  tl = gsap.timeline();

        tl.to(".overlay", {
            xPercent: 100,
            delay:1,
            duration: 0.5,
        }).fromTo(".page-header",{
            y:-100
        },{
            y:0
        })
        .fromTo(".searchBar",{
            y:-10,
            opacity:0,
            
        },{
            y:0,
            opacity:1,
            duration: 1, 
        })
        .fromTo("#chart-section",{
            x:200,
            opacity:0,
        },{
            x:0,
            opacity:1,
        })
        .fromTo(".city",{
            y:-100,
            opacity:0,
        },{
            y:0,
            opacity:1,
        })
        gsap.fromTo(".temp-graph-container",
            {
            x:-200,
            opacity:0,
        },{
            x:0,
            opacity:1,
        })
    } 



    const gauge = document.querySelector("#gauge");
    gauge.setAttribute("data-value","10")

    async function addMap() {
        const data =  await getWeather();
        const lat = data.main.coord.lat;
        const lon = data.main.coord.lon;
        
        const map = L.map('map').setView([lat, lon], 13);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            subdomains: 'abcd',
            maxZoom: 19,
          }).addTo(map);
        let marker = L.marker([lat, lon]).addTo(map);
        marker.bindPopup(`<b>${data.city}</b>`).openPopup();
    }

    async function graph(){
        const state = await graphTemp(document.getElementById('tempGraph'));
        if(state){
            graphAll(document.getElementById('myChart'));
        }    

    }

    preLoader();
    addMap();
    graph();
    
});

