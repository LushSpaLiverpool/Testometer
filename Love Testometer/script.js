const productNameEl = document.getElementById("productName");
const questionsEl = document.getElementById("questions");
const nextButton = document.getElementById("nextButton");
const testButton = document.getElementById("testButton");
const resultsContainer = document.getElementById("resultsContainer");
const strengthGauge = document.getElementById("strengthGauge");
const resultText = document.getElementById("resultText");
const whyList = document.getElementById("whyList");

productNameEl.innerText = CONFIG.productName;

let currentQuestion = 0;
const totalQuestions = CONFIG.questions.length;

// Render questions
CONFIG.questions.forEach((q, qIndex) => {
    const div = document.createElement("div");
    div.className = "question";
    div.style.display = qIndex === 0 ? "block" : "none";
    div.dataset.index = qIndex;

    div.innerHTML = `
    <p class="question-title">💬 Question ${qIndex + 1}</p>
    <p class="question-text">${q.text}</p>
    ${q.answers.map((a, aIndex) => `
      <label class="option">
        <input type="radio" name="${q.key}" value="${aIndex}">
        ${a.label}
      </label>
    `).join("")}
  `;

    questionsEl.appendChild(div);
});

// Navigation buttons
nextButton.addEventListener("click", () => {
    const selected = document.querySelector(`.question[data-index="${currentQuestion}"] input[type="radio"]:checked`);
    if (!selected) { alert("Please select an answer 💕"); return; }

    document.querySelector(`.question[data-index="${currentQuestion}"]`).style.display = "none";
    currentQuestion++;

    if (currentQuestion < totalQuestions) {
        document.querySelector(`.question[data-index="${currentQuestion}"]`).style.display = "block";
    } else {
        nextButton.style.display = "none";
        testButton.style.display = "block";
    }
});

// Max score
const maxScore = CONFIG.questions.reduce((sum, q) => {
    return sum + Math.max(...q.answers.map(a => a.points));
}, 0);

// Create strength gauge lights
const totalLights = 10;
const lights = [];
for (let i = 0; i < totalLights; i++) {
    const div = document.createElement("div");
    div.classList.add("light");
    strengthGauge.appendChild(div);
    lights.push(div);
}

// Test match button
testButton.addEventListener("click", () => {
    let score = 0;
    let reasons = [];

    for (const q of CONFIG.questions) {
        const selected = document.querySelector(`input[name="${q.key}"]:checked`);
        if (!selected) return;
        const answer = q.answers[selected.value];
        score += answer.points;
        reasons.push(answer.reason);
    }

    // Hide questions & show results
    questionsEl.style.display = "none";
    testButton.style.display = "none";
    resultsContainer.style.display = "block";

    resultText.innerText = "Testing your chemistry...";
    whyList.innerHTML = "";

    // Reset lights
    lights.forEach(light => light.style.opacity = "0.2");

    const scoreRatio = score / maxScore;
    const lightsToIlluminate = Math.round(scoreRatio * totalLights);

    let index = 0;
    const interval = setInterval(() => {
        if (index >= lightsToIlluminate) {
            clearInterval(interval);
            strengthGauge.classList.remove("shaking");
            showResult(score, reasons);
            return;
        }

        // Color tier
        if (index < Math.floor(totalLights * 0.33)) lights[index].className = "light green";
        else if (index < Math.floor(totalLights * 0.66)) { lights[index].className = "light yellow"; launchConfetti(3); }
        else { lights[index].className = "light red"; launchConfetti(5); }

        // Illuminate light
        lights[index].style.opacity = "1";

        // Jitter animation
        lights[index].style.animation = "lightJitter 0.4s ease";
        setTimeout(() => lights[index].style.animation = "", 400);

        // Gauge shake
        strengthGauge.classList.add("shaking");
        setTimeout(() => strengthGauge.classList.remove("shaking"), 200);

        // Quick flash
        strengthGauge.classList.add("flashing");
        setTimeout(() => strengthGauge.classList.remove("flashing"), 120);

        index++;
    }, 200);
});

// Show results
function showResult(score, reasons) {
    const tier = CONFIG.tiers.find(t => score >= t.min);
    resultText.innerText = `${tier.label} (${Math.round(score / maxScore * 100)}%)`;

    reasons.forEach(reason => {
        const li = document.createElement("li");
        li.innerText = reason;
        whyList.appendChild(li);
    });

    // Bonus confetti if score >= 90%
    if ((score / maxScore) >= 0.9) launchConfetti(50);
}

// -------------------- Confetti --------------------
function launchConfetti(count = 50) {
    const container = document.getElementById("confettiContainer");
    for (let i = 0; i < count; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = Math.random() * 100 + "%";
        confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.animationDuration = (1.5 + Math.random() * 1.5) + "s";
        confetti.style.width = (5 + Math.random() * 5) + "px";
        confetti.style.height = (5 + Math.random() * 5) + "px";
        container.appendChild(confetti);
        confetti.addEventListener("animationend", () => container.removeChild(confetti));
    }
}
