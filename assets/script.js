var highscoreDisplay = document.querySelector(".highscoreCount");
var timeDisplay = document.querySelector(".timeDisplay");
var quizDisplay = document.querySelector(".quizBox");
var submitButton = document.querySelector(".submitBtn");
var results = document.querySelector(".results");
 
// tracking the question number in quizQuestion array
var questionNumber = 0;

var answersCorrect = 0; 
var answersIncorrect = 0;


// quiz questions organized as an array of objects 
quizQuestions = [
    {
    title: "What is the HTML tag under which one can write the JavaScript code?",
    choices: [
    "<jacascript>",
    "<scripted>",
    "<js>",
    "<script>"
    ],
    answer: "<script>"
    },
    {
    title: "Which of the following is the correct syntax to display “Gotta love Javascript” in an alert box using JavaScript?",
    choices: [
    'alertbox(“Gotta love Javascript”);',
    'msg(“Gotta love Javascript”);',
    'msgbox(“GeeksforGeeks”);',
    'alert("Gotta love Javascript")'
    ],
    answer: 'alert("Gotta love Javascript")'
    },
]


submitButton.addEventListener('click', startQuiz);

function startQuiz(event) {
    event.preventDefault();
    startClock();
    runQuiz();

}


function runQuiz() {
    var currentQuestion = quizQuestions[questionNumber] 
    var title = document.createElement("h2")
    title.textContent = currentQuestion.title 
    title.setAttribute("style", "margin:auto; width:75%; text-align:center");
    quizDisplay.append(title);
    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var choice = document.createElement("button");
        choice.setAttribute("class", "btn btn-info");
        choice.setAttribute("style", "margin:auto; width:30%; text-align:center;");
        choice.setAttribute("value", currentQuestion.choices[i]);
        choice.textContent = currentQuestion.choices[i];
        choice.onclick = userClick
        quizDisplay.append(choice)
    }
    function userClick(choice, answer) {
        if (choice.value != currentQuestion.answer) {
            answersIncorrect++
            timeDisplay = timeDisplay - 5
            questionNumber++
            console.log(answer, questionNumber,)
        } else {
            answersCorrect++
            questionNumber++
            console.log(answersCorrect, questionNumber)
        }
        
        document.querySelector(".quizBox").innerHTML = "";
    
        if (questionNumber === quizQuestions.length) {
            endQuiz()
        } else {
            runQuiz(questionNumber)
        }
        // use a conditional to compare click value to current quesiton answer value, if wrong take away time, if right move on, empty div 
        // at end , if current question no ==== quizQuestions.length then end quiz or run quiz again - quiz display .empty look up w3schools 
        // quizDisplay.innerHTML("") 
    }
     

}


function endQuiz() {
    
    var timeDisplay = document.querySelector(".timeDisplay")
    var score = timeDisplay.textContent
    localStorage.setItem("endTime", score)

    var initials = prompt("Enter your initials to record your highscore")
    localStorage.setItem("initials", initials)
    document.querySelector(".quizBox").innerHTML = "";
    document.querySelector(".timeDisplay").innerHTML = "Time:";
    document.querySelector(".quizBox").innerHTML = "The highscores are: " + localStorage.getItem("initials") + " with a " + localStorage.getItem("endTime")

}


// timer display funciton for quiz 
function startTimer(duration, timeDisplay) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timeDisplay.textContent = "Time: " + minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}


//  countdown function for quiz 
function startClock() {
    var fiveMinutes = 60 * 1.5,
        timeDisplay = document.querySelector('.timeDisplay');
    startTimer(fiveMinutes, timeDisplay);
};