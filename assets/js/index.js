window.addEventListener('load', function (ev) {
    var viewHighScores = document.getElementById('view-high-scores');
    var highScores = document.getElementById('high-scores');
    var goBack = document.querySelector('.go-back');
    var quizChallenge = document.getElementById('quiz-challenge');



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

    var timer = 10;
    var startQuiz = document.getElementById('start-quiz');
    var quizStart = document.getElementById('quiz-start');
    var quizQuestion = document.querySelector('.quiz-question');
    var timerCountDown = document.getElementById('timer-num');
    startQuiz.addEventListener('click', function (ev1) {
        quizStart.style.display = 'none';
        quizQuestion.style.display = 'block';

        var intervalID = setInterval(function () {
            timerCountDown.textContent = timer;
            timer--;
            if (timer < 0){
                timer = 0;
                // alert('Time Out!');
                confirm('Time out!');
                stop(intervalID);
            }
        }, 1000);

    });
});