const header = document.querySelector('.header');
const menu = document.querySelector('.menu');
const footer = document.querySelector('.footer');
const intro = document.querySelector('.intro');
const introTitle = document.querySelector('.intro__title');
const introDescrp = document.querySelector('.intro__description');
const gallery = document.querySelector('.gallery');
const soundIcon = document.querySelector('.sound-icon');
const scrollAction = document.querySelector('.scroll');
let backgroundAudio = null;

async function bgAudio() {
  const backgroundAudio = new Audio("./src/assets/sounds/bg-sound.mp3");
  backgroundAudio.play().then((res) =>{
    backgroundAudio.play()
  }).catch(() =>{
    soundIcon.classList = "sound-icon icon-sound-off";
  });
  return backgroundAudio;
}

bgAudio().then((res) =>{
  backgroundAudio = res
}).catch((err) => {
  throw Error(err)
});


soundIcon.addEventListener("click", () => {
  if(soundIcon.classList.contains('icon-sound-on')){
    soundIcon.classList = "sound-icon icon-sound-off";
    backgroundAudio.pause();
  }else {
    soundIcon.classList = "sound-icon icon-sound-on";  
    backgroundAudio.play();
  }
});

window.addEventListener("scroll", (e) => {
  let scale = (document.body.offsetHeight - window.pageYOffset) / document.body.offsetHeight;
  let opacity = (document.body.offsetHeight - window.pageYOffset) / document.body.offsetHeight;
  intro.style.transform = `scale(${scale})`
  intro.style.opacity = `${opacity}`
  scrollAction.style.opacity = Math.floor(100 / window.pageYOffset);

});

function changeIntroLang(lang){
  menu.querySelectorAll(".menu__link").forEach((item,index) => {
    item.textContent = contentLang[lang].menu[index];
  });
  introTitle.innerHTML = contentLang[lang].introTitle
  introDescrp.innerHTML = contentLang[lang].introDescrp
}
