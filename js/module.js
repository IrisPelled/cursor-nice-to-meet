function quizPick(btn) {
  const card = btn.closest(".quiz-card");
  if (!card) return;
  const ok = btn.getAttribute("data-ok") === "1";
  card.querySelectorAll(".quiz-opt").forEach((el) => el.classList.remove("right", "wrong"));
  btn.classList.add(ok ? "right" : "wrong");
  const fb = card.querySelector(".quiz-fb");
  if (fb) fb.textContent = ok ? fb.getAttribute("data-ok") : fb.getAttribute("data-no");
}

function fanPick(btn) {
  const block = btn.closest(".fan-block");
  if (!block) return;
  block.querySelectorAll(".fan-card").forEach((el) => {
    const on = el === btn;
    el.classList.toggle("active", on);
    el.setAttribute("aria-pressed", on ? "true" : "false");
  });
  const id = btn.getAttribute("data-panel");
  block.querySelectorAll(".fan-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.getAttribute("data-panel") === id);
  });
}

function shieldPick(btn) {
  const open = btn.classList.toggle("open");
  btn.setAttribute("aria-expanded", open ? "true" : "false");
}

function receiptPick(btn) {
  const open = btn.classList.toggle("open");
  btn.setAttribute("aria-expanded", open ? "true" : "false");
}

let glossReturn = null;
function openGloss() {
  const gloss = document.getElementById("gloss");
  const btn = document.getElementById("glossBtn");
  if (!gloss) return;
  glossReturn = document.activeElement;
  gloss.hidden = false;
  if (btn) btn.setAttribute("aria-expanded", "true");
  if (window.innerWidth <= 768 && typeof closeSidebar === "function") closeSidebar();
  const search = document.getElementById("glSearch");
  if (search) search.focus();
  if (window.lucide) lucide.createIcons();
}
function closeGloss() {
  const gloss = document.getElementById("gloss");
  const btn = document.getElementById("glossBtn");
  if (!gloss) return;
  gloss.hidden = true;
  if (btn) btn.setAttribute("aria-expanded", "false");
  if (glossReturn && typeof glossReturn.focus === "function") glossReturn.focus();
}
function glFilter(value) {
  const q = (value || "").trim();
  let shown = 0;
  document.querySelectorAll(".gl-card").forEach((card) => {
    const hay = card.getAttribute("data-term") || "";
    const hit = !q || hay.includes(q);
    card.classList.toggle("hidden", !hit);
    if (hit) shown += 1;
  });
  const empty = document.getElementById("glEmpty");
  if (empty) empty.classList.toggle("on", shown === 0);
}

document.addEventListener("keydown", (event) => {
  const gloss = document.getElementById("gloss");
  if (gloss && !gloss.hidden && event.key === "Escape") {
    event.preventDefault();
    closeGloss();
    return;
  }
  if ((event.key === "Enter" || event.key === " ") && event.target.matches(".flip-card, .concept-card")) {
    event.preventDefault();
    event.target.classList.toggle("flipped");
  }
});

document.addEventListener("click", (event) => {
  const gloss = document.getElementById("gloss");
  if (!gloss || gloss.hidden) return;
  if (event.target === gloss) closeGloss();
});
