import loadComponent from "./loadcomponents";
import fetchNews from "./fetchnews";
import NewsApiParams,{buildQueryString} from './newsapiparams.js'
import addHamburger from "./hamburger";
import { createCard } from "./utils";

document.addEventListener('DOMContentLoaded',() => {

    function preLoader() {
        document.querySelector(".pl-logo").innerHTML = "Economics",
        gsap.to(".overlay", {
            xPercent: 100,
            delay:1,
            opacity:0,
            duration: 0.5,
        });
    } 

    loadComponent("header2","header",()=>addHamburger());
    loadComponent("sidebar","sidebar");
    
    const domList = [
        {
            parameter:{topic:"economy",page:5},
            templateId:".card-concept-1",
            containerId:"#section1"
        },
        {
            parameter:{topic:"economy",page:3},
            templateId:".card-concept-4",
            containerId:"#section2"
        },
        {
            parameter:{topic:"economy",page:6},
            templateId:".card-concept-1",
            containerId:"#section3"
        },
        {
            parameter:{topic:"economy",page:6},
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
    preLoader();
    getNews(
        {
            topic:"economy",
            page:100,
            domain:"bbc.com,cnn.com"
        }
    )
});