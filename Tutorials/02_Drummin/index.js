document.addEventListener("keydown", (event) => {
    var key = event.key;
    switch (key) {
        case "w":
            new Audio("./sounds/tom-1.mp3").play();
            changeClass("w");
            break;
        case "a":
            new Audio("./sounds/tom-2.mp3").play();
            changeClass("a");
            break;
        case "s":
            new Audio("./sounds/tom-3.mp3").play();
            changeClass("s");
            break;
        case "d":
            new Audio("./sounds/tom-4.mp3").play();
            changeClass("d");
            break;
        case "j":
            new Audio("./sounds/snare.mp3").play();
            changeClass("j");
            break;
        case "k":
            new Audio("./sounds/crash.mp3").play();
            changeClass("k");
            break;
        case "l":
            new Audio("./sounds/kick-bass.mp3").play();
            changeClass("l");
            break;
    }
});

var buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener("click", buttonPressed);
});

function buttonPressed(event) {
    var key = event.target.classList;
    switch (key[0]) {
        case "w":
            new Audio("./sounds/tom-1.mp3").play();
            changeClass("w");
            break;
        case "a":
            new Audio("./sounds/tom-2.mp3").play();
            changeClass("a");
            break;
        case "s":
            new Audio("./sounds/tom-3.mp3").play();
            changeClass("s");
            break;
        case "d":
            new Audio("./sounds/tom-4.mp3").play();
            changeClass("d");
            break;
        case "j":
            new Audio("./sounds/snare.mp3").play();
            changeClass("j");
            break;
        case "k":
            new Audio("./sounds/crash.mp3").play();
            changeClass("k");
            break;
        case "l":
            new Audio("./sounds/kick-bass.mp3").play();
            changeClass("l");
            break;
    }
}

function changeClass(cls) {
    var button = document.querySelector("." + cls);
    button.classList.toggle("pressed");
    setTimeout(function () {
        button.classList.toggle("pressed");
    }, 100);
}
