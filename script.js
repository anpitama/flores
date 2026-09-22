const firefliesContainer = document.getElementById("fireflies");
const sparklesContainer = document.getElementById("sparkles");
const petalsContainer = document.getElementById("petalRain");
const welcome = document.getElementById("welcome");
const experience = document.getElementById("experience");
const startButton = document.getElementById("startExperience");
const bouquet = document.getElementById("bouquet");
const lines = Array.from(document.querySelectorAll(".line"));
const letterButton = document.getElementById("openLetter");
const letterOverlay = document.getElementById("letterOverlay");
const closeLetter = document.getElementById("closeLetter");
const onePieceHint = document.getElementById("onePieceHint");
const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");

let petalsInterval;
let heartsInterval;
let musicStarted = false;

createFireflies();

startButton.addEventListener("click", async () => {
  welcome.classList.add("hidden");
  experience.classList.add("active");
  experience.setAttribute("aria-hidden", "false");

  startBouquetSequence();
  await tryStartMusic();
});

musicToggle.addEventListener("click", async () => {
  if (bgMusic.paused) {
    const playing = await tryStartMusic(true);
    if (!playing) {
      musicToggle.textContent = "Música: Off";
    }
    return;
  }

  bgMusic.pause();
  musicToggle.textContent = "Música: Off";
});

letterButton.addEventListener("click", () => {
  letterOverlay.classList.add("open");
  letterOverlay.setAttribute("aria-hidden", "false");

  window.setTimeout(() => {
    onePieceHint.classList.add("visible");
  }, 900);
});

closeLetter.addEventListener("click", closeLetterPanel);
letterOverlay.addEventListener("click", (event) => {
  if (event.target === letterOverlay) closeLetterPanel();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLetterPanel();
});

function closeLetterPanel() {
  letterOverlay.classList.remove("open");
  letterOverlay.setAttribute("aria-hidden", "true");
}

function startBouquetSequence() {
  makeSparkles(20);

  window.setTimeout(() => {
    bouquet.classList.add("stage-started");
  }, 350);

  window.setTimeout(() => {
    revealLines();
  }, 4300);

  petalsInterval = window.setInterval(() => createFallingPetal(), 700);
  heartsInterval = window.setInterval(() => createHeart(), 4200);
}

function revealLines() {
  lines.forEach((line, index) => {
    window.setTimeout(() => {
      line.classList.add("visible");
    }, index * 2000);
  });

  window.setTimeout(() => {
    letterButton.classList.add("reveal");
  }, lines.length * 2000);
}

function createFireflies() {
  const count = window.innerWidth < 700 ? 16 : 26;
  firefliesContainer.innerHTML = "";

  for (let i = 0; i < count; i += 1) {
    const dot = document.createElement("span");
    dot.className = "firefly";
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = `${Math.random() * 100}%`;
    dot.style.setProperty("--size", `${2 + Math.random() * 3}px`);
    dot.style.setProperty("--dur", `${5 + Math.random() * 5}s`);
    dot.style.setProperty("--delay", `${Math.random() * 5}s`);
    dot.style.setProperty("--mx", `${-10 + Math.random() * 20}px`);
    dot.style.setProperty("--my", `${-26 + Math.random() * 36}px`);
    firefliesContainer.appendChild(dot);
  }
}

function makeSparkles(amount) {
  sparklesContainer.innerHTML = "";

  for (let i = 0; i < amount; i += 1) {
    const spark = document.createElement("span");
    spark.className = "spark";
    spark.style.left = `${40 + Math.random() * 20}%`;
    spark.style.bottom = `${14 + Math.random() * 18}%`;
    spark.style.setProperty("--size", `${3 + Math.random() * 4}px`);
    spark.style.setProperty("--dur", `${1 + Math.random() * 1.7}s`);
    spark.style.animationDelay = `${Math.random() * 1.2}s`;
    sparklesContainer.appendChild(spark);
  }
}

function createFallingPetal() {
  const petal = document.createElement("span");
  petal.className = "falling-petal";
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.top = "-10%";
  petal.style.setProperty("--drift", `${-40 + Math.random() * 80}px`);
  petal.style.animationDuration = `${8 + Math.random() * 6}s`;
  petalsContainer.appendChild(petal);

  window.setTimeout(() => {
    petal.remove();
  }, 15000);
}

function createHeart() {
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.innerHTML = "♡";
  heart.style.left = `${20 + Math.random() * 60}%`;
  heart.style.top = "-8%";
  heart.style.setProperty("--drift", `${-18 + Math.random() * 36}px`);
  heart.style.animationDuration = `${7 + Math.random() * 4}s`;
  petalsContainer.appendChild(heart);

  window.setTimeout(() => {
    heart.remove();
  }, 12000);
}

async function tryStartMusic(forceToggle = false) {
  if (!bgMusic) return false;

  try {
    await bgMusic.play();
    musicStarted = true;
    musicToggle.textContent = "Música: On";
    return true;
  } catch (error) {
    if (forceToggle || !musicStarted) {
      musicToggle.textContent = "Música: Tocar";
    }
    return false;
  }
}

window.addEventListener("resize", () => {
  createFireflies();
});

window.addEventListener("beforeunload", () => {
  window.clearInterval(petalsInterval);
  window.clearInterval(heartsInterval);
});
