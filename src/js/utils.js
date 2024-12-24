
export function dateString(){
    const date = new Date();
    const weekdays = ["Sunday","Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"] ; 
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${weekdays[date.getDay()]} , ${date.getDate()} ${months[date.getMonth()]} , ${date.getFullYear()}`;
}


export function getTime(time){
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
        window.location.href = 'topic.html';        
    }
}