
let birdData = [];
const answerInfo = document.querySelector(".asnwer__info");
const selectCorrectAnswer = document.querySelector(".select-answer");

const categoriesList = document.querySelectorAll('.category');

const nextBtn = document.querySelector('.btn-next');
const answersList = document.querySelector('.answers-list');

const correctAnswerImg = document.querySelector('.correct-asnwer__img');
const correctAnswerDescrp = document.querySelector('.correct-asnwer__descrp');
const correctAnswerBirdName = document.querySelector('.correct-asnwer__bird-name');
const correctAnswerBirdSpecie = document.querySelector('.correct-asnwer__bird-specie');

const currentQuestionName = document.querySelector(".q__name");
const currentQuestionImg =  document.querySelector(".q__img");

//const resultsContainer = document.querySelector('.user-result');
const questionsContainer = document.querySelector('.question');
const answersRow = document.querySelector('.row');
//const btnRestart = document.querySelector(".btn-restart")

const audioPlayBtn = document.querySelector('.audio-controls');
let audioPlayBtnIcon = audioPlayBtn.querySelector('.question .audio-play');
const audioDuration = document.querySelector(".audio-duration");

const answerAudioPlayBtn = document.querySelector(".asnwer__info .audio-controls");
const answerAudioProgress = document.querySelector('.asnwer__info .audio-progress');
const answerAudioCurrentTime = document.querySelector(".asnwer__info .audio-current-time");

const volumeIcon = document.querySelector(".volume-icon")
const volumeRange = document.querySelector(".volume-range")
const volumeNum = document.querySelector(".volume__num");
const volumeActiveRange = document.querySelector(".volume-range_active");

const scoreContainer = document.querySelector(".score");
//const userResult = document.querySelectorAll(".user-result__result span")[0];
let currentLang = getCurrentLanguage();
if(currentLang === 'en'){
  birdData = birdsDataEn;
}else if(currentLang === 'ru'){
  birdData = birdsDataRu;
}
setContentLang()
let questionsArray = getQuizOrderArray(6);
console.log(questionsArray);
let currentQuizIndex = 0;
let isCorrectAnswerSelected = false;
let selectedAnswerId = 0;
let selectedAnswerAudio = new Audio();
displayAnswers();
setActiveCategory();
clearBirdInfo();
let  currentQuizAudio = getCurrentQuizAuido();
let currentVolume = currentQuizAudio.volume;
selectedAnswerAudio.volume = currentVolume;

const birdsFamily = ['Разминка','Воробьиные','Лесные птицы','Певчие птицы','Хищные птицы','Морские птицы'];

const correctAudio = new Audio('../assets/sounds/correct-choice-43861.mp3');
const errorAudio = new Audio('../assets/sounds/error-96563.mp3');

let scoreForAnswer = 5;
let score = 0;

function getRandomNum(maxNum){
  return Math.floor(Math.random() * maxNum);
}
function getQuizOrderArray(arrayLength){
  let randomNum = getRandomNum(6)
  let array = []
  array.push(randomNum)
  for(let i=0; i < arrayLength; i++){
    randomNum = getRandomNum(6);
    array.push(randomNum); 
  } 
  return array
}
function createElement(tagName, _class){
  let node = document.createElement(tagName);
  node.classList = _class;
  return node;
}
function getCurrentLanguage(){
  if(localStorage.getItem("currentLang")){
    return localStorage.getItem("currentLang");
  }else{
    return "en";
  }
}
function displayAnswers(){
  answersList.innerHTML = '';
  birdData[currentQuizIndex].forEach(element => {
    let li = createElement('li', 'answer');
    li.setAttribute('data-id', element.id)
    li.textContent = element.name;
    answersList.appendChild(li)
  });
}
function displayBirdInfo(birdId){
  selectCorrectAnswer.style.display = "none";
  answerInfo.style.display = "flex";
  correctAnswerImg.setAttribute('src', birdData[currentQuizIndex][birdId-1].image)
  correctAnswerDescrp.innerHTML = birdData[currentQuizIndex][birdId-1].description;
  correctAnswerBirdName.innerHTML = birdData[currentQuizIndex][birdId-1].name;
  correctAnswerBirdSpecie.innerHTML = birdData[currentQuizIndex][birdId-1].species;
}

