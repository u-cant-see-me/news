import loadComponent from "./loadcomponents";
import fetchNews from "./fetchnews";
import NewsApiParams,{buildQueryString} from './newsapiparams.js'
import addHamburger from "./hamburger";
import { createCard } from "./utils";

document.addEventListener('DOMContentLoaded',() => {

    function preLoader() {
        document.querySelector(".pl-logo").innerHTML = sessionStorage.getItem("info").toString();
        gsap.to(".overlay", {
            xPercent: 100,
            delay:1,
            duration: 0.5,
        });
    } 
    loadComponent("header2","header",()=>addHamburger());
    loadComponent("sidebar","sidebar");
    
    const domList = [
        {
            parameter:{topic:"culture",page:5},
            templateId:".card-concept-1",
            containerId:"#section1"
        },
        {
            parameter:{topic:"culture",page:3},
            templateId:".card-concept-4",
            containerId:"#section2"
        },
        {
            parameter:{topic:"culture",page:6},
            templateId:".card-concept-1",
            containerId:"#section3"
        },
        {
            parameter:{topic:"culture",page:6},
            templateId:".card-concept-3",
            containerId:"#section4"
        },
    ];

    async function getNews(parameter ){
        const params = new NewsApiParams();
        params.q = parameter.topic;
        if(parameter.domain){
            params.domains = parameter.domain;
        }
        params.pageSize = parameter.page;
        const searchString = buildQueryString(params);
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

    function updateNews(newsArticles,domList){
        let count = 0;
        domList.forEach(item => {
            console.log(count);
            
            for (let index = count; index < count + item.parameter.page; index++) {
                createCard(newsArticles[index],item.templateId,item.containerId);   
            }
            count += item.parameter.page;

        })
    };

    const city = sessionStorage.getItem("info");
    console.log(city);
    preLoader();
    getNews(
        {
            topic:city,
            page:100,
            // domain:"bbc.com,cnn.com"
        }
    )
});