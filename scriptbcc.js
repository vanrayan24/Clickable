'use strict';
document.querySelector('body').style.backgroundColor = `rgb(${getRandom(0,255)},${getRandom(0,255)},${getRandom(0,255)})`
let scores=[];

function getRandom(min, max) {
    return Math.trunc(Math.random() * (max - min + 1) + min);
}
let highScore = 0;
let well = document.querySelector('.well');
well.textContent = highScore;

let n = 0; // To track the number of clicks in the current timer
let isTimerRunning = false; // To prevent overlapping timers
let body = document.querySelector('body')
let x = document.querySelector('.newX');

// Function to start a 5-second timer
function startTimer() {
    if (isTimerRunning) return; // Prevent starting a new timer if one is already running

    isTimerRunning = true;
    console.log("Timer started. Clicks will be counted for 5 seconds.");

    // Start the 5-second timer
    setTimeout(function () {
        if(highScore<n){
          highScore = n;
          well.textContent = highScore;
        }
        alert(`You clicked the screen ${n} times in 5 seconds!`);
        if(scores.length===5){
          let r = Math.min(...scores);
          console.log(r)
          if(r<n){
           scores = scores.filter(ahh=>ahh!==r);
           console.log(scores)
           scores.push(n);
           console.log(scores)
           scores.sort((a,b)=>a-b)
           setScores()
          }
        }else{
            scores.push(n);
            scores.sort((a,b)=>a-b)
            setScores();
        }
        n = 0; // Reset the click count
        isTimerRunning = false; // Allow a new timer to start
    }, 5000);
}

// Event listener for body clicks
x.addEventListener('click', function () {
    // Change background color on each click
    let randomCol = `rgb(${getRandom(0, 255)}, ${getRandom(0, 255)}, ${getRandom(0, 255)})`;
    body.style.backgroundColor = randomCol;

    // Increment the click count
    n++;
    document.querySelector('h2').textContent = n;

    // Start a new timer if none is running
    if (!isTimerRunning) {
        startTimer();
    }
});

function setScores(){
    removeScores();
    scores.forEach(function(score,i){
       const html = `<div class="scores"><h1>${scores.length-i}.</h1><h2 class="score">${score}</h2><br><hr></div>`;
       document.querySelector('.simple').insertAdjacentHTML('afterBegin',html);
    })
    document.querySelector('.leaderBoard').style.display =   'none';
    document.querySelector('.close').style.display='block';
    
}
document.querySelector('.leaderBoard').addEventListener('click',setScores);
function removeScores(){
    const ray = document.querySelectorAll('.scores');
    for(let i = 0;i<ray.length;i++){
        ray[i].remove();
    }
    document.querySelector('.leaderBoard').style.display =   'block';
    document.querySelector('.close').style.display='none';
}
document.querySelector('.close').addEventListener('click',removeScores)