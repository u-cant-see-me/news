 import fetchNews  from "./js/fetchnews.js";  
 import NewsApiParams,{buildQueryString} from './js/newsapiparams.js'
 import getWeather from "./js/fetchWeatherInfo.js"
 import { dateString, getTime } from "./js/utils.js";

document.addEventListener('DOMContentLoaded',() => {

    async function updateWeatherSection(){
        document.querySelector('#day').innerHTML = dateString();
        const data = await getWeather();
        const weatherData = data.main;
        document.querySelector('#Location').innerHTML = data.city;
        const temp =  weatherData.main.temp - 273.15; //Kelvin to celsius
        document.querySelector('#temperature').innerHTML = `${((temp * 9/5) + 32).toFixed(2)}°F / ${temp.toFixed(2)}°C` ;
        document.querySelector('#W-descripiton').innerHTML = weatherData.weather[0].description;
    }

    async function updateNewsHeadlines(){
        const newsArticles = await fetchNews("topheadline");
        
        const topNewsContainer = document.querySelector('.other-news');
        const templateNewsCard = document.querySelector('#template-news-card');
        const AsideNewsConatainer = document.querySelector('.latest-news-container');
        const templateAsideCard = document.querySelector('.template-aside-news-card');

        topNewsContainer.innerHTML = " ";

        let newsDisplayed = 0;
        newsArticles.articles.forEach(article => {
            if(article.urlToImage == null || newsDisplayed > 12) return;
            newsDisplayed++;
            if(newsDisplayed == 1){
                const link = document.querySelector('.heading');
                link.dataset.article = JSON.stringify(article);
                const headlineImg = document.querySelector('#headline-img');
                const headlineTitle = document.querySelector('#headline-title');
                const descripiton = document.querySelector('.newsDescription');
                const author = document.querySelector('.author');
                link.href = article.url;
                headlineImg.src = article.urlToImage;
                headlineTitle.innerHTML = article.title;
                descripiton.innerHTML = article.description.slice(0,500);
                
                author.innerHTML = article.author; 

            }
            else if(newsDisplayed < 8){   
                const cardClone = templateNewsCard.content.cloneNode(true);         
                bindNewsToCard(cardClone,article);
                topNewsContainer.append(cardClone);
            }
            else{
                const asideCardClone = templateAsideCard.content.cloneNode(true);
                bindNewsToAsideCard(asideCardClone,article);
                AsideNewsConatainer.append(asideCardClone);
                
            }

        });
    }


    function bindNewsToCard(cardClone,article){
        const newsLink = cardClone.querySelector('.news')
        newsLink.dataset.article = JSON.stringify(article);
        const newsImg = cardClone.querySelector('.img');
        const newsTitle = cardClone.querySelector('.title');
        const source = cardClone.querySelector('.source');
        const description = cardClone.querySelector('.description');
        const time = cardClone.querySelector('.time');  

        if(newsLink){
            newsLink.href = article.url;
        }
        if(source){
            source.innerHTML = article.source.name;
        }
        if(newsImg){
            newsImg.src = article.urlToImage;   
        }
        if(description){
            description.innerHTML = article.content;
        }
        if(time){
            time.innerHTML = getTime(article.publishedAt);

        }
        if(newsTitle){
            updateTitles(newsTitle,article.title);
        }
        
    }

    function bindNewsToAsideCard(cardClone,article){
        const newsLink = cardClone.querySelector('.aside-news-card')
        newsLink.dataset.article = JSON.stringify(article);
        const newsAuthor= cardClone.querySelector('#aside-author');
        const newsTitle = cardClone.querySelector('.aside-news-title');
        const time = cardClone.querySelector('#time-holder');
        const timeString = article.publishedAt;
        time.innerHTML = timeString.substring(timeString.indexOf('T')+1,timeString.indexOf('T')+6);
        newsLink.href = article.url;
        newsAuthor.innerHTML = article.author;
        
        updateTitles(newsTitle,article.title)

        
    }
    function updateTitles(newsTitle,title){
        if (title) {
            const lastDashIndex = title.lastIndexOf('-');
            const titleString  = lastDashIndex !== -1 
                ? title.substring(0, lastDashIndex) 
                : title; 
            newsTitle.innerHTML = titleString.length > 100 
                ? `${titleString.substring(0,100)} <span style="color: #8a8989; ">Read more...</span> `
                : titleString;

        } else {
            newsTitle.innerHTML = "No title available"; // Fallback if title is missing
        }
    }

    async function updateWeekendReads(){
        const params = new NewsApiParams();
        params.q = "future";
        params.domains = "bbc.com,cnn.com,gizmodo.com";
        params.pageSize = 2;
        const searchString = buildQueryString(params);
        const newsArticles = await fetchNews("everything",searchString);

        const container = document.querySelector('.weekend-reads-container');

        newsArticles.articles.forEach(article => {

            const templateNewsCard = document.querySelector('.card-concept-3');
            const cardClone = templateNewsCard.content.cloneNode(true);         
            bindNewsToCard(cardClone,article);
            container.append(cardClone);

        });
    }

    async function updateMoreNews(query,containerId,pages){
        const params = new NewsApiParams();
        params.q = query;
        // params.domains = "cnn.com,politico.com,bbc.com";
        params.pageSize = pages;
        const searchString = buildQueryString(params);
        const newsArticles = await fetchNews("everything",searchString);
        console.log(newsArticles);
        const container = document.querySelector(`${containerId}`);

        newsArticles.articles.forEach(article => {
            
            const templateNewsCard = document.querySelector('.card-concept-4');
            const cardClone = templateNewsCard.content.cloneNode(true);
            bindNewsToCard(cardClone,article);
            container.append(cardClone);
        })
    }

    function fillCatalouge(list){
        list.forEach(item => {
            updateMoreNews(item.topic,item.containerId,item.pages);
        })
    }

    
    updateWeatherSection();
    updateNewsHeadlines();
    updateWeekendReads();
    updateMoreNews("world",".more-news",3);
    fillCatalouge(
        [
            {topic:"USA and Canada",containerId:"#c1",pages:3},
            {topic:"israel-gaza war",containerId:"#c2",pages:3},
            {topic:"war in ukraine",containerId:"#c3",pages:3},
            {topic:"india",containerId:"#c4",pages:3},
        ]
    );

    document.querySelector('.search-button').addEventListener('click', () => {
        const query = document.querySelector('#search').value.trim();
        console.log(query);
        
        if (query) {
            // Redirect to search.html with the query as a URL parameter
            window.location.href = `./src/search.html?query=${encodeURIComponent(query)}`;
        }        
    });

    document.querySelector('.news-container').addEventListener('click',(event)=>{
        event.preventDefault();    
        const link = event.target.closest('.news');
        if (link) {
            sessionStorage.setItem('selectedArticle', link.dataset.article);
            window.location.href = 'src/topic.html';        
        }
    });
    
    
}); 


