 import fetchNews  from "./fetchnews.js";  
 import NewsApiParams,{buildQueryString} from './newsapiparams.js'
 import getWeather from "./fetchWeatherInfo.js"
 import { dateString, createCard } from "./utils.js";

document.addEventListener('DOMContentLoaded',() => {



    function preLoader(){

        let tl = gsap.timeline();
        const list = [
            "Entertainment",
            "Sports",
            "Headlines",
            "The News",
        ];
        
        tl.to('.overlay', {
            duration: 3,
            onStart: () => {
                let h = document.querySelector(".pl-logo");
                let index = 0;
        
                const showText = () => {
                    if (index < list.length) {
                        h.innerHTML = list[index];
                        index++;
    
                        gsap.fromTo(h, 
                            { opacity: 0 }, 
                            { 
                                opacity: 1,
                                duration: 1, 
                                onComplete: () => {
                                showText();
                            }}
                        );
                    }
                };
        
                showText(); 
            },
        })
        tl.to(".box",{
            height:0,
            duration:1,
            delay:1,
            stagger:0.1,
        })
        .to(".overlay",{
            opacity:0,
            duration:1,
        })
    
    }

    const domList =         
    [
        {
            parameter:{topic:"War",page:1},
            templateId:".card-concept-0",
            containerId:"#top-headline"
        },
        {
            parameter:{topic:"world",page:6},
            templateId:".card-concept-1",
            containerId:".other-news"
        },
        {
            parameter:{topic:"world",page:6},
            templateId:".card-concept-2",
            containerId:".latest-news-container"  
        },
        //Weekend reads
        {
            parameter:{topic:"future",domain:"bbc.com,cnn.com",page:2},
            templateId:".card-concept-3",
            containerId:".weekend-reads-container"
        },

        //More News Section
        {
            parameter:{topic:"world",page:3},
            templateId:".card-concept-4",
            containerId:".more-news"
        },
        //Catalogue
        {
            parameter:{topic:"USA and Canada",page:3},
            templateId:".card-concept-4",
            containerId:"#c1"
        },
        {
            parameter:{topic:"USA and Canada",page:1},
            templateId:".card-concept-1",
            containerId:"#c1"
        },
        {
            parameter: {topic:"israel-gaza war",page:3},
            templateId:".card-concept-4",
            containerId:"#c2"
        },
        {
            parameter: {topic:"israel-gaza war",page:1},
            templateId:".card-concept-1",
            containerId:"#c2"
        },
        {
            parameter:{topic:"war in ukraine",page:3},
            templateId:".card-concept-4",
            containerId:"#c3"
        },
        {
            parameter:{topic:"war in ukraine",page:1},
            templateId:".card-concept-1",
            containerId:"#c3"
        },
        {
            parameter:{topic:"india",page:3},
            templateId:".card-concept-4",
            containerId:"#c4"
        },
        {
            parameter:{topic:"india",page:1},
            templateId:".card-concept-1",
            containerId:"#c4"
        },
        
    ];
    async function updateWeatherSection(){
        const data = await getWeather();
        const weatherData = data.main;
        const temp =  weatherData.main.temp - 273.15; //Kelvin to celsius
        
        document.querySelector('#day').innerHTML = dateString();
        document.querySelector('#Location').innerHTML = data.city;
        document.querySelector('#temperature').innerHTML = `${((temp * 9/5) + 32).toFixed(2)}°F / ${temp.toFixed(2)}°C` ;
        document.querySelector('#W-descripiton').innerHTML = weatherData.weather[0].description;
    }

    async function getNews(parameter ){
        const params = new NewsApiParams();
        params.q = parameter.topic;
        if(parameter.domain){
            params.domains = parameter.domain;
        }
        params.pageSize = parameter.page;
        const searchString = buildQueryString(params);
        console.log(searchString);
        
        const newsArticles = await fetchNews("everything",searchString);
        let list = [];
        newsArticles.articles.forEach(article => {
            if(article.title === "[Removed]" || article.description === "[Removed]"){
                return;
            }            
            list.push(article);
        });
        console.log(list);
        
        updateNews(list,domList) ;
    }



// function delay(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function updateNews(list) {
//     for (const item of list) {
//         try {
//             const state = await createCard(item.parameter, item.templateId, item.containerId);
//             console.log(`Card created: ${state}`);
//         } catch (error) {
//             console.error("Error creating card:", error);
//         }
//         await delay(1000); // Wait 500ms between requests
//     }
// }


    function updateNews(newsArticles,domList){
        let count = 0;
        domList.forEach(item => {
            console.log(count);
            
            for (let index = count; index < count + item.parameter.page; index++) {
                createCard(newsArticles[index],item.templateId,item.containerId);   
            }
            count += item.parameter.page;

        })
        // let tl = gsap.timeline();
        // tl.fromTo("a",{
        //     x:10,
        //     opacity:0,
        // },{
        //     x:0,
        //     opacity:1,
        //     duration:0.5,
        //     stagger:0.5,

        // })
    };

    const hasLoaded = sessionStorage.getItem("hasLoaded");
    if(hasLoaded === "true"){
        const logo = document.querySelector(".pl-logo");
        logo.innerHTML = "The News";
        gsap.to(".overlay", {
            xPercent: 100,
            delay:1,
            duration: 0.5,
        });
    }
    else{
        preLoader();
        sessionStorage.setItem("hasLoaded","true");
    }


    getNews(
        {
            topic :"world",
            page  :100,
        }
    );


    updateWeatherSection();
 

    document.querySelector('.search-button').addEventListener('click', () => {
        const query = document.querySelector('#search').value.trim();
        console.log(query);
        
        if (query) {
            // Redirect to search.html with the query as a URL parameter
            window.location.href = `/src/pages/search.html?query=${encodeURIComponent(query)}`;
        }        
    });

    document.querySelector('.news-container').addEventListener('click',(event)=>{
        event.preventDefault();    
        const link = event.target.closest('.news');
        if (link) {
            sessionStorage.setItem('selectedArticle', link.dataset.article);
            window.location.href = 'src/pages/article.html';        
        }
    });


}); 


