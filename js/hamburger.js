const hamburger = document.querySelector('.hamburger');
hamburger.addEventListener('click', () => {
  if(hamburger.classList[2] == "is-active"){
    hamburger.classList.remove('is-active');
    document.querySelector("#sidebar").style.display = 'none';
      return;
      
  }
  hamburger.classList.toggle('is-active');
  document.querySelector("#sidebar").style.display = 'block';




});
