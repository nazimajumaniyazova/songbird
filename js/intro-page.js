const header = document.querySelector('.header');
const menu = document.querySelector('.menu');
const footer = document.querySelector('.footer');
const intro = document.querySelector('.intro');
const introTitle = document.querySelector('.intro__title');
const introDescrp = document.querySelector('.intro__description');
const gallery = document.querySelector('.gallery');
const soundIcon = document.querySelector('.sound-icon');

const bgAudio = new Audio("./assets/sounds/bg-sound.mp3");

let audioPromise = bgAudio.play();
if( audioPromise !== undefined) {
  audioPromise.then( _ => {
    bgAudio.play();
  }).catch(error => {
    soundIcon.classList = "sound-icon icon-sound-off";
  })
}

soundIcon.addEventListener("click", () => {
  if(soundIcon.classList.contains('icon-sound-on')){
    soundIcon.classList = "sound-icon icon-sound-off";
   bgAudio.pause();
  }else{
    soundIcon.classList = "sound-icon icon-sound-on";  
    bgAudio.play();
  }
});

window.addEventListener("scroll", (e) => {
  let scale = (document.body.offsetHeight - window.pageYOffset) / document.body.offsetHeight;
  let opacity = (document.body.offsetHeight - window.pageYOffset) / document.body.offsetHeight;
  intro.style.transform = `scale(${scale})`
  intro.style.opacity = `${opacity}`
});

function changeIntroLang(lang){
  menu.querySelectorAll(".menu__link").forEach((item,index) => {
    item.textContent = contentLang[lang].menu[index];
  });
  introTitle.innerHTML = contentLang[lang].introTitle
  introDescrp.innerHTML = contentLang[lang].introDescrp
}