//game variables
let secondsLeft;
let userScore;
let scores;


//highscore elements
let scoreEl = document.querySelector(".myScore");
let scoreDisiplayEl = document.querySelector(".myScoreJumbotron");
let allScoresDisplayEl = document.querySelector(".allScoresJumbotron")
// scoreEl.textContent = `Your final score is ${secondsLeft}`

function getState() {
    let score = JSON.parse(window.localStorage.getItem("currentScore"));
    if (score) {
        //take score information mode
        $(".myScoreJumbotron").show();
        $(".allScoresJumbotron").hide();
        userScore = score;
        scoreEl.textContent = `Your final score is ${score}`;
    } else {
        ////display high score
        $(".myScoreJumbotron").hide();
        $(".allScoresJumbotron").show();

    }
}

function addScore() {
    let initials = document.querySelector('input').value;
    let scoresObj = JSON.parse(window.localStorage.getItem("scores"));
    let userScore = JSON.parse(window.localStorage.getItem("currentScore"));
    window.localStorage.removeItem("currentScore");
    if (!scoresObj) {
        scoresObj = {};
    };
    scoresObj[initials] = userScore;
    console.log("Initials: ", initials, userScore);
    window.localStorage.setItem("scores", JSON.stringify(scoresObj));
    getState();
};


function clearScores(){
    scores = JSON.parse(window.localStorage.getItem("scores"))
    if (scores) {
        window.localStorage.removeItem("scores");
    }
}

getState();
