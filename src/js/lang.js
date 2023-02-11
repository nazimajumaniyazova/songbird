// import changeBirdCardLang from "./gallary.js";

const lang = document.querySelector(".lang")

let currentLangauge = getCurrentLanguage();
setActiveLanguage()
changeIntroLang(currentLangauge);
//changeBirdCardLang(currentLangauge);
lang.addEventListener("click", (event) => {
  if(event.target.getAttribute("data-lang")){
    currentLangauge = event.target.getAttribute("data-lang");
    saveCurrentLanguage();
    setActiveLanguage();
    changeIntroLang(currentLangauge);
    //changeBirdCardLang(currentLangauge);
    window.location.reload();
  }
})

function getCurrentLanguage(){
  if(localStorage.getItem("currentLang")){
    return localStorage.getItem("currentLang");
  }else{
    return "en";
  }
}

function saveCurrentLanguage(){
  localStorage.setItem("currentLang", currentLangauge);
}

function setActiveLanguage(){
  let langs = lang.querySelectorAll('span')
  langs.forEach(item => {
    item.classList.remove("lang-active")
    if(item.getAttribute('data-lang') === currentLangauge){
      item.classList.add('lang-active')
    }
  });
}
window.addEventListener('load',function(){
  document.querySelector('body').classList.add("loaded")  
});

window.onload = function () {
  document.body.classList.add('loaded_hiding');
  window.setTimeout(function () {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 1000);
}

export  default currentLangauge;