answersList.addEventListener("click", (e) => {
  let eventTarget = e.target.closest('.answer');
  let answerId = eventTarget.getAttribute('data-id');
  displayBirdInfo(answerId);
  selectedAnswerId  = answerId; 
  getAnswerAudio();
  let audioPlayBtnIcon = answerAudioPlayBtn.querySelector(".audio-play")
  selectedAnswerAudio.pause()
  audioPlayBtnIcon.classList.remove("a-pause");
  audioPlayBtnIcon.classList.add("a-play");

  selectedAnswerAudio =  getAnswerAudio();
  if(eventTarget.classList.contains("error") || eventTarget.classList.contains("correct")){
    return
  }
  if(isCorrectAnswerSelected){
    return
  }
  if(isAnswerCorrect(answerId)){
    currentQuizAudio.pause();

    // audioPlayBtnIcon.classList.remove("a-pause");
    // audioPlayBtnIcon.classList.add("a-play");
    //console.log(audioPlayBtnIcon.classList)
    correctAudio.play();
    eventTarget.classList.add('correct');
    isCorrectAnswerSelected = true;
    allowNextQuiz();
    setCurrecntQuestionAnswer(answerId);
    score = score + scoreForAnswer
    scoreContainer.innerHTML = score
    window.localStorage.setItem('userScore', score);
    audioPlayBtnIcon.classList.remove("a-pause");
    audioPlayBtnIcon.classList.add("a-play");
  }else{
    errorAudio.play();
    eventTarget.classList.add('error');
    scoreForAnswer--;
  }
})

function isAnswerCorrect(answerId){
  if(birdData[currentQuizIndex][questionsArray[currentQuizIndex]].id === birdData[currentQuizIndex][answerId - 1].id){
    console.log( birdData[currentQuizIndex][answerId - 1].name)
    return true;
  }else{
    return false;
  }
}
function allowNextQuiz(){
  nextBtn.classList.add('btn-next_active');
}
function setActiveCategory(){
  categoriesList.forEach( item => {
    item.classList.remove('category_active');
  })
  categoriesList[currentQuizIndex].classList.add('category_active');
}
nextBtn.addEventListener("click", (e) => {
  if(!nextBtn.classList.contains("btn-next_active")){
    return
  }
 
  resetCurrecntQuestionAnswer();
  clearBirdInfo();

  isCorrectAnswerSelected = false;
  nextBtn.classList.remove("btn-next_active")
  currentQuizIndex++;

  currentQuizAudio.pause()
  audioPlayBtnIcon.classList.remove("a-pause");
  audioPlayBtnIcon.classList.add("a-play");

  console.log(currentQuizIndex)
  if(currentQuizIndex === questionsArray.length - 1){
    //displayResult();
    //window.location.href = "results.html"
    nextBtn.setAttribute("href", "results.html")
    return
  }

  currentQuizAudio = getCurrentQuizAuido();
  currentQuizAudio.volume = currentVolume;
  selectedAnswerAudio.volume = currentVolume;
  if(volumeIcon.classList.contains('volume-off')){
    currentQuizAudio.volume = 0
    selectedAnswerAudio.volume = 0;
  }
  displayAnswers();
  setActiveCategory();
  scoreForAnswer = 5;
})

function displayResult(){
  // resultsContainer.style.display = "block";
  // questionsContainer.style.display = "none";
  // answersRow.style.display = "none";
  // nextBtn.style.display = "none";
  categoriesList.forEach( item => {
    item.classList.remove('category_active');
  })
  userResult.innerHTML = score
}

