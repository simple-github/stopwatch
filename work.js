let timer = false;
let hour = 0;
let minute = 0;
let second = 0;
let micro = 0;
let n=1;
let laps=0;
const startBtn = document.getElementById('start');
const lapBtn = document.getElementById('lap');
const resetBtn = document.getElementById('reset');
const hrDisplay = document.getElementById('hr');
const minDisplay = document.getElementById('min');
const secDisplay = document.getElementById('sec');
const microDisplay = document.getElementById('micro');
const lapList = document.getElementById('lap-times');
// const li=document.getElementsByTagName('li');
function lapdata()
{
  laps=hour+":"+minute+":"+second+":"+micro;
  return laps;
};
startBtn.addEventListener('click', function () {
    if (!timer) {
        timer = true;
        startBtn.textContent = 'Pause';
        lapBtn.disabled = false;
        resetBtn.disabled = true; // Disable reset while timer
        stopWatch();
    } else {
        timer = false;
        startBtn.textContent = 'Resume';
        lapBtn.disabled = true;
        resetBtn.disabled = false; // Enable reset when paused
    }
});

lapBtn.addEventListener('click', function () {
    if (timer) {
    const lapTime = lapdata();
    const lapItem = document.createElement('li');
    lapItem.textContent ='Lap ' + n + ': ' + lapTime;
    lapList.appendChild(lapItem);
    lapItem.style.marginBottom = '0.5rem';
    // intended for some future additions in stopwatch
    // localStorage.setItem("lap" + n, lapTime);
    // console.log(localStorage.getItem("lap" + n));
    n++;
    }
    else
    {
    lapBtn.disabled = true;  
    }
});

resetBtn.addEventListener('click', function () {
    n=1;
    timer = false;
    startBtn.textContent = 'Start';
    lapBtn.disabled = true;
    resetBtn.disabled = true;
    // Clear the previous lap times by removing all child elements of <ul>
    while (lapList.firstChild) {
        lapList.removeChild(lapList.firstChild);
    }
    // intended for some future additions in stopwatch
    // Clear localStorage lap data
    // localStorage.clear();    
    hour = 0;
    minute = 0;
    second = 0;
    micro = 0;
    updateDisplay();
    
});

function updateDisplay() {     //updates the timer
    hrDisplay.textContent = hour < 10 ? "0" + hour : hour;
    minDisplay.textContent = minute < 10 ? "0" + minute : minute;
    secDisplay.textContent = second < 10 ? "0" + second : second;
    microDisplay.textContent = micro < 10 ? "00" + micro : (micro < 100 ? "0" + micro : micro);
}

function stopWatch() {   //logic for stopwatch
    if (timer) {
        micro++;

        if (micro == 100) {
            second++;
            micro = 0;
        }

        if (second == 60) {
            minute++;
            second = 0;
        }

        if (minute == 60) {
            hour++;
            minute = 0;
            second = 0;
        }

        updateDisplay();
        requestAnimationFrame(stopWatch);
    }
}
