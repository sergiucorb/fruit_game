
var playing = false;
var fruits = ["apple", "banana", "cherry", "grape", "orange", "peach", "pineapple", "watermelon"];
var score;
var trialsleft;
var action;
$(function () {
    $("#start-reset").click(function () {
        if (playing == true) {
            location.reload();
        } else {
            playing = true;
            score = 0;
            $("#scorevalue").html(score);
            $("#trialsleft").show();
            $("#start-reset").html("Reset Game");
            trialsleft = 3;
            addHearts();
            startAction();
            moveFruitDown();
            startInterval();
        };
    });
    function addHearts() {
        for (i = 0; i < trialsleft; i++) {
            $("#trialsleft").append('<img src="images/heart.png" class="life">');
        };
    };
    function startAction() {    
        $("#fruit1").css({
            position: "absolute",
            left: Math.floor((Math.random() * 530)) + "px",
            top: -100 + "px"
        });
        chooseFruit();
        $("#fruit1").show();
    };
    function startInterval() {
        action = setInterval(function () {
            if (trialsleft > 0) {
                startAction();
                moveFruitDown();
            } else {
                playing = true;
                $("#trialsleft").hide();
                $("#game-over").show();
                $("#finalScore").html(score);
                stop();
            };
        }, 1700);
    };
    $("#fruit1").mouseover(function () {
        trialsleft = 3;
        score++;
        $("#scorevalue").html(score);
        $("#audioSlice")[0].play();
        clearInterval(action);
        $(this).hide("explode", 500);
        setTimeout(startAction(), 500);
    });
    function chooseFruit() {
        $("#fruit1").attr("src", "images/" + fruits[Math.floor((Math.random() * 8))] + ".png");
    };
    function moveFruitDown() {
        $("#fruit1").animate({
            top: 550 + "px"
        }, 1400, function () {
            if ($("#fruit1").position().top > $("#fruitsContainer").height()) {
                $("#container #trialsleft  img:last-child").remove();
                trialsleft--;
            };
        });
    };
    function stop() {
        $("#fruit1").hide();
        clearInterval(action);
    };
});
