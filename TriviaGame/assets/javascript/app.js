let questionslist = {};
let trivia = {};

let questions;
let answers = ["A", "D", "D", "A", "A", "A", "C", "D", "C"];

let intervalID;

// Timer Object ========================================================================================================
timer = {

    time: 120,

    start: function () {
        $("#timer-display").text("02:00");
        intervalID = setInterval(timer.countdown, 1000);
    },

    countdown: function () {
        /*console.log("countdown");*/
        timer.time--;
        let currentTime = timer.timeConverter(timer.time);
        /*console.log(currentTime);*/
        $("#timer-display").text(currentTime);

        if (timer.time === 0) {
            $("#timer-display").text("Time's Up!");
            clearInterval(intervalID);
            $(".done, .question-block").hide();
            /*$(".question-block").hide();*/
            score();
            $(".results, .reset").show();
        } else {

        }
    },

    reset: function () {
        timer.time = 120;
        $("#timer-display").text("02:00");
        clearInterval(intervalID);
        /*console.log("Reset");*/
    },

    timeConverter: function (t) {
        let minutes = Math.floor(t / 60);
        let seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        }

        else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    },

};

// Question Object =====================================================================================================

function startTrivia() {
    questionslist = resetQuestions();
    trivia = resetTrivia();

    showQuestions();

}

function resetTrivia() {
    return {
        correct: 0,
        incorrect: 0,
        blank: 0,
    }
}

function resetQuestions() {
    return {
        q0: {
            question: "Which song is by Destiny's Child?",
            A: "Soldier",
            B: "One wish",
            C: "Baby boy",
            D: "Peaches and Cream",
            },
            q1: {
            question: "Which song is by Rihanna?",
            A: "Goodies",
            B: "Double up",
            C: "Crazy in love",
            D: "Pon De Replay",
            },
            q2: {
            question: "____ is signed under Jay-z's record?",
            A: "lil baby",
            B: "Usher",
            C: "Kodac Black",
            D: "J. Cole",
            },
            q3: {
            question: "Where is Da Baby from?",
            A: "North Carolina",
            B: "Georgia",
            C: "Texas",
            D: "Californa",
            },
            q4: {
            question: "What rap artist is currently in Jail?",
            A: "Six Nine",
            B: "lil Kim ",
            C: "Remy Ma",
            D: "lil Wayne",
            },
            q5: {
            question: "What is Cardi B's daughter's name?",
            A: "Kulture",
            B: "Stormi",
            C: "Culture",
            D: "Migas",
            },
            q6: {
            question: "What neighborhood was Nipsey Hussle from?",
            A: "inglewood",
            B: "Venice",
            C: "Crenshaw",
            D: "Calabazas",
            },
            q7: {
            question: "Which artist is not married?",
            A: "Chance the Rapper",
            B: "Jay-z",
            C: "J. Cole",
            D: "Trey Songz",
            },
            q8: {
            question: "What rapper recently released a country song?",
            A: "Chance the Rapper",
            B: "Nicki Minaj",
            C: "lil Nas X",
            D: "Cardi B",
        }
    }
}

function showQuestions() {
    questions = Object.keys(questionslist);
    for (var i = 0; i < questions.length; i++) {
        var questiontitle = questions[i];
        var question = questionslist[questiontitle];
        var questionblocks = createQuestions(question, questiontitle);
        $(".question-block").append(questionblocks).show();
    }
}

function createQuestions(question, key) {
    var block = $("<div class='question' name='" + key + "'>" + question.question + "" +
        "<ul>" +
        "<li><input type='radio' name='" + key + "' value='A'><label>" + question.A + "</label></li>" +
        "<li><input type='radio' name='" + key + "' value='B'><label>" + question.B + "</label></li>" +
        "<li><input type='radio' name='" + key + "' value='C'><label>" + question.C + "</label></li>" +
        "<li><input type='radio' name='" + key + "' value='D'><label>" + question.D + "</label></li>" +
        "</ul>");

    return block;
}

function score() {
    /*console.log($("input:radio[name='q0']:checked").val());*/
    let playeranswers = [$("input:radio[name='q0']:checked").val(),
        $("input:radio[name='q1']:checked").val(),
        $("input:radio[name='q2']:checked").val(),
        $("input:radio[name='q3']:checked").val(),
        $("input:radio[name='q4']:checked").val(),
        $("input:radio[name='q5']:checked").val(),
        $("input:radio[name='q6']:checked").val(),
        $("input:radio[name='q7']:checked").val(),
        $("input:radio[name='q8']:checked").val()];

    console.log(playeranswers);
    console.log(answers);

    for (k = 0; k < questions.length; k++) {
        if (playeranswers[k] === undefined) {
            trivia.blank++;
        } else if (playeranswers[k] === answers[k]) {
            trivia.correct++;
        } else {
            trivia.incorrect++;
        }

    }

    $("#correct").text("Correct: " + trivia.correct);
    $("#incorrect").text("Incorrect: " + trivia.incorrect);
    $("#unanswered").text("Unanswered: " + trivia.blank);

    console.log(trivia.correct);
    console.log(trivia.incorrect);
    console.log(trivia.blank);
}

// Question Time =======================================================================================================

$(document).ready(function () {

    $(".start").on("click", function () {
        $(".start").hide();
        startTrivia();
        timer.start();
        $(".done").show();

    });

    $(".done").on("click", function () {
        score();
        $(".done, .question-block").hide();
        timer.reset();
        $(".results, .reset").show();
    });

    $(".reset").on("click", function () {
        $(".question-block").empty();
        $(".start").show();
        $(".reset, .results").hide();
        timer.reset();
    });
});