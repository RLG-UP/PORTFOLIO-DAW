var arr=["red","blue","green","yellow"];
var pattern=[];
var sequence=[];
var level=0;
var colorId;
var game=true;

function nextSequence(){
    var num = Math.floor(Math.random()*5)+1;
    var index = Math.floor(Math.random()*4);
    pattern.push(index);
    $("#"+arr[index]).fadeOut(500);
    $("#"+arr[index]).fadeIn(500);
    $("#sound-"+arr[index])[0].play();
}

$("div[type=button]").click(function(){
    colorId=this.id;
    sequence.push(colorId);
    console.log(sequence);
    $("#sound-"+colorId)[0].play();
    checkAnswer()
});

function animatePress(color){
    $("#"+colorId).addClass("pressed");
    setTimeout(function() { $("#"+colorId).removeClass("pressed");},100);
}

function checkAnswer(thisLevel){
    if(pattern[thisLevel]==sequence.pop()){
        console.log("success");
    }
    else{
        console.log("wrong");
        game=false;
    }
}

$(document).keydown(function(e){
    while(game){
        nextSequence();
        $("h1").text("Level " + level);
    }
})

