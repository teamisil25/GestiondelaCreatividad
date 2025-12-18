// ----- Menú hamburguesa -----
const toggleBtn = document.querySelector(".nav__toggle");
const menu = document.getElementById("navMenu");
const links = document.querySelectorAll(".nav__link");

function setMenu(open) {
  menu.classList.toggle("open", open);
  toggleBtn.setAttribute("aria-expanded", String(open));
  toggleBtn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
}

toggleBtn.addEventListener("click", () => {
  const isOpen = menu.classList.contains("open");
  setMenu(!isOpen);
});

links.forEach((a) => a.addEventListener("click", () => setMenu(false)));

document.addEventListener("click", (e) => {
  const isMobile = window.matchMedia("(max-width: 919px)").matches;
  if (!isMobile) return;
  const clickedInside = menu.contains(e.target) || toggleBtn.contains(e.target);
  if (!clickedInside) setMenu(false);
});

// ----- Demo: calculadora simple + puntos -----
const form = document.getElementById("calcForm");
const kmInput = document.getElementById("km");
const medioInput = document.getElementById("medio");

const outCO2 = document.getElementById("outCO2");
const outNoise = document.getElementById("outNoise");
const outPoints = document.getElementById("outPoints");
const totalPointsEl = document.getElementById("totalPoints");
const progressBar = document.getElementById("progressBar");
const resetPointsBtn = document.getElementById("resetPoints");

// Valores referenciales (solo para demostración)
const factors = {
  diesel:     { impact: 120, noise: 80, points: 0 },
  electrico: { impact: 40,  noise: 55, points: 3 },
  bici:      { impact: 0,   noise: 20, points: 5 },
  caminar:   { impact: 0,   noise: 10, points: 6 },
};

const GOAL = 100;

function loadPoints() {
  const saved = Number(localStorage.getItem("lsa_points") || "0");
  return Number.isFinite(saved) ? saved : 0;
}
function savePoints(v) {
  localStorage.setItem("lsa_points", String(v));
}
function paintProgress(points) {
  totalPointsEl.textContent = points;
  const pct = Math.max(0, Math.min(100, Math.round((points / GOAL) * 100)));
  progressBar.style.width = pct + "%";
}

let totalPoints = loadPoints();
paintProgress(totalPoints);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const km = Number(kmInput.value);
  const medio = medioInput.value;

  if (!Number.isFinite(km) || km < 0) return;

  const f = factors[medio];

  // Impacto aproximado (se muestra simple)
  const impact = Math.round(km * f.impact);
  const noise = f.noise;
  const earned = Math.max(0, Math.round(km * f.points));

  outCO2.textContent = `${impact} puntos de impacto`;
  outNoise.textContent = `${noise} (aprox.)`;
  outPoints.textContent = `${earned} pts`;

  totalPoints += earned;
  savePoints(totalPoints);
  paintProgress(totalPoints);
});

resetPointsBtn.addEventListener("click", () => {
  totalPoints = 0;
  savePoints(0);
  paintProgress(0);
  outCO2.textContent = "—";
  outNoise.textContent = "—";
  outPoints.textContent = "—";
});

// ----- Form contacto (demo) -----
const leadForm = document.getElementById("leadForm");
const leadMsg = document.getElementById("leadMsg");

leadForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  leadMsg.textContent = name
    ? `¡Gracias, ${name}! Te contactaremos para participar.`
    : "¡Gracias! Te contactaremos para participar.";
  leadForm.reset();
});
