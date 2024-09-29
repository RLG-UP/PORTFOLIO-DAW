/*
    Fibonacci Sequence - Enter a number and have the program
    generate the Fibonacci sequence to that number or to the Nth number.
*/
// This array will keep memory of the previous fibonacci numbers
var memo = {};
function fibonacci() {
  "use strict";
  var n = $("#num").val();
  var val = f(n);
  return val;
}

function f(n) {
  var value;
  // Check if the memory array already contains the requested number
  if (memo.hasOwnProperty(n)) {
    value = memo[n];
  } else {
    //TODO: Implement the fibonacci function here!

    if (n <= 0) {
      value = 0;
    } else if (n === 1) {
      value = 1;
    } else {
      value = f(n - 1) + f(n - 2);
    }

    memo[n] = value;
  }

  return value;
}


console.log(fibonacci(15));

$("#btn").on("click", () =>{
  var fVal = parseInt($("#num").val());
  $("#fibonacciLbl").text(fibonacci(fVal));
});
