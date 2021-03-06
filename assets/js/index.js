window.addEventListener('load', function (ev) {
    var viewHighScores = document.getElementById('view-high-scores');
    var highScores = document.getElementById('high-scores');
    var goBack = document.querySelector('.go-back');
    var quizChallenge = document.getElementById('quiz-challenge');
    var quizContainer = document.querySelector('#quiz .container');
    var questionArr = [
        {
            question: '1. Inside which HTML element do we put the JavaScript?',
            answer1: '&lt;script&gt;',
            answer2: '&lt;js&gt;',
            answer3: '&lt;scripting&gt;',
            answer4: '&lt;javascript&gt;',
            corAns: '&lt;script&gt;'
        },
        {
            question: '2. Select the property that is used to create spacing between HTML elements?',
            answer1: 'margin',
            answer2: 'spacing',
            answer3: 'border',
            answer4: 'padding',
            corAns: 'margin'
        },
        {
            question: '3. In CSS,select the property used to set the background color of an image?',
            answer1: 'color:background',
            answer2: 'background:color',
            answer3: 'color',
            answer4: 'background-color',
            corAns: 'background-color'
        },
        {
            question: '4. In CSS,Select the property used to set the spacing in between lines of text?',
            answer1: 'letter-spacing',
            answer2: 'spacing',
            answer3: 'line-height',
            answer4: 'line-spacing',
            corAns: 'line-height'
        }
    ];



    viewHighScores.addEventListener('click', function (ev1) {
        highScores.style.display = 'block';
        quizChallenge.style.display = 'none';
    });

    goBack.addEventListener('click', function (evt) {
        quizChallenge.style.display = 'block';
        highScores.style.display = 'none';
    });

    var highScoresSpan = highScores.querySelectorAll('span');
    var clearHighScores = document.querySelector('.clear');

    clearHighScores.addEventListener('click', function (evt) {
        for (var i = 0; i < highScoresSpan.length; i++) {
            highScoresSpan[i].textContent = '';
        }
    });


    var startQuiz = document.getElementById('start-quiz');
    var quizStart = document.getElementById('quiz-start');
    var quizQuestion = document.querySelector('.quiz-question');
    
    startQuiz.addEventListener('click', function (ev1) {
        quizStart.style.display = 'none';
        quizQuestion.style.display = 'block';

        resetTimer();
    });
    var questionLi = document.querySelectorAll('.quiz-question ul li');
    var timeoutID;
    var quizSubmit = document.getElementById('quiz-submit');
    function questionChange() {
        var index = 0;
        questionLi.forEach(function (li) {
            li.addEventListener('click', function () {
                li.style.backgroundColor = "#99ccff";
                li.classList.add('current');
                timeoutID = setTimeout(function () {
                    if (index >= 3){
                        quizQuestion.style.display = 'none';
                        quizSubmit.style.display = 'block';
                    } else {
                        index++;
                    }
                    // quizQuestion.style.display = 'none';
                    renderQuestion(index);
                    clearTimeout(timeoutID);
                }, 1000);
            });

        });

    }
    questionChange();



    /*
    function renderQuestion() {
        var createDiv = createTag('div');
        var createH2 = createTag('h2');
        var createUl = createTag('ul');
        var allLis = document.querySelectorAll('.quiz-question ul li');

        createDiv.className = 'quiz-question';
        createDiv.style.display = 'block';
        createDiv.appendChild(createH2);
        createH2.textContent = questionArr[1].question;
        createH2.className = 'quiz-question-title';
        createDiv.appendChild(createUl);
        createUl.appendChild(createNewLi());
        createUl.appendChild(createNewLi());
        createUl.appendChild(createNewLi());
        createUl.appendChild(createNewLi());
        quizContainer.appendChild(createDiv);
        // console.log(createDiv.setAttribute('class', 'quiz-question'));
    }
    */

    function renderQuestion(index) {
        var quizQuestionTitle = quizQuestion.querySelector('.quiz-question-title');
        var allLis = quizQuestion.querySelectorAll('li');

        quizQuestionTitle.textContent = questionArr[index].question;

        allLis.forEach(function (li) {
            li.className = '';
            li.style.backgroundColor = '#000091';
        });

        allLis[0].textContent = questionArr[index].answer1;
        allLis[1].textContent = questionArr[index].answer2;
        allLis[2].textContent = questionArr[index].answer3;
        allLis[3].textContent = questionArr[index].answer4;
    }






});

/**
 * 
 * @param {String} tagName 
 */

function createTag(tagName) {
    return document.createElement(tagName);
}

function createNewLi() {
    return  document.createElement('li');
}

var timer = 40;
var timerCountDown = document.getElementById('timer-num');
var intervalID;
var quizSubmit = document.getElementById('quiz-submit');
function resetTimer() {
    timer = 40;
    timerCountDown.textContent = timer;
    clearInterval(intervalID);
    intervalID = setInterval(function () {
        timer--;
        timerCountDown.textContent = timer;
        if (timer <= 0) {
            timer = 0;
            // timerCountDown.textContent = timer;
            clearInterval(intervalID);
            alert('Time Out!');
            // quizQuestion.style.display = 'none';
        }
        if (quizSubmit.style.display === 'block'){
            timerCountDown.textContent = "0";
            clearInterval(intervalID);
        }
    }, 1000);
}