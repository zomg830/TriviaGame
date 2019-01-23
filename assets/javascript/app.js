// Create trivia objects with clues and correct/incorrect answers

var trivia = [{
    question: "Which of these gods are NOT part of the Greek Olympian pantheon?",
    answers: ["Hephaestus", "Artemis", "Poseidon", "Kronos"],
    correctAns: 3,
    category: "Greek",
    gif:"assets/images/mount-olympus.gif",
    icon: "assets/images/1870.png"
},{
    question: "This Ancient Egyptian deity is often depicted in art with the head of an ibis or a baboon:",
    answers: ["Ra", "Thoth", "Horus", "Osiris"],
    correctAns: 1,
    category: "Egyptian",
    gif:"assets/images/thoth.gif",
    icon:"assets/images/1871.png"
},{
    question: "This Norse Valkyrie's name translates into 'Spear-flinger':",
    answers: ["Hildr", "Göndul", "Herja", "Geirdriful"],
    correctAns: 3,
    category: "Norse",
    gif:"assets/images/valkyrie.gif",
    icon:"assets/images/1872.png"
},{
    question: "A cruel Greek king whose punishment from the gods was to fruitlessly push a large boulder up a hill:",
    answers: ["Sisyphus", "Narcissus", "Aeneas", "Oedipus"],
    correctAns: 0,
    category: "Greek",
    gif:"assets/images/sisyphus.gif",
    icon:"assets/images/1870.png"
},{
    question: "The mighty 'Allfather', chief of the Norse Aesir tribe:",
    answers: ["Tyr", "Baldur", "Odin", "Thor"],
    correctAns: 2,
    category: "Norse",
    gif:"assets/images/odin.gif",
    icon:"assets/images/1872.png"
},{
    question: "Site of the first known Egyptian sun temple, located northeast of modern Cairo:",
    answers: ["Hermopolis", "Heliopolis", "Elephantine", "Memphis"],
    correctAns: 1,
    category: "Egyptian",
    gif:"assets/images/sun-temple.gif",
    icon:"assets/images/1871.png"
},{
    question: "Greek god of fear, son of the gods Ares and Aphrodite:",
    answers: ["Phobos", "Deimos", "Demeter", "Amphitrite"],
    correctAns: 0,
    category: "Greek",
    gif:"assets/images/phobos.gif",
    icon:"assets/images/1870.png"
},{
    question: "The ever-vigilant guardian of the Norse gods' stronghold, Asgard:",
    answers: ["Fenrir", "Frigg", "Loki", "Heimdall"],
    correctAns: 3,
    category: "Norse",
    gif:"assets/images/heimdall.gif",
    icon:"assets/images/1872.png"
},{
    question: "Egyptian Lord of the Underworld and Judge of the dead:",
    answers: ["Geb", "Ptah", "Osiris", "Set"],
    correctAns: 2,
    category: "Egyptian",
    gif:"assets/images/osiris.gif",
    icon:"assets/images/1871.png"
},{
    question: "The Norse goddess of love, became an honorable member of the Aesir after the war between the Aesir and Vanir ended:",
    answers: ["Sigyn", "Freya", "Idun", "Nanna"],
    correctAns: 1,
    category: "Norse",
    gif:"assets/images/freya.gif",
    icon:"assets/images/1872.png"
},{
    question: "The largest island in Greece and has been the backdrop for a number of stories of ancient Greek mythology.",
    answers: ["Mykonos", "Crete", "Rhodes", "Santorini"],
    correctAns: 1,
    category: "Greek",
    gif:"assets/images/crete.gif",
    icon:"assets/images/1870.png"
},{
    question: "Mythological hybrid creature with a lion's head, a goat's body, and a serpent's tail:",
    answers: ["Hydra", "Nymph", "Centaur", "Chimera"],
    correctAns: 3,
    category: "Greek",
    gif:"assets/images/chimera.gif",
    icon:"assets/images/1870.png"
}]


$(document).ready(function(){
    var timeInt, secs, rightAns, wrongAns, currentQuestion, userChoice, answered, unanswered; //Instantiate various variables

    //Results array with canned responses based on individual page result
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

    function catStyle(){
        $(document.body).removeClass("greekstyle norsestyle egyptstyle");
        $("#category").empty();
        var currentQuestionCategory = trivia[currentQuestion].category;
        if (currentQuestionCategory === "Greek"){
            $(document.body).addClass("greekstyle");
        } else if (currentQuestionCategory === "Norse"){
            $(document.body).addClass("norsestyle");
        } else if (currentQuestionCategory === "Egyptian"){
            $(document.body).addClass("egyptstyle");
        }
        $("#category").html('<img src="'+trivia[currentQuestion].icon+'" class="icon">');
    }

    function initializeGame(){
        $("#finalStatus").empty();
        $("#correctAns").empty();
        $("#incorrectAns").empty();
        $("#unanswered").empty();
        currentQuestion = 0;
        wrongAns = 0;
        rightAns = 0;
        unanswered = 0;
        nextQuestion();
        catStyle();
    }

    function nextQuestion(){
        $('#message').empty();
        $('#missedAns').empty();
        $('#gif').empty();
        $(".answers").empty();
        answered = true;
        catStyle();

        $("#activeQuestion").html('Question ' + (currentQuestion+1)+'/'+trivia.length);
        $(".question").html('<p>' + trivia[currentQuestion].question + '</p>');
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
        $(".answers").empty();
        $(".question").empty();

        var correctAns = trivia[currentQuestion].answers[trivia[currentQuestion].correctAns];
        console.log("correctAns: " + correctAns);
        var ansIndex = trivia[currentQuestion].correctAns;
        console.log("ansIndex: " + ansIndex);
        $("#gif").html('<img src="'+trivia[currentQuestion].gif+'" class="gif">')
        if((userChoice === ansIndex) && (answered === true)){
            rightAns++;
            $("#message").html(results.correct);
        } else if ((userChoice != ansIndex && answered === true)){
            wrongAns++;
            $("#message").html(results.incorrect);
            $("#missedAns").html("The correct answer is: " + correctAns);
        } else{
            unanswered++;
            $("#message").html(results.noTime);
            $("#missedAns").html("The correct answer is: " + correctAns);
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
        $("#missedAns").empty();
        $(".answers").empty();
        $("#category").html("");
        $("#gif").html('<img src="assets/images/victory.gif" class="gif">')

        $("#finalStatus").html(results.finished);
        $("#correctAns").html("Correct Answers: " + rightAns);
        $("#incorrectAns").html("Incorrect Answers: " + wrongAns);
        $("#unanswered").html("Unanswered: " + unanswered);
        $('#resetBtn').show();
        $('#resetBtn').text("Click to restart!");
    }
});