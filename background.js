// background.js

let timerInterval;
let seconds = 0;
let minutes = 0;
let hours = 0;

// Load timer state from storage and resume timer
chrome.storage.local.get(["timerState"], function (result) {
  if (result.timerState) {
    seconds = result.timerState.seconds;
    minutes = result.timerState.minutes;
    hours = result.timerState.hours;
    startTimer();
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
  // Update timer display (optional)
  updateDisplay();
}

function updateDisplay() {
  // Update display with current timer state (optional)
}

// Message listener (optional)
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "startTimer") {
    startTimer();
  } else if (request.action === "stopTimer") {
    stopTimer();
  }
});
