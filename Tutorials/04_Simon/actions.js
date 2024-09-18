var arr=["red","blue","green","yellow"]; 
var pattern = [];
var userClickedPattern = [];
var level = 0;
var option = 0;
var colorId;
var started = false;

function nextSequence(){
    var index = Math.floor(Math.random()*4);
    pattern.push(index);
    
    let i = 0;
    const intervalId = setInterval(function() {
        $("#"+arr[pattern[i]]).fadeOut(100).fadeIn(100);
        $("#sound-"+arr[pattern[i]])[0].play();
        i++;
        if (i >= pattern.length) {
            clearInterval(intervalId);
        }
    }, 600);  
}

$("div[type=button]").click(function(){
    colorId = this.id;
    userClickedPattern.push(arr.indexOf(colorId));  
    $("#sound-"+colorId)[0].play();
    animatePress(colorId);
    checkAnswer(userClickedPattern.length - 1); 
});

function animatePress(color){
    $("#"+color).addClass("pressed");
    setTimeout(function() { $("#"+color).removeClass("pressed"); }, 100);
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === pattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === pattern.length) {
            setTimeout(function() {
                userClickedPattern = [];  
                level++;  
                $("h1").text("Level " + level);  
                nextSequence();  
            }, 1000);
        }
    } else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");},200);
        console.log("wrong");
        startOver();
    }
}

$(document).keydown(function(){
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function startOver() {
    level = 0;
    pattern = [];
    userClickedPattern = [];
    started = false;
}
