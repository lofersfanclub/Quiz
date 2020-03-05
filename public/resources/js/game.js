var numQ = quizQuestions.length;
var gameArray = [];
var currentScore;

var startScreen = document.getElementById('start_screen');
var gameScreen = document.getElementById('game_screen');

startScreen.style.display = 'block';
gameScreen.style.display = 'none';

var card__header = document.getElementById('card-header');
var question__title = document.getElementById('question__title');
var question__question = document.getElementById('question__question');
var choise_a = document.getElementById('choise_a');
var choise_b = document.getElementById('choise_b');
var choise_c = document.getElementById('choise_c');

var timeline = gsap.timeline({});
var fadeTime = 0.5;




// Load all questions, shuffle questions, pick question, start game.
function loadQuestions(){
       timeline.set(".card", {
           opacity: 0,
       });
    currentScore = 0;
    console.log("Load questions");
    getQuizQuestionsIds(quizQuestions, shuffleQuizQuestionsIds);  
}

// Get all questions
function getQuizQuestionsIds(array, callback) {
    var questionIds = [];
    for (i = 0; i < array.length; i++) {
        questionIds.push(quizQuestions[i]['id']);
    }
    console.log("Get question ids: " + questionIds);
    callback(questionIds, play);
}

// Shuffle questions
function shuffleQuizQuestionsIds(array, callback) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    var shuffledIdArray = array;
    gameArray = shuffledIdArray;
    console.log("Shuffle question ids: " + gameArray);
    console.log("%cGame start :)", "color:purple; font-size: 15px");
    callback(gameArray);
}

//Play game
function play(gameArray) {
     
      if (gameArray.length > 0) {
    startScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    timeline.to(".card", fadeTime, {
                opacity: 1,
            });

    var randomQuestion = getRandomQuestion(gameArray);
    
// Insert text
    // document.body.appendChild(p); // Append <button> to <body>
    removeAnswerdQuestion(randomQuestion, gameArray)
    }
    else{
    console.log("%cGame over :(", "color:black; font-size: 15px");
    // startScreen.style.display = 'block';
    // gameScreen.style.display = 'none';
        
    }
}

//Get random Question
function getRandomQuestion(items) {
    var item = items[Math.floor(Math.random() * items.length)];
    addOptions(item)
    return item;
}

function gameOver(){
    timeline.to(".card", fadeTime, {
        opacity: 0,
        onComplete: play,
        onCompleteParams: [gameArray]
    });
    gameArray = [];
    console.log("Next round array empty: " + gameArray);
    play(gameArray);
}

function removeAnswerdQuestion(q, array) {
    console.log("Current question: " + q);
    const index = array.indexOf(q);
    if (index > -1) {
        array.splice(index, 1);
    }
    // array = [2, 9]
    console.log("Next round array: " + array);
}

function addOptions(item){

    currentQuestion = quizQuestions[item];
    card__header.classList.add("c" + currentQuestion.id);
    question__title.innerHTML = currentQuestion.title;
    question__question.innerHTML = currentQuestion.question;

    //set options for choise buttons
    choise_a.innerHTML = currentQuestion.choices[0];
    choise_b.innerHTML = currentQuestion.choices[1];
    choise_c.innerHTML = currentQuestion.choices[2];

    //set function for choise buttons
    choise_a.setAttribute("onclick", 'validateChoice(' + 0 + ',' + currentQuestion.correctAnswer + ')');
    choise_b.setAttribute("onclick", 'validateChoice(' + 1 + ',' + currentQuestion.correctAnswer + ')');
    choise_c.setAttribute("onclick", 'validateChoice(' + 2 + ',' + currentQuestion.correctAnswer + ')');
}

function validateChoice(a, b){
    if(a == b){
               currentScore++;
             console.log("%cCorrect Answer", "color:green; font-size: 15px");

        timeline.to(".card", fadeTime, {
            opacity: 0,
            onComplete: play,
            onCompleteParams: [gameArray]
        }); 
    }
    else{
       console.log("%cWrong Answer", "color:red; font-size: 15px");
       console.log(currentScore);
       document.getElementById('score').innerHTML = "Game score: " + currentScore;
        gameOver();
        window.location.href = "includes/add.php#" + currentScore;
    }
}
