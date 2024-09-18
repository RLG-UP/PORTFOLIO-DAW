var arr=["red","blue","green","yellow"]; 
var pattern = [];
var sequence = [];
var level = 0;
var option = 0;
var colorId;
var gameStarted = false;

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
    sequence.push(arr.indexOf(colorId));  
    $("#sound-"+colorId)[0].play();
    animatePress(colorId);
    checkAnswer(sequence.length - 1); 
});

function animatePress(color){
    $("#"+color).addClass("pressed");
    setTimeout(function() { $("#"+color).removeClass("pressed"); }, 100);
}

function checkAnswer(currentLevel){
    if (sequence[currentLevel] === pattern[currentLevel]) {
        console.log("success");
        if (sequence.length === pattern.length) {
            setTimeout(function() {
                sequence = [];  
                level++;  
                $("h1").text("Level " + level);  
                nextSequence();  
            }, 1000);
        }
    } else {
        $("h1").text("Game Over, Press Any Key to Restart");
        console.log("wrong");
        startOver();
    }
}

$(document).keydown(function(){
    if (!gameStarted) {
        $("h1").text("Level " + level);
        nextSequence();
        gameStarted = true;
    }
});

function startOver() {
    level = 0;
    pattern = [];
    sequence = [];
    gameStarted = false;
}
