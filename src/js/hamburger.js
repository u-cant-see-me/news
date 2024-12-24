export default function addHamburger(){
  const hamburger = document.querySelector('.hamburger');
  if(hamburger){
    hamburger.addEventListener('click', () => {
      if(hamburger.classList[2] == "is-active"){
        hamburger.classList.remove('is-active');
        document.querySelector("#sidebar").style.display = 'none';
          return;
      }
      hamburger.classList.toggle('is-active');
      document.querySelector("#sidebar").style.display = 'block';
    });
  }
  else{
    throw new Error("hamburger element not found");
  }

}
