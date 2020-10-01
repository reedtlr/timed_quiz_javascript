// highscore button in navabr
var highscoreDisplay = document.querySelector(".highscoreCount");
// countdown clock in navbar
var timeDisplay = document.querySelector(".timeDisplay");
// main quiz body
var quizDisplay = document.querySelector(".quizBox");
// submit button to start quiz
var submitButton = document.querySelector(".submitBtn");
// results section for displaying highscores 
var results = document.querySelector(".results");
 
// tracking the question number in quizQuestion array
var questionNumber = 0;

// tracking time for quiz in seconds
var secondsLeft = 90;

// records number of correct and incorrect questions answered 
var answersCorrect = 0; 
var answersIncorrect = 0;

// create header
var headerEl = document.createElement("h2");

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
    {
    title: "What are variables used for in JavaScript Programs?",
    choices: [
    "Storing numbers, dates, or other values",
    "Varying randomly",
    "Causing high-school algebra flashbacks",
    "None of the above",
    ],
    answer: "Storing numbers, dates, or other values"
    },
    {
        title: "Which of the following is not a valid JavaScript variable name?",
        choices: [
    "2names",
    "_first_and_last_names",
    "FirstAndLast",
    "None of the above",
        ],
        answer: "2names"
    },
    {
        title: "Which is the correct way to write a JavaScript array?",
        choices: [
            'var txt = new Array(1:"tim",2:"kim",3:"jim")',
            'var txt = new Array:1=("tim")2=("kim")3=("jim")',
            'var txt = new Array("tim","kim","jim")',
            'var txt = new Array="tim","kim","jim"',
        ],
        answer: 'var txt = new Array(1:"tim",2:"kim",3:"jim")'
    },
    {
      title: "Which of the following best describes JavaScript?",
      choices: [
        "a low-level programming language",
        "a scripting language precompiled in the browser",
        "a compiled scripting language",
        "an object-oriented scripting language",
      ],
      answer: "an object-oriented scripting language",
    },
    {
      title: "______method evaluates a string of JavaScript code in the context of the specified",
      choices: [
        "Eval",
        "ParseInt",
        "ParseFloat",
        "Efloat",
      ],
      answer: "Eval",
    },
    {
      title: "Using _______ statement is how you test for a specific condition.",
      choices: [
        "Select",
        "If",
        "Switch",
        "For",
      ],
      answer: "If",
    },
    {
      title: "Which of the following is the structure of an if statement?",
      choices: [
        "if (conditional expression is true) thenexecute this codeend if",
        "if (conditional expression is true)execute this codeend if",
        "if (conditional expression is true)   {then execute this code>->}",
        "if (conditional expression is true) then {execute this code}",
      ],
      answer: "if (conditional expression is true)   {then execute this code>->}",
    },
    {
      title: "How to create a Date object in JavaScript?",
      choices: [
        "dateObjectName = new Date([parameters])",
        "dateObjectName.new Date([parameters])",
        "dateObjectName := new Date([parameters])",
        "dateObjectName Date([parameters]",
      ],
      answer: "dateObjectName = new Date([parameters])",
    },
]

// starts the quiz
submitButton.addEventListener('click', startQuiz);

function startQuiz(event) {
    event.preventDefault();

    // starts a pre-quiz instructional page
    getReady();

}

// main function for rendering the quiz and recording the user answer
function runQuiz() {
    var currentQuestion = quizQuestions[questionNumber] 
    var title = document.createElement("h2")
    title.textContent = currentQuestion.title 
    title.setAttribute("style", "margin:auto; width:75%; text-align:center");
    quizDisplay.append(title);
    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var choice = document.createElement("button");
        choice.setAttribute("class", "btn btn-info");
        choice.setAttribute("style", "margin:auto; margin-top:0.5rem; width:30%; text-align:center;");
        choice.setAttribute("value", currentQuestion.choices[i]);
        choice.textContent = currentQuestion.choices[i];
        var answerC = currentQuestion.answer[i]
        choice.onclick = userClick
        quizDisplay.append(choice)
    }
 
    // fuction for what happens when the user clicks on an answer
    function userClick(choice) {
        var element = choice.target
        if (element.textContent != currentQuestion.answer) {
            secondsLeft = secondsLeft - 5
            answersIncorrect++
            questionNumber++
            console.log("Question No", questionNumber)
        } else {
            answersCorrect++
            questionNumber++
            console.log("correct", answersCorrect, "Question No", questionNumber)
        }
        
        document.querySelector(".quizBox").innerHTML = "";
    
        if (questionNumber === quizQuestions.length) {
            endQuiz()
        } else {
            runQuiz(questionNumber)
        }
    }
     

}