// btnRestart.addEventListener('click', (e) => {
//   score = 0
//   scoreForAnswer = 5
//   scoreContainer.innerHTML = score
//   questionsArray = getQuizOrderArray(6);
//   currentQuizIndex = 0;
//   displayAnswers();
//   //displayCurrentQuiz();
//   setActiveCategory();
//   // resultsContainer.style.display = "none";
//   // questionsContainer.style.display = "block";
//   // answersRow.style.display = "block";
//   // nextBtn.style.display = "inline-block";
//   window.location = "../quiz.html"
// })

function clearBirdInfo(){
  answerInfo.style.display = "none";
  selectCorrectAnswer.style.display = "flex";
}
function setCurrecntQuestionAnswer(answerId){
  currentQuestionImg.setAttribute("src", birdData[currentQuizIndex][answerId-1].image)
  currentQuestionName.innerHTML = birdData[currentQuizIndex][answerId-1].name;
}

function getCurrentQuizAuido(){
  let currentQuizAudio = new Audio();
  currentQuizAudio.src =  birdData[currentQuizIndex][questionsArray[currentQuizIndex]].audio;
  currentQuizAudio.onloadedmetadata = function(){
    let duration = convertTime(currentQuizAudio.duration)
    document.querySelector(".asnwer__info .audio-duration").innerHTML =  duration;
  }
  return currentQuizAudio
}
function resetCurrecntQuestionAnswer(){
  currentQuestionName.innerHTML = "******";
  currentQuestionImg.setAttribute("src", "../assets/img/unknown-bird.jpg");
}
let answerAudioPlayBtnIcon = answerAudioPlayBtn.querySelector(".audio-play")

audioPlayBtn.addEventListener("click", (e) => {
  selectedAnswerAudio.pause();
  answerAudioPlayBtnIcon.classList.remove("a-pause");
  answerAudioPlayBtnIcon.classList.add("a-play");

  if(audioPlayBtnIcon.classList.contains("a-play")){
    currentQuizAudio.play();
    audioPlayBtnIcon.classList.remove("a-play");
    audioPlayBtnIcon.classList.add("a-pause");
  }else if(audioPlayBtnIcon.classList.contains("a-pause")){
    currentQuizAudio.pause()
    audioPlayBtnIcon.classList.remove("a-pause");
    audioPlayBtnIcon.classList.add("a-play");
  }
})
answerAudioPlayBtn.addEventListener("click", (e) =>{
  currentQuizAudio.pause()
  audioPlayBtnIcon.classList.remove("a-pause");
  audioPlayBtnIcon.classList.add("a-play");

   if(answerAudioPlayBtnIcon.classList.contains("a-play")){
    selectedAnswerAudio.play();
    answerAudioPlayBtnIcon.classList.remove("a-play");
  answerAudioPlayBtnIcon.classList.add("a-pause");
  }else if(answerAudioPlayBtnIcon .classList.contains("a-pause")){
    selectedAnswerAudio.pause()
    answerAudioPlayBtnIcon.classList.remove("a-pause");
    answerAudioPlayBtnIcon.classList.add("a-play");
  }
})
function getAnswerAudio(){
  let selectedAnswerAudio = new Audio(birdData[currentQuizIndex][selectedAnswerId - 1].audio);
  selectedAnswerAudio.onloadedmetadata = function(){
    //let duration = String(selectedAnswerAudio.duration / 60).split('.')
    let duration = convertTime(selectedAnswerAudio.duration)
    //document.querySelector(".asnwer__info .audio-duration").innerHTML = `0${duration[0]} : ${duration[1].slice(0, 2)}`;
    document.querySelector(".asnwer__info .audio-duration").innerHTML =  duration;
  }
  return selectedAnswerAudio
}

function setContentLang(){
  categoriesList.forEach((item,index) => {
    item.innerHTML = contentLang[currentLang].quizCategories[index]
  })
  selectCorrectAnswer.querySelectorAll('p').forEach( (item, index) => {
    item.innerHTML =   contentLang[currentLang].quizSelectAction[index];
  })
}

