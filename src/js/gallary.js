import birdEn from "../data/birds-en.js";
import birdRu from "../data/birds-ru.js";
import BirdCard from "../js/BirdInfo.js";
import currentLangauge from "./lang.js";
import { BirdModal } from './BirdModal.js';
import { Modal } from './Modal.js';
const gallaryWrapper = document.querySelector('.birds-wrapper')
const cradTypes = ['wide', 'tall', 'big', 'normal']

let birdData = [];
changeBirdCardLang(currentLangauge)
setGalleryContentLang()
function getRandomNum(maxNum){
  return Math.floor(Math.random() * maxNum);
}
function getCardType(){
  let cardTypeIndex = getRandomNum(cradTypes.length);
  return cradTypes[cardTypeIndex];
}

function changeBirdCardLang(lang){
  let currentLangauge = lang;
  setGalleryContentLang()
  if(currentLangauge === "en"){
    birdData =birdEn 
    setBirdCard(birdEn)
    console.log("en")
  }else if(currentLangauge === "ru"){
    birdData = birdRu 
    setBirdCard(birdRu);
    console.log("ru")
  }
}
function setBirdCard(birdsData){
  console.log(birdsData)
  birdsData.forEach((birdType,pos) => {
    birdType.forEach((bird, id) => {
      let cardType = getCardType();
      let birdBox = new BirdCard(bird, 'bird', cardType);
      let birdCard = birdBox.buildCard();
       birdCard.setAttribute("data-pos", pos);
       birdCard.setAttribute("data-id", id);
      gallaryWrapper.appendChild(birdCard);
    })
  })
}

function setGalleryContentLang(){
  document.querySelector('.gallery__title').innerHTML = contentLang[currentLangauge].gallery;
  document.querySelector('.gallery__descp').innerHTML = contentLang[currentLangauge].galleryDescp;

}
const renderBirdModalWindow = (article) => {
  let modal =  new BirdModal('article-modal', article);
  modal.renderModal();
}
document.querySelector(".birds-wrapper").addEventListener("click", (e) =>{
  if(e.target.closest(".bird")){
    let cardPos = e.target.closest(".bird").getAttribute("data-pos");
    let cardId = e.target.closest(".bird").getAttribute("data-id");
    let clickedBirdData = birdData[cardPos][cardId];
    renderBirdModalWindow(clickedBirdData)
    //console.log(clickedBirdData)
  }
})

export default changeBirdCardLang;
