function PomodoroTimer(pomodoroTime, breakTime) {
  let timerInterval;
  let currentTime = pomodoroTime * 60; // Convert to seconds
  let isPaused = true;
  let isAlarmPlaying = false;

  // Function to update timer display
  function updateTimerDisplay() {
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    document.querySelector(".clock_count").innerText = `${minutes}:${seconds}`;
  }

  function playAlarm() {
    const soundFile = "sounds/alarm-clock-short-6402.mp3"; // Replace with the path to your sound file
    const audio = new Audio(soundFile);

    // Play the sound
    audio.play();

    isAlarmPlaying = true; // Set flag to indicate alarm is playing
    audio.onended = () => {
      isAlarmPlaying = false; // Reset flag when alarm ends
    };
  }

  // Function to start the timer
  this.start = function () {
    let currentCycle = 0;
    numCycles = 5;
    if (isPaused) {
      isPaused = false;
      timerInterval = setInterval(() => {
        if (currentTime > 0) {
          currentTime--;
          updateTimerDisplay();
        } else {
          clearInterval(timerInterval);
          console.log("Time's up!");
          playAlarm(); // Play the sound when time is up

          if (currentCycle < numCycles - 1) {
            currentCycle++;
            setTimeout(() => {
              this.startBreak(); // Start the break timer
            }, 1000); // Delay the break start sound slightly
          } else {
            console.log("All cycles completed!");
          }
        }
      }, 1000);
    }
  };

  // Function to pause/resume the timer
  this.pauseResume = function () {
    if (!isPaused) {
      clearInterval(timerInterval);
    } else {
      this.start();
    }
    isPaused = !isPaused;
  };

  // Function to reset the timer
  this.reset = function () {
    clearInterval(timerInterval);
    currentTime = pomodoroTime * 60;
    updateTimerDisplay();
    isPaused = true;
  };

  // Function to restart the timer
  this.restart = function () {
    this.reset();
    this.start();
  };

  this.startBreak = function () {
    currentTime = breakTime; // Set break time
    updateTimerDisplay();
    isPaused = true;
    this.start(); // Start the break timer
  };
}

const start_btn = document.querySelector("#start_btn");
const pause_btn = document.querySelector("#pause_btn");
const continue_btn = document.querySelector("#continue_btn");
const restart_btn = document.querySelector("#restart_btn");
const finish_btn = document.querySelector("#finish_button");
const select_times = document.querySelector(".selecionar_tempos");
const clock = document.querySelector(".clock");

start_btn.addEventListener("click", (e) => {
  const work_time = document.querySelector("#work_time").textContent;
  const rest_time = document.querySelector("#rest_time").textContent;
  console.log(work_time, rest_time);

  const pomodoro = new PomodoroTimer(work_time, rest_time);
  pomodoro.start();

  pause_btn.addEventListener("click", (e) => {
    pause_btn.classList.add("hidden");
    continue_btn.classList.remove("hidden");
    pomodoro.pauseResume();
  });

  continue_btn.addEventListener("click", (e) => {
    pomodoro.pauseResume();
    continue_btn.classList.add("hidden");
    pause_btn.classList.remove("hidden");
  });

  restart_btn.addEventListener("click", (e) => {
    pomodoro.restart();
  });

  finish_btn.addEventListener("click", (e) => {
    pomodoro.pauseResume();
    select_times.classList.remove("hidden");
    clock.classList.add("hidden");
    clock.style.display = "none";
    restart_btn.classList.add("hidden");
    pause_btn.classList.add("hidden");
    continue_btn.classList.add("hidden");
    start_btn.classList.remove("hidden");
    finish_btn.classList.add("hidden");
  });

  restart_btn.classList.remove("hidden");
  pause_btn.classList.remove("hidden");
  start_btn.classList.add("hidden");
  finish_btn.classList.remove("hidden");
  select_times.classList.add("hidden");
  clock.classList.remove("hidden");
  clock.style.display = "grid";
});

chrome.browserAction.onClicked.addListener(function (tab) {
  const floatingWindow = document.querySelector("#floating-window");
  floatingWindow.style.display = "block";
});

chrome.action.onClicked.addListener((tab) => {
  chrome.windows.create({
    url: chrome.runtime.getURL("popup.html"),
    type: "popup",
    width: 400,
    height: 300,
  });
});
document
  .getElementById("popup-container")
  .addEventListener("click", (event) => {
    event.stopPropagation();
  });
