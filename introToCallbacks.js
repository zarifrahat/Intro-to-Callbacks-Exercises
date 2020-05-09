'use strict';

const readline = require("readline");
const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

class Clock {
  constructor() {
    const curTime = new Date();
    this.hours = curTime.getHours();
    this.minutes = curTime.getMinutes();
    this.seconds = curTime.getSeconds();
    this.printTime();
  }

  printTime() {
    // Format the time in HH:MM:SS
    // Use console.log to print it.
    let H = this.hours;
    let M = this.minutes;
    let S = this.seconds;
    console.log(`${H}:${M}:${S}`);
  }

  _tick() {
    // 1. Increment the time by one second.
    // 2. Call printTime.
    this.seconds += 1;

    if(this.seconds > 59) {
        this.minutes += 1;
        this.seconds = 0;
        if(this.minutes > 59) {
            this.hours += 1;
            this.minutes = 0;
            this.seconds = 0;
            if (this.hours > 23) {
                this.hours = 0;
                this.minutes = 0;
                this.seconds = 0;
            }
        }
    }
    this.printTime();
  }
}

// const clock = new Clock();
// setInterval(clock._tick.bind(clock), 1000);

function addNumbers(sum, numsLeft, completionCallback){
    if (numsLeft === 0){
        reader.close();
        return completionCallback(sum)
    };
    
    if (numsLeft > 0){
        reader.question('Please provide a number', (res)=>{
            
        let num = parseInt(res);
        sum += num;
        console.log(sum);
        addNumbers(sum, numsLeft-1, completionCallback)
        })
    }
}

// addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));

// Write this first.
function askIfGreaterThan(el1, el2, callback) {
    // Prompt user to tell us whether el1 > el2; pass true back to the
    // callback if true; else false.
    console.log("el1: " + el1);
    console.log("el2: " + el2);
    reader.question(`Is el1 greater than el2?\n`, (res) => {
        let answer = res;
        if(answer == 'yes') {
            callback(true);
        } else if (answer == 'no') {
            callback(false);
        }
    })
  }
  
  // Once you're done testing askIfGreaterThan with dummy arguments, write this.
  function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
    // Do an "async loop":
    // 1. If (i == arr.length - 1), call outerBubbleSortLoop, letting it
    //    know whether any swap was made.
    // 2. Else, use `askIfGreaterThan` to compare `arr[i]` and `arr[i +
    //    1]`. Swap if necessary. Call `innerBubbleSortLoop` again to
    //    continue the inner loop. You'll want to increment i for the
    //    next call, and possibly switch madeAnySwaps if you did swap.
    
    if( i < arr.length - 1){
        askIfGreaterThan(arr[i], arr[i + 1], (isGreaterThan)=> {
            if(isGreaterThan === true){
                [arr[i], arr[i + 1]] = [arr[i+1], arr[i]];
                madeAnySwaps = true;
            }
            return innerBubbleSortLoop(arr, i+1, madeAnySwaps, outerBubbleSortLoop);
        });
    } else {
        outerBubbleSortLoop(madeAnySwaps);
    }
}

  // Once you're done testing innerBubbleSortLoop, write outerBubbleSortLoop.
  // Once you're done testing outerBubbleSortLoop, write absurdBubbleSort.
  
function absurdBubbleSort(arr, sortCompletionCallback) {
    // debugger;
    function outerBubbleSortLoop(madeAnySwaps) {
        // Begin an inner loop if you made any swaps. Otherwise, call
        // `sortCompletionCallback`.
        if (madeAnySwaps === true) {
            madeAnySwaps = false;
            innerBubbleSortLoop(arr, 0, madeAnySwaps, outerBubbleSortLoop);
        } else if (madeAnySwaps === false) {
            sortCompletionCallback(arr);
        }
    }
// Kick the first outer loop off, starting `madeAnySwaps` as true.
    outerBubbleSortLoop(true);
}
  
  absurdBubbleSort([3, 2, 1], function(arr) {
    // debugger;
    console.log("Sorted array: " + JSON.stringify(arr));
    reader.close();
  });

Function.prototype.myBind = function (context) {
    // this.Function.prototype.apply(context);
    // this.ap
    return () => {
        this.apply(context, null);
    };
}

class Lamp {
    constructor() {
      this.name = "a lamp";
    }
  }

const turnOn = function(a) {
    console.log("Turning on " + this.name);
    // console.log(a);
};
  
  const lamp = new Lamp();
  
//   turnOn(); // should not work the way we want it to
  
  const boundTurnOn = turnOn.bind(lamp);
  const myBoundTurnOn = turnOn.myBind(lamp);
  
  boundTurnOn(); // should say "Turning on a lamp"
  myBoundTurnOn(); // should say "Turning on a lamp"