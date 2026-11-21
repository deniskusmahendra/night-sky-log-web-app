import Chart from "chart.js/auto";
import "./style.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api/targets";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const app = document.querySelector("#app");

app.innerHTML = `
  <div class="sky">
    <header class="hero">
      <p class="eyebrow">A monthly guide to the sky</p>
      <h1>Night Sky Log</h1>
      <p class="subtitle">Choose a month to see what's worth looking for.</p>
      <p class="chart-caption">Targets by best month</p>
      <div class="chart-panel" id="chart-panel" hidden>
        <canvas id="month-chart" role="img" aria-label="Bar chart of targets by best month"></canvas>
      </div>
      <div class="month-control">
        <label for="month-picker">Best month</label>
        <select id="month-picker">
          <option value="all">All months</option>
          ${MONTH_NAMES.map(
            (name, index) => `<option value="${index + 1}">${name}</option>`
          ).join("")}
        </select>
      </div>
    </header>

    <main>
      <p id="result-count" class="result-count" aria-live="polite"></p>
      <div id="cards" class="cards"></div>
      <p id="message" class="message" hidden></p>
    </main>
  </div>
`;

const picker = app.querySelector("#month-picker");
const cardsEl = app.querySelector("#cards");
const countEl = app.querySelector("#result-count");
const messageEl = app.querySelector("#message");
const chartPanelEl = app.querySelector("#chart-panel");

let targets = [];

function createCard(target) {
  const card = document.createElement("article");
  card.className = "card";

  const type = document.createElement("p");
  type.className = "card-type";
  type.textContent = target.type;

  const name = document.createElement("h2");
  name.textContent = target.name;

  const difficulty = document.createElement("p");
  difficulty.className = "card-difficulty";
  const label = document.createElement("span");
  label.textContent = "Difficulty";
  const pips = document.createElement("span");
  pips.className = "pips";
  pips.setAttribute("aria-label", `Difficulty ${target.difficulty} of 3`);
  for (let level = 1; level <= 3; level += 1) {
    const pip = document.createElement("span");
    pip.className = level <= target.difficulty ? "pip filled" : "pip";
    pip.setAttribute("aria-hidden", "true");
    pips.append(pip);
  }
  difficulty.append(label, pips);

  const tip = document.createElement("p");
  tip.className = "card-tip";
  tip.textContent = target.tip;

  const month = document.createElement("p");
  month.className = "card-month";
  month.textContent = `Best in ${MONTH_NAMES[target.bestMonth - 1]}`;

  card.append(type, name, difficulty, tip, month);
  return card;
}

function renderChart(allTargets) {
  const counts = MONTH_NAMES.map(
    (_, index) => allTargets.filter((target) => target.bestMonth === index + 1).length
  );

  chartPanelEl.hidden = false;

  new Chart(app.querySelector("#month-chart"), {
    type: "bar",
    data: {
      labels: MONTH_NAMES.map((name) => name.slice(0, 3)),
      datasets: [
        {
          label: "Targets",
          data: counts,
          backgroundColor: "rgba(143, 183, 255, 0.55)",
          borderColor: "#8fb7ff",
          borderWidth: 1,
          borderRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: "#9eabc9" },
        },
        y: {
          beginAtZero: true,
          ticks: { color: "#9eabc9", stepSize: 1, precision: 0 },
          grid: { color: "rgba(143, 183, 255, 0.12)" },
        },
      },
    },
  });
}

function renderCards() {
  const selected = picker.value;
  const visible =
    selected === "all"
      ? targets
      : targets.filter((target) => target.bestMonth === Number(selected));

  cardsEl.replaceChildren(
    ...visible.map((target) => createCard(target))
  );

  const scope = selected === "all" ? "across the year" : `best in ${MONTH_NAMES[Number(selected) - 1]}`;
  countEl.textContent = `${visible.length} target${visible.length === 1 ? "" : "s"} ${scope}`;

  if (visible.length === 0) {
    messageEl.textContent = "No targets stand out for that month — try another.";
    messageEl.hidden = false;
  } else {
    messageEl.hidden = true;
  }
}

async function loadTargets() {
  messageEl.textContent = "Loading the sky…";
  messageEl.hidden = false;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);

    targets = await response.json();
    renderChart(targets);
    renderCards();
  } catch (error) {
    console.error("Could not load sky targets:", error);
    countEl.textContent = "";
    messageEl.textContent = "Could not load sky targets. Is the server running on port 3001?";
    messageEl.hidden = false;
  }
}

picker.addEventListener("change", renderCards);
loadTargets();
