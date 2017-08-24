// Global variables
var activeNum;
var decimalPresent = false;
var finalNum;
var mathDone = false;
var numArr = [];

// Executes when On/Off button is clicked on calculator keypad
function onOff() {
  if (document.getElementById("calc-display__number").innerHTML == "") {
    document.getElementById("calc-display__number").innerHTML = "0";
  }
  else {
    document.getElementById("calc-display__number").innerHTML = "";
    activeNum = undefined;
    decimalPresent = false;
    finalNum = undefined;
    mathDone = false;
    numArr = [];
  }
}

// Executes when number is clicked on calculator keypad
function clickNum(keypadNum) {
  // If activeNum has a value of "0", then that value is replaced with keypad's number value - calculator displays activeNum
  if (activeNum == "0" || activeNum == undefined) {
    activeNum = keypadNum;
    document.getElementById("calc-display__number").innerHTML = activeNum;
  }
  // If activeNum length exceeds 8, activeNum and decimalPresent set to original values - calculator shakes and displays "Error"
  else if (activeNum !== undefined && activeNum.length >= 8) {
    activeNum = undefined;
    decimalPresent = false;
    $(".calc-body").effect( "shake", {times:2}, 300 );
    document.getElementById("calc-display__number").innerHTML = "Error";
  }
  // activeNum isn't "0" or undefined and activeNum length is <= 8, so keypadNum is added to activeNum - calculator displays activeNum
  else {
    activeNum += keypadNum;
    document.getElementById("calc-display__number").innerHTML = activeNum;
  }
}

// Executes when decimal button is clicked on calculator keypad
function clickDecimal(keypadDecimal) {
  // If activeNum is undefined and no decimal is present, activeNum is set to "0." - calculator displays activeNum
  if (activeNum == undefined && decimalPresent == false) {
    activeNum = "0.";
    decimalPresent = true;
    document.getElementById("calc-display__number").innerHTML = activeNum;
  }
  // If activeNum isn't undefined and no decimal is present, "." is added to activeNum - calculator displays activeNum
  else if (activeNum !== undefined && decimalPresent == false) {
    activeNum += ".";
    decimalPresent = true;
    document.getElementById("calc-display__number").innerHTML = activeNum;
  }
}

// Executes when operator button is clicked on calculator keypad
function clickOperator(keypadOperator) {
  // If activeNum isn't undefined, its type is coerced from a string to a number, which is then pushed to numArr, along with the clicked operator
  if (activeNum !== undefined) {
    numArr.push(Number(activeNum), keypadOperator);
    // Calculator displays keypadOperator (clicked operator)
    document.getElementById("calc-display__number").innerHTML = keypadOperator;
  }
  // If activeNum is undefined and finalNum isn't undefined, finalNum is pushed to numArr, along with the clicked operator
  else if (activeNum == undefined && mathDone == true) {
    numArr.push(finalNum, keypadOperator);
    // Calculator displays keypadOperator (clicked operator)
    document.getElementById("calc-display__number").innerHTML = keypadOperator;
  }
  //  activeNum, decimalPresent and mathDone are set to original values
  activeNum = undefined;
  decimalPresent = false;
  mathDone = false;
}

// Executes when CE or C button is clicked on calculator keypad
function clearMemory(button) {
  // If C button was clicked, finalNum, mathDone and numArr are set to original values
  if (button == "all") {
    finalNum = undefined;
    mathDone = false;
    numArr = [];
    document.getElementById("calc-display__number").innerHTML = "0";
  }
  else if (button == "error") {
    if (numArr.length > 0) {
      document.getElementById("calc-display__number").innerHTML = numArr[numArr.length - 1];
    }
    else {
      document.getElementById("calc-display__number").innerHTML = "0";
    }
  }
  // In both cases (CE & C), activeNum and decimalPresent are set to original values - calculator displays "0"
  activeNum = undefined;
  decimalPresent = false;
}

// Executes when = button is clicked on calculator keypad
function clickEquals()  {
  // If numArr length is greater than 0, then it contains at least one number and operator string
  if (activeNum !== undefined && numArr.length > 0) {
    // activeNum is pushed to the array
    numArr.push(Number(activeNum));
    // finalNum is set to the value of the first number
    finalNum = numArr[0];
    // Loops until end of array
    for (var i = 0; i < numArr.length; i+=2) {
      // Calls function to do the math
      doMath(finalNum, numArr[i + 2], numArr[i + 1]);
    }
    // activeNum and numArr are set to original values
    activeNum = undefined;
    numArr = [];
    // Executes if finalNum 8 characters - too large for calculator display
    if (finalNum.toString().length > 8) {
      // Calculator shakes and displays "Error"
      $(".calc-body--outline").effect( "shake", {times:2}, 300 );
      document.getElementById("calc-display__number").innerHTML = "Error";
      // finalNum and mathDone are set to original value
      finalNum = undefined;
      mathDone = false;
    }
    // finalNum is less 8 characters - mathDone is true - calculator displays finalNum
    else {
      mathDone = true;
      document.getElementById("calc-display__number").innerHTML = finalNum;
    }
  }
}

// Called in clickEquals() if conditions are met - does the math
function doMath(numA, numB, operator) {
  switch (operator) {
    case "+":
      finalNum = numA + numB;
      break;
    case "-":
      finalNum = numA - numB;
      break;
    case "*":
      finalNum = numA * numB;
      break;
    case "/":
      finalNum = numA / numB;
      break;
  }
}
