// popup.js

let timerInterval;
let seconds = 0;
let minutes = 0;
let hours = 0;

// Load timer state from storage when popup is opened
chrome.storage.local.get(["timerState"], function (result) {
  if (result.timerState) {
    seconds = result.timerState.seconds;
    minutes = result.timerState.minutes;
    hours = result.timerState.hours;
    updateDisplay();
  }
});

function startTimer() {
  timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  // Save timer state to storage when stopped
  chrome.storage.local.set({ timerState: { seconds, minutes, hours } });
}

function updateTimer() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }
  updateDisplay();
}

function updateDisplay() {
  document.getElementById("timer").textContent = `${pad(hours)}:${pad(
    minutes
  )}:${pad(seconds)}`;
}

function pad(value) {
  return String(value).padStart(2, "0");
}

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("stop").addEventListener("click", stopTimer);