// function for what happens when the time runs out or the user answers all of the questions
function endQuiz() {
   
    var timeDisplay = document.querySelector(".timeDisplay")
    var inputs = secondsLeft
    
    var values = JSON.parse(localStorage.getItem('scoreStore') || '[]');

    var initials = prompt("Enter your initials to record your highscore")
    var userScore = { score: inputs + answersCorrect, initials: initials}
    alert("Your score is " + userScore.score + " and your initials are recored as " + userScore.initials )
    values.push(userScore)
    window.localStorage.setItem("scoreStore", JSON.stringify(values));
  

    document.querySelector(".quizBox").innerHTML = "";
    document.querySelector(".timeDisplay").innerHTML = "Time:";
    hideClock() 

    var h2 = document.createElement("h2")
    h2.textContent = "The highscores are: " 
    h2.setAttribute("class", "card-title justify-content-center")
    h2.setAttribute("style", "margin:auto; text-align:center;")
    quizDisplay.appendChild(h2)

    var ul = document.createElement("ul")
    ul.setAttribute("style", "margin:auto; width:70%; text-align:center;")
    ul.setAttribute("class", "scoreList card-body justify-content-center")
    quizDisplay.appendChild(ul)
    
    //  recall results and sort in decending order by score
    var results = JSON.parse(localStorage.getItem('scoreStore'));
    var resultsSorted = results.sort(function (a, b) {
      return b.score - a.score;
    });

    // for loop for rendering highscores 
    for (var i = 0; i < resultsSorted.length; i++) {
        var li = document.createElement("li")
        var currentScore = "The score of " + resultsSorted[i].score + " was achieved by " + resultsSorted[i].initials 
        li.innerHTML = currentScore
        li.setAttribute("style", "margin:auto; width:30%; text-align:center;")
        document.querySelector(".scoreList").appendChild(li)
    }

}

// introductory message before quiz starts 
function getReady() {
    var timeLeft = 6;
    hideSubmit()
    headerEl.textContent = "You have 90 seconds to complete this quiz. The faster you complete the quiz, the higher your score. An incorrect answer will deduct 5 seconds. Your final score is your remaining time plus the number of correct answers"
    headerEl.setAttribute("style", "margin:auto; width:50%; text-align:center;")
    quizDisplay.append(headerEl)

    var timeInterval = setInterval(function() {
      timeDisplay.textContent = timeLeft + " seconds remaining";
      timeLeft--;
  
      if (timeLeft === 0) {
        timeDisplay.textContent = "";
        clearInterval(timeInterval);
        runQuiz();
        startClock();
        headerEl.textContent = ""
       
      }
  
    }, 1000);
  }

// timer display funciton for quiz 
function startClock(event) {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timeDisplay.textContent = "Time: " + secondsLeft + " seconds remaining";
  
      if(secondsLeft === 0) {
        endQuiz();
        clearInterval(timerInterval);
        event.stopPropagation()
      }
  
    }, 1000);
  }

//  function to hide submit button durring the quiz 
function hideSubmit() {
    var x = document.querySelector(".submitBtn");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

//   function to hide the counter in the navbar
  function hideClock() {
    var x = document.querySelector(".timeDisplay");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

//   function to skip the quiz and go directly to the highscores 
  function showHigh() {

        var timeDisplay = document.querySelector(".timeDisplay")
        var values = JSON.parse(localStorage.getItem('scoreStore') || '[]');

    
    window.localStorage.setItem("scoreStore", JSON.stringify(values));
     
        
        document.querySelector(".quizBox").innerHTML = "";
        document.querySelector(".timeDisplay").innerHTML = "Time:";
        hideClock() 
        hideSubmit()

        var h2 = document.createElement("h2")
        h2.textContent = "The highscores are: " 
        h2.setAttribute("class", "card-title justify-content-center")
        h2.setAttribute("style", "margin:auto; text-align:center;")
        quizDisplay.appendChild(h2)
    
        var ul = document.createElement("ul")
        ul.setAttribute("style", "margin:auto; width:70%; text-align:center;")
        ul.setAttribute("class", "scoreList card-body justify-content-center")
        quizDisplay.appendChild(ul)
        
        //  recall results and sort in decending order by score
        var results = JSON.parse(localStorage.getItem('scoreStore'));
        var resultsSorted = results.sort(function (a, b) {
          return b.score - a.score;
        });

        // for loop for rendering highscores 
            for (var i = 0; i < resultsSorted.length; i++) {
                var li = document.createElement("li")
                var currentScore = "The score of " + resultsSorted[i].score + " was achieved by " + resultsSorted[i].initials 
                li.innerHTML = currentScore
                li.setAttribute("style", "margin:auto; width:30%; text-align:center;")
                document.querySelector(".scoreList").appendChild(li)
            }
            
}