//Audio

const audioPlayerContainer = document.querySelector(".audio-player-main");
const audioTimeline = document.querySelector('.audio-timeline')
const audioProgressBar = document.querySelector('.audio-progress')
const audioCurrentTime = document.querySelector('.audio-current-time')

let isDown = false;
audioTimeline.addEventListener("click",(event)=>{
  const timelineWidth = window.getComputedStyle(audioTimeline).width;
  const timeToSeek = event.offsetX / parseInt(timelineWidth) * currentQuizAudio.duration;
  currentQuizAudio.currentTime = timeToSeek
})
audioTimeline.addEventListener('mousedown',(event)=>{
  isDown = true;
  audioTimeline.style.cursor = 'grabbing'
  const timelineWidth = window.getComputedStyle(audioTimeline).width;
  const timeToSeek = event.offsetX / parseInt(timelineWidth) * currentQuizAudio.duration;
  currentQuizAudio.currentTime = timeToSeek
})
audioTimeline.addEventListener('mouseup',()=>{
  audioTimeline.style.cursor = 'pointer'
  isDown = false;
})
audioTimeline.addEventListener('mousemove', (event)=>{
  if(isDown){
      audioTimeline.style.cursor = 'grabbing'
      const timelineWidth = window.getComputedStyle(audioTimeline).width;
      const timeToSeek = event.offsetX / parseInt(timelineWidth) * currentQuizAudio.duration;
      currentQuizAudio.currentTime = timeToSeek
  }
})
currentQuizAudio.addEventListener('loadeddata',()=>{
  audioDuration.textContent = getTimeCodeFromNum(currentQuizAudio.duration);
  //audioImg.src = 'https://nazimajumaniyazova.github.io/Momentum/'+ playList[audioPlayNum].img;
  //currentQuizAudio.volume = .75;
})
function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}
setInterval(()=>{
  audioProgressBar.style.width = currentQuizAudio.currentTime / currentQuizAudio.duration * 100 + '%'
  audioCurrentTime.textContent = getTimeCodeFromNum(currentQuizAudio.currentTime)
},500)
setInterval(()=>{
  answerAudioProgress.style.width = selectedAnswerAudio.currentTime / selectedAnswerAudio.duration * 100 + '%'
  answerAudioCurrentTime.textContent = getTimeCodeFromNum(selectedAnswerAudio.currentTime)
},500)


volumeIcon.addEventListener("click", (e) => {
  console.log(currentVolume)
  if(volumeIcon.classList.contains('volume-on')){
    volumeIcon.classList.remove("volume-on");
    volumeIcon.classList.add("volume-off");
    currentVolume = currentQuizAudio.volume;
    currentQuizAudio.volume = 0;
    selectedAnswerAudio.volume = 0;
  }else{
    volumeIcon.classList.remove("volume-off");
    volumeIcon.classList.add("volume-on");
    currentQuizAudio.volume = currentVolume;
    selectedAnswerAudio.volume = currentVolume;
  }
})
volumeRange.addEventListener("mousedown", (e) =>{
  const volumeRangeWidth = window.getComputedStyle(volumeRange).width; //200 100 => на 1 volume 2 px
  let volume = e.offsetX / parseInt(volumeRangeWidth);
  console.log(volume)
  if(volume < 0){
    volume = 0
  }else if(volume > 1){
    volume = 1
  }
  currentQuizAudio.volume = volume;
  currentVolume = volume;
  selectedAnswerAudio.volume = currentVolume;
  volumeActiveRange.style.width = Math.round(volume * 100) + '%'
  volumeNum.innerHTML = Math.round(volume * 100);
})
function convertTime(audioDuration){    
    let mins = Math.floor(audioDuration / 60);
    if (mins < 10) {
      mins = '0' + String(mins);
    }
   let secs = Math.floor(audioDuration % 60);
    if (secs < 10) {
      secs = '0' + String(secs);
    }

    return mins + ':' + secs;
}
