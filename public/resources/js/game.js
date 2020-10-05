var numQ = quizQuestions.length;
var gameArray = [];
var currentScore;

var startScreen = document.getElementById('start_screen');
var gameScreen = document.getElementById('game_screen');

startScreen.style.display = 'block';
gameScreen.style.display = 'none';

var card__header = document.getElementById('card-header');
var question__logo = document.getElementById('question__logo');
var question__title = document.getElementById('question__title');
var question__question = document.getElementById('question__question');
var choise_a = document.getElementById('choise_a');
var choise_b = document.getElementById('choise_b');
var choise_c = document.getElementById('choise_c');

var timeline = gsap.timeline({});
var fadeTime = 0.5;

var c0 = '#dc1478';
var c1 = '#54b23e';
var c2 = '#0072b5';
var c3 = '#3e6c35';
var c4 = "#c88225";
var c5 = '#f89222';
var c6 = '#f16121';
var c7 = '#841731';
var c8 = '#fcae14';
var c9 = '#00a4d4';
var c10 = '#ec3726';
var c11 = '#ba1c2c';
var c12 = '#24903f';
var c13 = '#cd9525';
var c14 = '#e81929';
var c15 = '#17305d';
var c16 = '#014b80';
var c17 = '#000000';


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
    timeline.set(".card",{
        backgroundColor: "#fff"
    }); 
          timeline.to([".card",  card__header, question__title, question__question, choise_a, choise_b, choise_c], fadeTime, {
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
    question__logo.src = "resources/img/main-" + currentQuestion.id + ".png"
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
        timeline.to(question__logo, 0.2, {
            yoyo: true,
            scale: 1.1,
            repeat:5
        });
        timeline.to([card__header, question__title, question__question, choise_a, choise_b, choise_c], 0.1, {
            opacity: 0
        }); 
        timeline.to(".card", 0.2, {
            backgroundColor: '#00ff00'
        }); 
        timeline.to(".card", fadeTime, {
            opacity: 0,
            onComplete: play,
            onCompleteParams: [gameArray],
            delay:1
        }); 
    }
    else{
       console.log("%cWrong Answer", "color:red; font-size: 15px");
       console.log(currentScore);
        
       timeline.to(question__logo, 0.2, {
            yoyo: true,
            scale: 1.1,
            repeat: 5
        });
        timeline.to([card__header, question__title, question__question, choise_a, choise_b, choise_c], 0.1, {
            opacity: 0
        });
        timeline.to(".card", 0.2, {
            backgroundColor: '#ff0000'
        });
        timeline.to(".card", fadeTime, {
            opacity: 0,
            onComplete: endGame,
            delay: 1
        }); 
    }
}

function endGame(){
    document.getElementById('score').innerHTML = "Game score: " + currentScore;
    gameOver();
    window.location.href = "includes/add.php#" + currentScore;
}
