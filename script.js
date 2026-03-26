let timerInterval;
let seconds = 0;
let isRunning = false;

let totalTime = 0;
let unfocusedTime = 0;

// Start session
function startSession() {
  if (isRunning) return;

  isRunning = true;
  seconds = 0;
  totalTime = 0;
  unfocusedTime = 0;

  timerInterval = setInterval(() => {
    seconds++;
    totalTime++;

    document.getElementById("timer").innerText = formatTime(seconds);
  }, 1000);
}

// End session
function endSession() {
  clearInterval(timerInterval);
  isRunning = false;

  const focusScore = Math.max(
    0,
    ((totalTime - unfocusedTime) / totalTime) * 100
  );

  document.getElementById("score").innerText = focusScore.toFixed(0);

  saveSession(focusScore);
}

// Detect tab switching
document.addEventListener("visibilitychange", () => {
  if (document.hidden && isRunning) {
    unfocusedTime++;
  }
});

// Format time
function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// Save session
function saveSession(score) {
  let sessions = JSON.parse(localStorage.getItem("sessions")) || [];
  sessions.push({
    date: new Date().toLocaleString(),
    score: score,
  });
  localStorage.setItem("sessions", JSON.stringify(sessions));
}