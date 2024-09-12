var arr=["red","blue","green","yellow"];
var pattern=[];
var sequence=[];
var level=0;
var option=0;
var colorId;
var game=true;

function nextSequence(){
    var num = level+1;
    while(num--){
        var index = Math.floor(Math.random()*4);
        pattern.push(index);
    }
    $("#"+arr[index]).fadeOut(500);
    $("#"+arr[index]).fadeIn(500);
    $("#sound-"+arr[index])[0].play();
    
}

$("div[type=button]").click(function(){
    colorId=this.id;
    sequence.push(colorId);
    $("#sound-"+colorId)[0].play();
    animatePress(colorId);
    checkAnswer(level)
});

function animatePress(color){
    $("#"+colorId).addClass("pressed");
    setTimeout(function() { $("#"+colorId).removeClass("pressed");},100);
}

function checkAnswer(thisLevel){
    console.log(sequence[sequence.length-1]);
        console.log(arr[pattern[option]]);
        
    if(arr[pattern[thisLevel]]==sequence[sequence.length-1]){
        console.log("success");
        if(option+1<pattern.length){
            option+=1;
        }
        else{
            option=0;
            level+=1;
            nextSequence();
            $("h1").text("Level " + level);
        }
    }
    else{
        console.log("wrong");
    }
}

$(document).keydown(function(e){
        nextSequence();
        $("h1").text("Level " + level);
    
});

