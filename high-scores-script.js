//game variables
let secondsLeft;
let userScore;
let scores;

//highscore elements
let scoreEl = document.querySelector(".myScore");
let scoreDisiplayEl = document.querySelector(".myScoreJumbotron");
let allScoresDisplayEl = document.querySelector(".allScoresJumbotron");

function getState() {
    //get state of page to display high scores or input user initials
    let score = JSON.parse(window.localStorage.getItem("currentScore"));
    refreshScoresList();
    if (score !== null) {
        $(".myScoreJumbotron").show();
        $(".allScoresJumbotron").hide();
        userScore = score;
        scoreEl.textContent = `Your final score is ${score}`;
    } else {
        $(".myScoreJumbotron").hide();
        $(".allScoresJumbotron").show();
        displayScores();
    }
}

    let scoresObj = JSON.parse(window.localStorage.getItem("scores"));

function displayScores() {
    refreshScoresList();
    $(".allScoresList").html();
    if (scores) {
        let scoresArr = Object.keys(scores).map(Number).sort(function(a, b){return b-a});
        scoresArr.forEach(element => {
            $(".allScoresList").append(`<li>Score:${element} by ${scores[element]}</li>`);
        }); 
    }
    
}

function refreshScoresList() {
    scores = JSON.parse(window.localStorage.getItem("scores"));
}

function addScore() {
    let initials = document.querySelector('input').value;
    refreshScoresList();
    window.localStorage.removeItem("currentScore");
    if (!scores) {
        scores = {};
    };
    scores[userScore] = initials;
    window.localStorage.setItem("scores", JSON.stringify(scores));
    getState();
};

function clearScores(){
    if (scores) {
        window.localStorage.removeItem("scores");
        location.reload();
    };
};

getState(); //Get initial state
