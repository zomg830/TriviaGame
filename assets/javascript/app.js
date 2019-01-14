// Create trivia objects with clues and correct/incorrect answers

var trivia = [{
    question: "Question 1",
    answers: ["A", "B", "C", "D"],
    correctAns: 0,
},{
    question: "Question 2",
    answers: ["A", "B", "C", "D"],
    correctAns: 1,
},{
    question: "Question 3",
    answers: ["A", "B", "C", "D"],
    correctAns: 2,
},{
    question: "Question 4",
    answers: ["A", "B", "C", "D"],
    correctAns: 3,
}]

$(document).ready(function(){
    var timeInt; //variable to hold countdown interval
    var secs; //variable to hold seconds remaining
    var rightAns; //variable to store correct answer from trivia object above
    var wrongAns; //variable to store incorrect answers from trivia object above
    var currentQuestion; //variable to hold current question from trivia object above
    var userChoice; //variable to capture the user's selection on click
    var answered; //variable to hold final questions answered
    var unanswered; //variable to hole final questions unanswered

    var results = {
        correct: "You're right!",
        incorrect: "You're wrong!",
        noTime: "You ran out of time!",
        final: "Generating final results..."
    }

    $('#resetBtn').hide();

    $('#newGame').on("click", function(){
        $(this).hide();
        initializeGame();
    });

    $('#resetBtn').on("click", function(){
        $(this).hide();
        initializeGame();
    });

    function initializeGame(){
        $("finalStatus").empty();
        $("correctAns").empty();
        $("incorrectAns").empty();
        $("#unanswered").empty();
        currentQuestion = 0;
        wrongAns = 0;
        rightAns = 0;
        unanswered = 0;
        nextQuestion();
    }

    function nextQuestion(){
        $('#message').empty();
        $('#missedAns').empty();
        $('#gif').empty();
        answered = true;

        $("#activeQuestion").html('Question ' + (currentQuestion+1)+'/'+trivia.length);
        $(".question").html("<p>" + trivia[currentQuestion].question + '</p>');
        for (var i = 0; i < 4; i++){
            var choices = $('<div>');
            choices.text(trivia[currentQuestion].answers[i]);
            choices.attr({'data-index':i});
            choices.addClass('choice');
            $('.answers').append(choices);
        }
        count();
        $(".choice").on("click",function(){
            userChoice = $(this).data('index');
            clearInterval(timeInt);
            postPage();
        })
    }

    function count(){
        secs = 30;
        $('#time').html('<p>Time Remaining: ' + secs + '</p>');
        timeInt = setInterval(updateTime, 1000);
    }

    function updateTime(){
        secs--;
        $('#time').html('<p>Time Remaining: ' + secs + '</p>');
        if (secs === 0){
            clearInterval(timeInt);
            answered = false;
            postPage();
        }
    }

    function postPage(){
        $("#activeQuestion").empty();
        $(".choice").empty();
        $(".question").empty();

        var correctAns = trivia[currentQuestion].answers[trivia[currentQuestion].correctAns];
        console.log("correctAns: " + correctAns);
        var ansIndex = trivia[currentQuestion].correctAns;
        console.log("ansIndex: " + ansIndex);
        if((userChoice === ansIndex) && (answered === true)){
            rightAns++;
            $("#message").html(results.correct);
        } else if ((userChoice != ansIndex && answered === true)){
            wrongAns++;
            $("#message").html(results.incorrect);
            $("#missedAns").html("The right answer is: " + correctAns);
        } else{
            unanswered++;
            $("#message").html(results.noTime);
            $("#missedAns").html("The right answer is: " + correctAns);
            answered = true;
        }

        if (currentQuestion === (trivia.length-1)){
            setTimeout(finalResults,5000)
        } else{
            currentQuestion++;
            setTimeout(nextQuestion, 5000);
        }
    }

    function finalResults(){
        $("#time").empty();
        $("#message").empty();
        $("missedAns").empty();

        $("#finalStatus").html(results.finished);
        $("#correctAns").html("Correct Answers: " + rightAns);
        $("#incorrectAns").html("Incorrect Answers: " + wrongAns);
        $("#unanswered").html("Unanswered: " + unanswered);
        $('#resetBtn').show();
        $('#resetBtn').text('Start Over?');
    }
});