function pomodoro(workTime, restTime, clock) {
  let laps = 0;
  while (laps <= 5) {
    const workTimeFinished = temporizador(workTime, "Work Time", clock);
    playAlarm();
    if (workTimeFinished === true) {
      temporizador(restTime, "Rest Time", clock);
      playAlarm();
      laps += 1;
      break;
    }
  }
}

let intervalId, tempoTotal, tempoTotalInicial, tempoRestante;

function iniciarTemporizador() {
  if (!intervalId) {
    tempoRestante = tempoTotal;
    tempoTotalInicial = tempoTotal;
    atualizarTemporizador();
    intervalId = setInterval(contagemRegressiva, 1000);
  }
}

function pararTemporizador() {
  clearInterval(intervalId);
  intervalId = null;
}

function contagemRegressiva() {
  tempoRestante--;
  if (tempoRestante >= 0) {
    atualizarTemporizador();
  } else {
    pararTemporizador();
    playAlarm();
    return true;
  }
}

function atualizarTemporizador() {
  const minutos = Math.floor(tempoRestante / 60)
    .toString()
    .padStart(2, "0");
  const segundos = (tempoRestante % 60).toString().padStart(2, "0");
  document.querySelector(".clock_count").innerText = `${minutos}:${segundos}`;
}

function continuarTemporizador() {
  if (!intervalId && tempoRestante > 0) {
    intervalId = setInterval(contagemRegressiva, 1000);
  }
}

function resetTemporizador(tempoTotalInicial) {
  // If the timer is currently running, stop it first
  if (intervalId) {
    pararTemporizador();
  }

  setTimeout(() => {
    console.log("Delayed code executed after 1 seconds");
  }, 1000);
  // Reset the timer variables
  tempoTotal = tempoTotalInicial;
  tempoRestante = tempoTotal;

  // Update the display with the initial time
  atualizarTemporizador();
}

function playAlarm() {
  const soundFile = "sounds/alarm-clock-short-6402.mp3"; // Replace with the path to your sound file
  const audio = new Audio(soundFile);

  // Play the sound
  audio.play();

  // Add some delay to let the sound play
  const delayDuration = 5000; // 5 seconds
  setTimeout(() => {
    // Stop the sound after the delay
    audio.pause();
    audio.currentTime = 0;
  }, delayDuration);
}

const start_btn = document.querySelector("#start_btn");
const pause_btn = document.querySelector("#pause_btn");
const continue_btn = document.querySelector("#continue_btn");
const reset_btn = document.querySelector("#reset_btn");
const select_times = document.querySelector(".selecionar_tempos");
const clock = document.querySelector(".clock");

function setTempoTotal(tempo) {
  tempoTotal = tempo;
}

start_btn.addEventListener("click", (e) => {
  const work_time = document.querySelector("#work_time").textContent;
  const rest_time = document.querySelector("#rest_time").textContent;
  console.log(work_time, rest_time);

  reset_btn.classList.remove("hidden");
  pause_btn.classList.remove("hidden");
  start_btn.classList.add("hidden");
  select_times.classList.add("hidden");
  clock.classList.remove("hidden");
  clock.style.display = "grid";

  // 1. Definindo o tempo total de trabalho e iniciando o temporizador
  setTempoTotal(work_time);
  iniciarTemporizador();
});

pause_btn.addEventListener("click", (e) => {
  pause_btn.classList.add("hidden");
  continue_btn.classList.remove("hidden");
  pararTemporizador();
});

continue_btn.addEventListener("click", (e) => {
  continuarTemporizador();
  continue_btn.classList.add("hidden");
  pause_btn.classList.remove("hidden");
});

reset_btn.addEventListener("click", (e) => {
  resetTemporizador(tempoTotalInicial);
  reset_btn.classList.add("hidden");
  start_btn.classList.remove("hidden");
  continue_btn.classList.add("hidden");
  pause_btn.classList.add("hidden");
});

chrome.browserAction.onClicked.addListener(function (tab) {
  const floatingWindow = document.querySelector("#floating-window");
  floatingWindow.style.display = "block";
});
