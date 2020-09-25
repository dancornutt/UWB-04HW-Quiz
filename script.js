//library of questions, choices and answers
let lib = {
    'True/False represents which data type?': [
        ['string', false],
        ['array', false],
        ['integer', false],
        ['boolean', true]
    ],
    'API stands for what?': [
        ['Application Programming Interface', true],
        ['Automatic Programming Interface', false],
        ['Application Property Interface', false],
        ['All Property Intercom', false],
    ],
    'What\'s an example of a loop': [
        ['for', true],
        ['while', true],
        ['if', false],
        ['because', false]
    ],
    'Why is linux the best operating sytem?': [
        ['open source', true],
        ['fast', true],
        ['the guy who made it did it for fun vs to make money', true],
        ['it\'s what you see in the movies', true]
    ],
    'What are the 3 main documents you use in web dev?': [
        ['CSS, HTML, and Javascript', true],
        ['files, folders, and links', false],
        ['Files, HTML, and Javascript', false],
        ['CSS, SASS, and HTML', false],
    ]
}

//array of questions to ask
let questions = Object.keys(lib);
// let questions = ['1','2','3','4'];


//game variables
let userScore;

//elements
let timerEl = document.querySelector(".timer");
let playBtn = document.getElementById("playBtn");
let questionEl = document.querySelector(".question");
let choicesEl = document.querySelector('.choices');
let buttonsEl = choicesEl.childNodes;


//function to retreive random question not already asked & decrement question array
//return: string if 
function pickRandom() {
    if (questions.length === 0) {
        return null;
    } else {
        let randIndex = Math.floor(Math.random * questions.length);
        let randQuestion = questions.pop();
        // questions = questions.splice(randIndex, 1);
        console.log("RandQ: ", questions, randIndex, randQuestion);
        return randQuestion;
    }
}

//funtion to shuffle array choices
function shuffleArr(arr) {
    let currentIndex = arr.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
    // pick a remaining element in array
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    //exchange it with the current element
    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }
  return arr;
}

function navToHighScores() {
    window.location.href = './high-scores.html';
}

//Picks question, displays question, creates buttons
function askQuestion() {
    let thisQ = pickRandom()
    console.log("Inside askQuestion ", thisQ);
    questionEl.textContent = thisQ;
    let choices = lib[thisQ];
    
    //delete all buttons existing
    while (choicesEl.firstChild) {
        choicesEl.removeChild(choicesEl.firstChild);
    };
    //for length of choices, create a button with choice id, set text value
    for (let i = 0; i < choices.length; i++) {
        //create element
        let btnEl = document.createElement("button");
        btnEl.setAttribute("class", "choice");
        btnEl.setAttribute("id", i);
        btnEl.textContent = choices[i][0];
        //append to parent
        choicesEl.appendChild(btnEl);
        console.log("creating button! with values: ", choices[i]);
    };
    console.log("After creating buttons, ButtonsEl: ", buttonsEl);
}

function evaluateResponse(data) {
    console.log("Evaluate Question function: ", data);
}

//interval for checking if gameplay is valid.
function setTimer() {
    userScore = 0;
    let secondsLeft = 5;
    //shuffle questions
    questions = shuffleArr(questions);
    //main loop
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timerEl.textContent = `Time left ${secondsLeft}`;
      if(!secondsLeft || !questions.length) {
        playBtn.setAttribute("disabled", false);
        clearInterval(timerInterval);
        userScore = secondsLeft; //might not need userScore variable
        //redirect to high-scores page
        // navToHighScores();
      }
  
    }, 1000);
  }

  //Main function for game play
  function playGame() {
      playBtn.setAttribute("disabled", true);
      setTimer();
      askQuestion()
  }

choicesEl.addEventListener("click", function(event) {
    event.preventDefault();
    if(event.target.matches("button")) {
        evaluateResponse(event.target);
        askQuestion();
    }
    }
    );