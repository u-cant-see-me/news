
export function dateString(){
    const date = new Date();
    const weekdays = ["Sunday","Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"] ; 
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${weekdays[date.getDay()]} , ${date.getDate()} ${months[date.getMonth()]} , ${date.getFullYear()}`;
}


export function getPassedTime(time){
    const newsTime = new Date(time);
    const currentTime = new Date();

    const timeDifference = currentTime - newsTime;

    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    return  (hours>24)?`${hours/24} day ago` : (hours == 1)?`${hours} hr ago`:(hours>1)?`${hours} hrs ago`:`${minutes} min ago`;
}


export function handleArticleClick(event){
    event.preventDefault();    
    const link = event.target.closest('.news');
    if (link) {
        sessionStorage.setItem('selectedArticle', link.dataset.article);
        window.location.href = 'article.html';        
    }
}



export function createCard(article,templateId,containerId) {     
    const templateNewsCard = document.querySelector(`${templateId}`);
    const container = document.querySelector(`${containerId}`);
    const cardClone = templateNewsCard.content.cloneNode(true);  

    bindNewsToCard(cardClone,article);
    if(container){
        container.append(cardClone);   
    }
    else{
        console.log("container doesnt exist");
    }


}

export function bindNewsToCard(cardClone,article){

    const newsLink = cardClone.querySelector('.news')
    newsLink.dataset.article = JSON.stringify(article);
    const newsImg = cardClone.querySelector('.img');
    const newsTitle = cardClone.querySelector('.title');
    const source = cardClone.querySelector('.source');
    const description = cardClone.querySelector('.description');
    const passedTime = cardClone.querySelector('.time');  
    const timeHolder = cardClone.querySelector('#time-holder');
    const author = cardClone.querySelector('.author');

    if(newsLink){
        newsLink.href = article.url;
    }
    if(source){
        source.innerHTML = article.source.name;
    }
    if(newsImg){
        newsImg.src = article.urlToImage || "https://placehold.co/600x400/white/black?font=playfair-display&text=The%20News";   
    }
    if(description){
        description.innerHTML = article.content;
    }
    if(passedTime){
        passedTime.innerHTML = getPassedTime(article.publishedAt);
    }
    if(timeHolder){
        const timeString = article.publishedAt;
        timeHolder.innerHTML = timeString.substring(timeString.indexOf('T')+1,timeString.indexOf('T')+6);
    }
    if(newsTitle){
        updateTitles(newsTitle,article.title);
    }
    if(author){
        author.innerHTML = article.author;
    }

}

export function updateTitles(newsTitle,title){
        if (title) {
            const lastDashIndex = title.lastIndexOf('-');
            newsTitle.innerHTML  = lastDashIndex !== -1 
                ? title.substring(0, lastDashIndex) 
                : title; 

        } else {
            newsTitle.innerHTML = "No title available"; 
        }
    }