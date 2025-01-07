import loadComponent from "./loadcomponents.js";
import addHamburger from "./hamburger.js";
import scrapePTags from "./scrape.js";
import { getPassedTime } from "./utils.js";

window.addEventListener('DOMContentLoaded', () => {
    loadComponent("header2", "header", () => addHamburger());
    loadComponent("sidebar", "sidebar");

    const articleData = sessionStorage.getItem('selectedArticle');
    if (articleData) {
        console.log(JSON.parse(articleData));
        const article = JSON.parse(articleData);
        async function scrape() {
            const data = await scrapePTags(article.url); 
            updatePage(article,data);
            console.log(data); 
        }
        scrape();
    } else {
        console.log("No article data found in session");
    }


    function updatePage(article,content){

        document.querySelector('.heading').innerHTML = article.title;
        document.querySelector('.time').innerHTML = getPassedTime(article.publishedAt);
        document.querySelector('.img').src = article.urlToImage;
        document.querySelector('.author').innerHTML = article.author;
        document.querySelector('.source-site').innerHTML =article.source.name;


        const pContainer = document.querySelector('.news-content');

        const keywords = [
            "all rights reserved",
            "©",
            "sign up",
            "click here",
            "subscribe",
            "newsletter",
            "click the subscribe",
            "visit www.",
            "top-trending",
            "trending stories",
            "advertisement",
            "min read",
            "listen to article",
            "stay up to date",
            "this content is",
            "view more statis",
            "manage alerts",
            "adblocker",
            "get quick access",
            "privacy policy",
            "get our latest",
        ];

        let firstP = true;
        content.forEach((paragraph) => {


            const p = document.createElement('p');
                        
            if(firstP && paragraph.includes(article.content.substring(0,20)) ){
                const hasKeyword = keywords.some(keyword => paragraph.toLowerCase().includes(keyword));
                if(hasKeyword){
                    firstP = false; 
                    return ;
                }

                const span = document.createElement('span');
                span.classList.add('block');
                span.innerHTML = paragraph.trim().charAt(0);
                pContainer.appendChild(span);
                p.innerHTML = paragraph.trim().substring(1);
                p.style.display = "inline";
                firstP = false;
            }else{
                if(firstP){ return ;}
                const hasKeyword = keywords.some(keyword => paragraph.toLowerCase().includes(keyword));
                if(hasKeyword){
                    firstP = false; 
                    return ;
                }
                p.innerHTML = paragraph;
            }
            pContainer.appendChild(p);
        })
        
    }

    //selection
    function getSelectedText(){
         return window.getSelection().toString();
    }
    window.addEventListener('contextmenu',(event) => {
        const s = getSelectedText();
        if(s){
            event.preventDefault()
            console.log(s);
        }
        
    });

    //dropdown 
    document.querySelector('.dropdown-btn').addEventListener('click',()=>{
        document.querySelector('.dropdown-menu').classList.toggle('show');
    })
    window.addEventListener('click',(event)=>{
        if(!event.target.matches('.dropdown-btn')){
            document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
                dropdown.classList.remove('show');                
            });
        }
    })
});
