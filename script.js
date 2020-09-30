//library of questions, choices and answers
let lib = {
    'True/False represents which data type?': {
        'string': false,
        'array': false,
        'integer': false,
        'boolean': true
    },
    'API stands for what?': {
        'Application Programming Interface': true,
        'Automatic Programming Interface': false,
        'Application Property Interface': false,
        'All Property Intercom': false,
    },
    'What\'s an example of a loop': {
        'for': true,
        'while': true,
        'for/in': true,
        'do/while': true
    },
    'How do you convert a string to an int?': {
        'paseInt': true,
        'toString': true,
        'toStr': true,
        'Str': true
    },
    'How do you check if a value is a number?': {
        'isNAN': true,
        'isNumber': false,
        'isNumberic': false,
        'isNum': false
    },
    'What are the 3 main file types you use in web dev?': {
        'CSS, HTML, and Javascript': true,
        'files, folders, and links': false,
        'Files, HTML, and Javascript': false,
        'CSS, SASS, and HTML': false,
    }
}

//game variables
let secondsLeft;
let questions = Object.keys(lib);

//game elements
let timerEl = document.querySelector(".timer");
let playBtn = document.getElementById("playBtn");
let questionEl = document.querySelector(".question");
let choicesEl = document.querySelector('.choices');
let buttonsEl = choicesEl.childNodes;

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

//Picks question, displays question, removes buttons if they exist, creates new buttons
function askQuestion() {
    let thisQ = questions.pop()
    questionEl.textContent = thisQ;
    let choices = Object.keys(lib[thisQ]);
    choices = shuffleArr(choices);
    
    //Delete all buttons existing
    while (choicesEl.firstChild) {
        choicesEl.removeChild(choicesEl.firstChild);
    };
    //For length of choices, create a button with choice id, set text value, append to list
    for (let i = 0; i < choices.length; i++) {
        let btnEl = document.createElement("button");
        btnEl.setAttribute("class", "choice");
        btnEl.setAttribute("id", i);
        btnEl.textContent = `${i+1}. ${choices[i]}`;
        choicesEl.appendChild(btnEl);
    };
}

function evaluateResponse(data) {
    data = data.split(". ")[1]; //remove numbers
    let answerScore = -1;
    if (lib[questionEl.textContent][data]) {
        answerScore = 5;
    };
    userFeedback(answerScore);
    return answerScore;
}

function userFeedback(val) {
    let msg = "Your response is wrong... :("
    let time = 0.5;
    if (parseInt(val) > 0) {
        msg = "CORRECT!"
    };
    let feedback = $(`<p>${msg}</p>`).attr("id", "feedback")
    $("section").append(feedback);
    let timerInterval = setInterval(function() {
        time -= 0.1;
        if(time < 0) {
          clearInterval(timerInterval);
          $("section").children("#feedback").remove()
        }
    
      }, 100);
}

//interval for checking if gameplay is valid.
function setTimer() {
    questions = shuffleArr(questions);
    //game timer
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timerEl.textContent = `Time left ${secondsLeft}`;
      if(!secondsLeft || !questions.length) {
        clearInterval(timerInterval);
        endGame();
      }
    }, 1000);
  }

  //Main function for game play
  function playGame() {
      secondsLeft = 60;
      playBtn.setAttribute("disabled", true);
      setTimer();
      askQuestion()
  }

  function endGame() {
    playBtn.setAttribute("disabled", false);
    window.localStorage.setItem("currentScore", JSON.stringify(secondsLeft));
    window.location.href = './high-scores.html';
  }

choicesEl.addEventListener("click", function(event) {
    event.preventDefault();
    if(event.target.matches("button")) {
        secondsLeft += evaluateResponse(event.target.innerText);
        if (questions.length) {
            askQuestion();
        }
    }
});