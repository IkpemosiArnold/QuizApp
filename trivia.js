//----- Variable Declarations------------//

var player;
const start = document.getElementById("start");
const landingPage = document.getElementById("landingPage");
const questionPage = document.getElementById("questionPage");
const donePage = document.getElementById("donePage");
currentQuestion = document.getElementById("question");
quizScores = document.getElementById("quizScores");
 options = document.getElementById("options");
 hScore = document.getElementById("hScore");
 cScore = document.getElementById("cScore");
 next = document.getElementById("next");
 replay = document.getElementById("replay");
 share = document.getElementById("share");
 sbText = document.getElementById("sbText");
 
var name;
var counter =0;
var highScore =0;
var currentScore=0;
let qArray = [
   
    {
      question: "Is Water wet ?",
      options: ["No, It makes surfaces wet", "Yes, it is", "I don't know",],
      answer: "No, It makes surfaces wet",
    },
    {
      question: "What was the first electronic computer called?",
      options: ["ENIAC", "Linux", "Mac",],
      answer: "ENIAC",
    }, 
    {
      question: "The popular fictional detective, 'Sherlock Holmes' is known for using what style of thinking?",
      options: ["Inductive", "Deductive", "Reductive",],
      answer: "Deductive",
    }, 
    {
        question: "Which artist painted the late 15th century mural known as 'Last Supper'?",
        options: ["Dennis Osadebe", "Leonardo Da Vinci", "Michaelangelo",],
        answer: "Leonardo Da Vinci",
      }, 
      {
        question: "Which Nigerian Author Won a Nobel Prize for Literature?",
        options: ["Chinua Achebe", "Wole Soyinka", "Chimamanda Adiche",],
        answer: "Wole Soyinka",
      }, 
  ];




//------------------------------- FUNCTIONS -------------------------------------------//
function startQuiz(){
name = document.getElementById("inputName").value; 
if(name == "")
{
    player ={ username:"Anonymous", highscore:0};
}
else{
    player ={ username:name, Highscore:0};
}  

landingPage.classList.add("hide");
getQuestions();
questionPage.classList.remove("hide");
quizScores.classList.remove("hide");
options.classList.remove("clicked");

}

function getQuestions(){
    
    currentQuestion.innerText = qArray[counter].question;
   
    for (let option of qArray[counter].options.sort(() => Math.random() - 0.5)) {
      let btn = document.createElement("button");
      btn.innerText = option;
      btn.onclick = checkAnswer;
      btn.classList.add("optionBtn");
      options.appendChild(btn);
    }
}
function nextQuestion() {
  if (counter >= 4) {
    return endQuiz();
  }
  currentQuestion.innerHTML = ``;
  options.innerHTML = ``;
  counter++;
  getQuestions();
  next.classList.remove("hide");
  options.classList.remove("clicked");
}

function updateScore() {
  cScore.innerText = ++currentScore;
}
function resetScore(){
  currentScore =0;
  cScore.innerText = currentScore;
}

function updateHighScore(currentScore){
    if(currentScore > highScore){
      highScore = currentScore;
    }
    else if(highScore > currentScore)
    {
    highScore = highScore;
    }
    else{
      highScore = highScore;
    }
    hScore.innerText = highScore;
}

function checkAnswer(e) {
  let selectedOption = e.target;
  options.classList.add("clicked");
  next.classList.remove("hide");
 
  if (selectedOption.innerText === qArray[counter].answer) {
 
    selectedOption.classList.add("correct");
    updateScore();
    updateHighScore(currentScore);
  } else {
 
    selectedOption.classList.add("incorrect");
  }

  showCorrect();
}
function showCorrect() {
  let optionButtons = Array.from(document.getElementsByClassName("optionBtn"));

  optionButtons
    .filter((option) => option.innerText === qArray[counter].answer)
    .map((correct) => correct.classList.add("correct"));
}
function endQuiz() {
  counter = 0;
  currentQuestion.innerHTML = ``;
  options.innerHTML = ``;
  questionPage.classList.add("hide");
  quizScores.classList.add("hide");
  donePage.classList.remove("hide");
  
  sbText.innerText="Hey " + player.username + " you scored " +  currentScore + "/5!";
 


}

function restartQuiz(){
  resetScore();
  donePage.classList.add("hide");
  getQuestions();
  questionPage.classList.remove("hide");
  quizScores.classList.remove("hide");
  options.classList.remove("clicked");
}
//----------------------------------EVENT LISTENERS---------------------------------------//
start.addEventListener("click", startQuiz);
next.addEventListener("click", nextQuestion);
replay.addEventListener("click", restartQuiz);