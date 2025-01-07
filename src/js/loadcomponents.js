
export default async function loadComponent(elememtName , elementId, callBack){

    const components = {
        "header2" : "../pages/templates/header2.html",
        "sidebar" : "../pages/templates/sidebar.html",
    };
    
    const path = components[elememtName];
    if(!path){
        throw new Error(`path of this ${elememtName} component not registered`);
    }
    const res = await fetch(path);
    if(res.ok){
        const data = await res.text();        
        
        document.getElementById(elementId).innerHTML = data;
    }
    else{
       throw new Error(`failed to load componet ${elememtName}`);
    }
    if (typeof callBack === 'function'){
        callBack();
    }
}