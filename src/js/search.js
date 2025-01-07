import  fetchNews  from "./fetchnews.js";
import NewsApiParams,{buildQueryString} from './newsapiparams.js'
import loadComponent from "./loadcomponents.js";
import addHamburger from "./hamburger.js";
import { handleArticleClick } from "./utils.js";

document.addEventListener('DOMContentLoaded',()=>{
    
    
    loadComponent("header2","header",()=>addHamburger());
    loadComponent("sidebar","sidebar");
    
    //global var
    let params = new NewsApiParams() ;
    params.q =   new URLSearchParams(window.location.search).get('query');
    
    const searchBox = document.querySelector('#search');

    searchBox.value = params.q;
    updateSearchResults(buildQueryString(params));

    function updatePagenation(){
        const pagenation = document.querySelector('.pagenation');
        pagenation.style.display = "flex";
        const currentPage = document.querySelector(`#page-${params.page}`);        
        currentPage.style.backgroundColor = "#464646";
        currentPage.style.color = "white";
    }

    async function updateSearchResults(searchString) {
        
        const newsData = await fetchNews("everything",searchString);
        console.log(newsData);
        if(newsData.totalResults != 0){
            document.querySelector('#search-results').innerHTML = `Showing ${newsData.totalResults} results for `;
        }
        const mainContainer = document.querySelector('#search-news-container');
        const templateNewsCard = document.querySelector('#card-concept3');
        
        mainContainer.innerHTML = "";

        newsData.articles.forEach(article => {
            if(article.title === "[Removed]" || article.description === "[Removed]"){
                return;
            }
            
            const cardClone =  templateNewsCard.content.cloneNode(true); 
            bindNewsToCard(cardClone,article);
            mainContainer.append(cardClone);     
        });  
        updatePagenation();
    }
    function bindNewsToCard(cardClone,article){
        // console.log(article);
        const link = cardClone.querySelector('.news');
        link.dataset.article = JSON.stringify(article);
        const heading = cardClone.querySelector('.heading');
        const descripiton = cardClone.querySelector('.description');
        const author = cardClone.querySelector('.author');
        const source = cardClone.querySelector('.source');
        const img = cardClone.querySelector('#img')
        link.href = article.url;
        heading.innerHTML = article.title;
        descripiton.innerHTML =` ${article.description.slice(0,200)}... `;
        author.innerHTML = article.author;
        source.innerHTML = article.source.name;
        img.src = article.urlToImage;
    }

    const searcBtn = document.querySelector('#search-btn');
    searcBtn.addEventListener('click',() =>{
        if(searchBox.value){
            const querie = searchBox.value ;
            params.q = querie ;
            updateSearchResults(buildQueryString(params))

        }

    });

    const sortBy = document.querySelector('#sortBy');
    sortBy.addEventListener('click',(event) => {
        if(params.q != ''){
            params.sortBy = event.target.value;
            updateSearchResults(buildQueryString(params));      
        }
    });

    const lang = document.querySelector('#language-field');
    const langOptions = ["en","es"]
    lang.addEventListener('click',() => {
        if(params.q != ''){
            params.language = langOptions[lang.selectedIndex];            
            updateSearchResults(buildQueryString(params));  
        }
    });

    const prev = document.querySelector('#prev');
    prev.addEventListener( 'click' ,() => {
        if(params.page > 1 ){

            const currentPage = document.querySelector(`#page-${params.page}`);      

            params.page = params.page - 1;
            updateSearchResults(buildQueryString(params));

            currentPage.style.backgroundColor = "#f0f0f0";
            currentPage.style.color = "rgb(46, 46, 46)";
        }
    });

    const next = document.querySelector('#next');
    next.addEventListener('click',() => {
        if(params.page < 10){
            const currentPage = document.querySelector(`#page-${params.page}`);      
            currentPage.style.backgroundColor = "#f0f0f0";
            currentPage.style.color = "rgb(46, 46, 46)";

            params.page = params.page + 1;
            document.querySelector(`#page-${params.page}`).classList.add('pageActiveColor');

            console.log(buildQueryString(params));
            
            updateSearchResults(buildQueryString(params));

        }
    });
    
    document.querySelector('#next').addEventListener('click',() => {
        document.querySelector('#search-section').scrollIntoView({behavior:"smooth"});
    });

    document.querySelector('#search-news-container')
    .addEventListener('click',handleArticleClick);

    // document.querySelector('.page').addEventListener('click',(event) => {
    //     console.log(event.target.value);
        

    // });

});
