// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");
const timer = document.getElementById("timer");
const  clearInterval = document.getElementById("intervalId");

const  timeup = document.getElementById("timeup");

const quizQuestions =[
    {
        question: "What is the capital of France?",
        answers: [
            {text: "London", correct: false},
            {text: "Berlin", correct: false},
            {text: "Paris", correct: true},
            {text: "Madrid", correct: false},
        ],
    },

     {
        question: "Which planet is known as Red Planet?",
        answers: [
            {text: "Venus", correct: false},
            {text: "Mars", correct: true},
            {text: "Jupiter", correct: false},
            {text: "Saturn", correct: false},
    ],
    },

    {
        question: "What is the largest ocean on Earth?",
        answers: [
            {text: "Atlantic Ocean", correct: false},
            {text: "Indian Ocean", correct: false},
            {text: "Arctic Ocean", correct: false},
            {text: "Pacific Ocean", correct: true},
    ],
    },

     {
        question: "Which of these is NOT a programming language?",
        answers: [
            {text: "Java", correct: false},
            {text: "Python", correct: false},
            {text: "Banana", correct: true},
            {text: "javascript", correct: false},
    ],
    },

     {
        question: "What is the chemical symbol for gold?",
        answers: [
            {text: "Go", correct: false},
            {text: "Gd", correct: false},
            {text: "Au", correct: true},
            {text: "Ag", correct: false},
    ],
    }, 

    
    
];

// QUIZ STATE VARS

let currentQuestionIndex = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;  

// event listeners

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz(){
    
    //reset vars
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion()
}


function showQuestion() {
    //reset state
    answersDisabled = false

    const currentQuestion = quizQuestions[currentQuestionIndex]

    currentQuestionSpan.textContent = currentQuestionIndex + 1

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%" 

    questionText.textContent = currentQuestion.question;

    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        // dataset-- used to tell when correct answer is clicked. also allows you to store custom data
       button.dataset.correct = answer.correct; 

       button.addEventListener("click",selectAnswer);
    
       answersContainer.appendChild(button);
       
    });
}

function selectAnswer(event) {
    //optimzation check
    if(answersDisabled) return

    answersDisabled = true
    const selectedButton = event.target; 
    const isCorrect = selectedButton.dataset.correct === "true"


    Array.from(answersContainer.children).forEach(button  => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");

        } else if (button === selectedButton)  {
            button.classList.add("incorrect");
        }
    });

    if(isCorrect) {
        score++;
        scoreSpan.textContent = score
    }

    setTimeout(() => {
        currentQuestionIndex++;
        //check if there more questions or if the quiz is over
        if(currentQuestionIndex < quizQuestions.length) {
            showQuestion()
        } else {
            showResults( )
        }
    }, 1000)
}

function showResults() {
    quizScreen.classList.remove("active")
    resultScreen.classList.add("active")

    finalScoreSpan.textContent = score;

    const percentage = (score/quizQuestions.length) * 100


    if(percentage === 100) {
        resultMessage.textContent = "Perfect! You're a genius";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Great job! You know your stuff!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good effort! keep learning!";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Not bad! Try again to improve!";
    } else {
        resultMessage.textContent = "Keep studying! You'll get better";
    }
}
function restartQuiz() {
    resultScreen.classList.remove("active");

    startQuiz();
}

/*const startMinutes = 5;
let time = startMinutes = 60;
const countdownEl = document.getElementById('countdown');

setInterval(updateCountdown, 1000);

function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds: seconds;

    countdownEl.innerHTML = `${minutes}: ${seconds}`;
    time--;

    startTimer();
}
*/
 

var seconds = 0;
  var minutes = 0;
  var hours = 0;
  var quizEnded = false;

  function startTimer() {
    if (quizEnded) return;

    seconds++;
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
    if (minutes === 60) {
      hours++;
      minutes = 0;
    }
document.getElementById("timer").innerHTML = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);

    if (minutes >= 1) {
      setTimeout(() => {
        currentQuestionIndex++;
        //check if there more questions or if the quiz is over
        if(currentQuestionIndex < quizQuestions.length) {
            showResults()
        } else {
            function restartQuiz() {
    resultScreen.classList.remove("active");

    startQuiz();
}

        }
        
    }, 1000)();

    } else {
      setTimeout(startTimer, 1000); 
    } 
      
  }

  startTimer();




