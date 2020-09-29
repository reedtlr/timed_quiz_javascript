var highscoreDisplay = document.querySelector(".highscoreCount");
var timeDisplay = document.querySelector(".timeDisplay");
var quizDisplay = document.querySelector(".quizBox");
var submitButton = document.querySelector(".submitBtn");
var results = document.querySelector(".results");
 
// tracking the question number in quizQuestion array
var questionNumber = 0;

// tracking time for quiz in seconds
var secondsLeft = 90;

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
]


submitButton.addEventListener('click', startQuiz);

function startQuiz(event) {
    event.preventDefault();
    getReady();

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
        var answerC = currentQuestion.answer[i]
        choice.onclick = userClick
        quizDisplay.append(choice)
    }
 
    function userClick(choice) {
        var element = choice.target
        console.log("element", element)
        console.log("current answer", currentQuestion.answer)
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


function endQuiz() {
   
    var timeDisplay = document.querySelector(".timeDisplay")
    var inputs = secondsLeft
    
    var values = JSON.parse(localStorage.getItem('scoreStore') || '{}');
    var inputs = document.getElementsByName("scoreStore")

    for (let i = 0; i < inputs.length; i++) {
        var x = inputs[i];
        x.value = values[i] || '';// stored value if it exists or empty string
    
        x.onchange = function() {
          // assign value to the object above
          values[i] = this.value;
          // store updated version of object
          localStorage.setItem('scoreStore', JSON.stringify(values));
        }
      }
      
    var initials = prompt("Enter your initials to record your highscore")
    var inputs1 = initials
    var values1 = JSON.parse(localStorage.getItem('initialsStore') || '{}');
    var inputs1 = document.getElementsByName("initialsStore")

    for (let i = 0; i < inputs1.length; i++) {
        var x = inputs1[i];
        x.value = values1[i] || '';// stored value if it exists or empty string
    
        x.onchange = function() {
          // assign value to the object above
          values1[i] = this.value;
          // store updated version of object
          localStorage.setItem('initialsStore', JSON.stringify(values1));
        }
      }
      


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
    
    var li = document.createElement("li")
    li.textContent = localStorage.getItem("initialsStore") + " with a score of " + localStorage.getItem("scoreStore")
    li.setAttribute("style", "margin:auto; width:70%; text-align:center;")
    quizDisplay.appendChild(li)
    
   
// first attempt at a for loop for rendering highscores 
    // for (var i = 0; i < score.length; i++) {
    //     var li = document.createElement("li")
    //     var currentScore = storedInitials[i] + " with a score of " + storedScore[i]
    //     li.textContent = currentScore
    //     li.setAttribute("style", "margin:auto; width:30%; text-align:center;")
    //     document.querySelector(".scoreList").appendChild(li)
    
    // }
    

}

// message before quiz starts 
function getReady() {
    var timeLeft = 2;
    hideSubmit()
    headerEl.textContent = "You have 90 seconds to complete this quiz. The faster you complete the quiz, the higher your score."
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
function startClock() {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timeDisplay.textContent = "Time: " + secondsLeft + " seconds remaining";
  
      if(secondsLeft === 0) {
        endQuiz();
        clearInterval(timerInterval);
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

  function hideClock() {
    var x = document.querySelector(".timeDisplay");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  function showHigh() {

        var timeDisplay = document.querySelector(".timeDisplay")
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
        
        var li = document.createElement("li")
        li.textContent = localStorage.getItem("initials") + " with a score of " + localStorage.getItem("endTime")
        li.setAttribute("style", "margin:auto; width:70%; text-align:center;")
        quizDisplay.appendChild(li)
    
  }