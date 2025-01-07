import  fetchNews  from "./fetchnews.js";
import NewsApiParams,{buildQueryString} from './newsapiparams.js'
import loadComponent from "./loadcomponents.js";
import addHamburger from "./hamburger.js";
import { handleArticleClick } from "./utils.js";

document.addEventListener('DOMContentLoaded',()=>{
    loadComponent("header2","header",()=>addHamburger());
    loadComponent("sidebar","sidebar");
});