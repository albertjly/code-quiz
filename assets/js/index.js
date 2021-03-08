window.addEventListener('load', function (ev) {
    var viewHighScores = document.getElementById('view-high-scores');
    var highScores = document.getElementById('high-scores');
    var goBack = document.querySelector('.go-back');
    var quizChallenge = document.getElementById('quiz-challenge');

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
            answer1: 'spacing',
            answer2: 'margin',
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
        // var textInput = quizSubmit.getElementsByTagName('input')[0];
        // var submitBtn = quizSubmit.getElementsByTagName('button')[0];
        var highScoreList = document.getElementById('high-score-list');
        // var initAndScore = textInput.value + ' - ' + scoreNum.textContent;
        var scoreRecord = [];
        if (localStorage.getItem('scoreRecord')) {
            scoreRecord = JSON.parse(localStorage.getItem('scoreRecord'));
        }
        // scoreRecord.unshift(initAndScore);
        // localStorage.setItem('scoreRecord', JSON.stringify(scoreRecord));

        for (var i = 0; i < scoreRecord.length; i++) {
            var newLi = createNewLi();
            newLi.textContent = scoreRecord[i];
            highScoreList.appendChild(newLi);
        }
        scoreRecord.filter(onlyUnique);
    });

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    goBack.addEventListener('click', function (evt) {
        quizChallenge.style.display = 'block';
        highScores.style.display = 'none';
    });


    var startQuizBtn = document.getElementById('start-quiz');
    var quizStart = document.getElementById('quiz-start');
    var quizQuestion = document.querySelector('.quiz-question');

    startQuizBtn.addEventListener('click', function (ev1) {
        quizStart.style.display = 'none';
        quizQuestion.style.display = 'block';

        resetTimer();
    });

    var questionLi = document.querySelectorAll('.quiz-question ul li');
    var timeoutID;
    var quizSubmit = document.getElementById('quiz-submit');

    var score = 0;
    var correct = document.getElementById('correct');
    var wrong = document.getElementById('wrong');

    var scoreNum = document.getElementById('score');
    function questionChange() {
        var index = 0;
        questionLi.forEach(function (li) {
            correct.style.display = 'none';
            wrong.style.display = 'none';
            li.addEventListener('click', function () {
                li.style.backgroundColor = "#99ccff";
                // li.classList.add('current');
                if (li.innerHTML === questionArr[index].corAns) {
                    score++;
                    correct.style.display = 'block';
                } else {
                    wrong.style.display = 'block';
                }

                scoreNum.textContent = score * 25;

                timeoutID = setTimeout(function () {
                    if (index >= 3) {
                        quizQuestion.style.display = 'none';
                        quizSubmit.style.display = 'block';
                        correct.style.display = 'none';
                        wrong.style.display = 'none';
                    } else {
                        index++;
                    }

                    renderQuestion(index);
                    clearTimeout(timeoutID);
                }, 1000);

            });

        });
    }
    questionChange();

    var textInput = quizSubmit.getElementsByTagName('input')[0];
    var submitBtn = quizSubmit.getElementsByTagName('button')[0];
    var highScoreList = document.getElementById('high-score-list');
    submitBtn.addEventListener('click', function () {
        var initAndScore = textInput.value + ' - ' + scoreNum.textContent;
        var newLi = createNewLi();
        newLi.textContent = initAndScore;
        highScoreList.appendChild(newLi);
        var scoreRecord = [];
        if (localStorage.getItem('scoreRecord')) {
            scoreRecord = JSON.parse(localStorage.getItem('scoreRecord'));
        }
        console.log(scoreRecord);
        scoreRecord.unshift(initAndScore);
        scoreRecord = scoreRecord.filter(onlyUnique);
        localStorage.setItem('scoreRecord', JSON.stringify(scoreRecord));
        alert("You're all set!");
    });

    var oneMoreTimeBtn = quizSubmit.getElementsByTagName('button')[1];
    oneMoreTimeBtn.addEventListener('click', function () {
        quizSubmit.style.display = 'none';
        quizStart.style.display = 'block';
    });



    // clearHighScores

    var clearHighScores = document.querySelector('.clear');

    clearHighScores.addEventListener('click', function (evt) {
        var highScoresLi = highScores.querySelectorAll('li');
        for (var i = 0; i < highScoresLi.length; i++) {
            highScoresLi[i].textContent = '';
        }
    });




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
    /**
     *
     * @param {String}index
     */
    function renderQuestion(index) {
        var quizQuestionTitle = quizQuestion.querySelector('.quiz-question-title');
        var allLis = quizQuestion.querySelectorAll('li');
        correct.style.display = 'none';
        wrong.style.display = 'none';
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
    return document.createElement('li');
}

var timer;
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
        if (quizSubmit.style.display === 'block') {
            timerCountDown.textContent = "0";
            clearInterval(intervalID);
        }
    }, 1000);
}
