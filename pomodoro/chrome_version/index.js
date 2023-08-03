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

let intervalId, tempoTotal, tempoRestante;

function iniciarTemporizador() {
  if (!intervalId) {
    tempoRestante = tempoTotal;
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
  }
}

function atualizarTemporizador() {
  const minutos = Math.floor(tempoRestante / 60)
    .toString()
    .padStart(2, "0");
  const segundos = (tempoRestante % 60).toString().padStart(2, "0");
  document.querySelector(".clock_count").innerText = `${minutos}:${segundos}`;
}

function playAlarm() {
  const soundFile = "../sounds/alarm-clock-short-6402.mp3"; // Replace with the path to your sound file
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

function setTempoTotal(tempo) {
  tempoTotal = tempo;
}

start_btn.addEventListener("click", (e) => {
  const work_time = document.querySelector("#work_time").textContent;
  const rest_time = document.querySelector("#rest_time").textContent;
  console.log(work_time, rest_time);

  const select_times = document.querySelector(".selecionar_tempos");
  const clock = document.querySelector(".clock");
  select_times.classList.add("hidden");
  clock.classList.remove("hidden");
  clock.style.display = "grid";

  // 1. Definindo o tempo total de trabalho e iniciando o temporizador
  setTempoTotal(work_time);
  iniciarTemporizador().then(() => {
    setTempoTotal(rest_time);
  });
  iniciarTemporizador();
});

pause_btn.addEventListener("click", (e) => {
  pararTemporizador();
});
