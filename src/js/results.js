
const btnRestart = document.querySelector(".btn-restart");
const userResult = document.querySelectorAll(".user-result__result span")[0];

userResult.innerHTML = window.localStorage.getItem("userScore");

