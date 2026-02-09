import { daveData } from "./daveData.js";

console.log("devG here");

function prefersReducedMotion() {
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function createSkillElement(skill) {
  const skillWrapper = document.createElement("div");
  skillWrapper.className = "skill";

  const levelRaw = String(skill.level || "").toLowerCase();
  let levelClass = "skill-level--good";
  if (levelRaw.includes("expert")) {
    levelClass = "skill-level--expert";
  } else if (levelRaw.includes("advanced") || levelRaw.includes("advance")) {
    levelClass = "skill-level--advanced";
  } else if (levelRaw.includes("proficient") || levelRaw.includes("solid")) {
    levelClass = "skill-level--solid";
  }

  const progress = document.createElement("div");
  progress.className = "progress text-center";

  const progressBar = document.createElement("div");
  progressBar.className = `progress-bar ${levelClass}`;
  progressBar.setAttribute("role", "progressbar");
  progressBar.setAttribute("aria-valuenow", "100");
  progressBar.setAttribute("aria-valuemin", "0");
  progressBar.setAttribute("aria-valuemax", "100");
  progressBar.style.width = "100%";
  progressBar.textContent = skill.name || "";

  progress.appendChild(progressBar);
  skillWrapper.appendChild(progress);

  return skillWrapper;
}

function renderTechnicalSkills() {
  const left = document.getElementById("technical-skills-left");
  const right = document.getElementById("technical-skills-right");
  if (!left || !right) return;

  left.innerHTML = "";
  right.innerHTML = "";

  (daveData?.technicalSkills?.left || []).forEach((skill) => {
    left.appendChild(createSkillElement(skill));
  });

  (daveData?.technicalSkills?.right || []).forEach((skill) => {
    right.appendChild(createSkillElement(skill));
  });
}

function createCaseStudyCard(item) {
  const tags = Array.isArray(item.tags) ? item.tags : [];
  const tagsStr = tags.join(" ");

  const col = document.createElement("div");
  col.className = "col-12 col-md-6 col-lg-4 mb-4 case-study-card";
  col.dataset.tags = tagsStr;
  col.dataset.primary = tags[0] || "All";

  const card = document.createElement("div");
  card.className = "card h-100";

  const body = document.createElement("div");
  body.className = "card-body";

  const title = document.createElement("h4");
  title.className = "card-title";
  title.textContent = item.title || "";

  const tagsWrap = document.createElement("div");
  tagsWrap.className = "case-study-tags";
  tags.forEach((t) => {
    const tag = document.createElement("span");
    tag.className = `case-study-tag case-study-tag--${String(t).toLowerCase()}`;
    tag.textContent = t;
    tagsWrap.appendChild(tag);
  });

  const summary = document.createElement("p");
  summary.className = "card-text";
  summary.id = "custom-texts";
  summary.textContent = item.summary || "";

  const highlightsList = document.createElement("ul");
  highlightsList.className = "case-study-highlights";
  (Array.isArray(item.highlights) ? item.highlights : []).forEach((h) => {
    const li = document.createElement("li");
    li.textContent = h;
    li.id = "custom-texts";
    highlightsList.appendChild(li);
  });

  const stackWrap = document.createElement("div");
  stackWrap.className = "case-study-stack";
  (Array.isArray(item.stack) ? item.stack : []).forEach((s) => {
    const badge = document.createElement("span");
    badge.className = "case-study-stack-badge";
    badge.textContent = s;
    stackWrap.appendChild(badge);
  });

  body.appendChild(title);
  body.appendChild(tagsWrap);
  body.appendChild(summary);
  body.appendChild(highlightsList);
  body.appendChild(stackWrap);
  card.appendChild(body);
  col.appendChild(card);
  return col;
}

function renderCaseStudies() {
  const container = document.getElementById("case-studies-cards");
  if (!container) return;
  const list = daveData?.caseStudies || [];
  container.innerHTML = "";
  list.forEach((item) => container.appendChild(createCaseStudyCard(item)));
}

function setCaseStudiesFilter(filter) {
  const wanted = String(filter || "All").toLowerCase();

  document.querySelectorAll(".case-study-card").forEach((card) => {
    const tagsStr = (card.dataset.tags || "").trim().toLowerCase();
    const tags = tagsStr ? tagsStr.split(/\s+/) : [];

    const show = wanted === "all" || tags.includes(wanted);
    card.classList.toggle("hidden", !show);
  });
}

function setupCaseStudiesTabs() {
  const wrap = document.querySelector(".case-studies-tabs");
  if (!wrap) return;

  wrap.addEventListener("click", (e) => {
    const btn = e.target.closest(".case-studies-tab");
    if (!btn) return;

    wrap.querySelectorAll(".case-studies-tab").forEach((t) => {
      t.classList.remove("active");
      t.setAttribute("aria-selected", "false");
    });

    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");

    setCaseStudiesFilter(btn.dataset.filter || "All");
  });
}

function setupScrollReveal() {
  const sections = document.querySelectorAll(".sr-section");
  if (!sections.length) return;

  // If user prefers reduced motion, reveal immediately with no animation.
  if (prefersReducedMotion()) {
    sections.forEach((el) => el.classList.add("sr-section--visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("sr-section--visible");
        obs.unobserve(entry.target); // run once per section
      });
    },
    {
      threshold: 0.15,
    },
  );

  sections.forEach((el) => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  renderTechnicalSkills();
  setupCiDemo();
  setupThemeToggle();
  renderCaseStudies();
  setupCaseStudiesTabs();
  setCaseStudiesFilter("All");

  setupScrollReveal();

  // Contact form validation (vanilla, same rules as before)
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name")?.value?.trim() || "";
      const email = document.getElementById("email")?.value?.trim() || "";
      const message = document.getElementById("message")?.value?.trim() || "";
      const submitBtn = form.querySelector('button[type="submit"]');

      if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
      }

      const formData = new FormData(form);
      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error("Request failed");
          form.reset();

          const modalEl = document.getElementById("contactSuccessModal");
          if (modalEl && window.bootstrap?.Modal) {
            const modal = window.bootstrap.Modal.getOrCreateInstance(modalEl);
            modal.show();
          } else {
            alert("Message sent successfully.");
          }
        })
        .catch(() => {
          const errorModalEl = document.getElementById("contactErrorModal");
          if (errorModalEl && window.bootstrap?.Modal) {
            const modal =
              window.bootstrap.Modal.getOrCreateInstance(errorModalEl);
            modal.show();
          } else {
            alert("Form is temporarily unavailable—please email me directly.");
          }
        })
        .finally(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = "Send";
          }
        });
    });
  }
});

// sidebar customs on smaller screen
function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("show");

  // Toggle 'open' class for animated hamburger-to-X icon
  const animatedIcon = document.querySelector(".animated-icon1");
  animatedIcon.classList.toggle("open");
}
window.toggleSidebar = toggleSidebar;

// Adjust sidebar height based on navbar height
window.addEventListener("load", function () {
  const navbarHeight = document.querySelector(".navbar").offsetHeight;
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.top = navbarHeight + "px";
  sidebar.style.height = "calc(100vh - " + navbarHeight + "px)";
});

// ----------------------------
// Signature Tester Interaction: CI Demo (Simulation)
// ----------------------------
function setupCiDemo() {
  const runBtn = document.getElementById("ci-demo-run");
  const statusEl = document.getElementById("ci-demo-status");
  const barEl = document.getElementById("ci-demo-bar");
  const logEl = document.getElementById("ci-demo-log");
  const summaryEl = document.getElementById("ci-demo-summary");

  if (!runBtn || !statusEl || !barEl || !logEl || !summaryEl) return;

  const reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let isRunning = false;
  let runToken = 0;

  const steps = [
    { text: "Initialize test runner", state: "run" },
    { text: "Launch browser context", state: "run" },
    { text: "E2E: Login flow", state: "ok" },
    { text: "API: Auth validation", state: "ok" },
    { text: "E2E: Dashboard load", state: "ok" },
    { text: "Automation: Generate CI report", state: "ok" },
    { text: "Process: Save artifacts (screenshots/logs)", state: "skip" },
  ];

  function resetUi() {
    barEl.style.width = "0%";
    logEl.innerHTML = "";
    summaryEl.textContent = "";
    statusEl.textContent = "Idle";
  }

  function addLogLine(text, state) {
    const li = document.createElement("li");
    li.className = state; // ok | run | skip
    li.textContent = text;
    logEl.appendChild(li);
    // keep newest visible
    logEl.scrollTop = logEl.scrollHeight;
  }

  function setProgress(pct) {
    barEl.style.width = `${Math.max(0, Math.min(100, pct))}%`;
  }

  function finishSummary() {
    // Keep it believable, not "too perfect"
    const passed = 6;
    const skipped = 1;
    const failed = 0;

    statusEl.textContent = "Completed";
    summaryEl.textContent = `✅ Completed: ${passed} passed · ${failed} failed · ${skipped} skipped`;
  }

  function runSimulation() {
    if (isRunning) return;
    isRunning = true;
    runToken += 1;
    const token = runToken;

    runBtn.disabled = true;
    runBtn.textContent = "Running...";
    statusEl.textContent = "Running";
    summaryEl.textContent = "";
    logEl.innerHTML = "";
    setProgress(0);

    // Reduced motion: snap to final instantly, still update content
    if (reduceMotion) {
      steps.forEach((s) =>
        addLogLine(s.text, s.state === "run" ? "ok" : s.state),
      );
      setProgress(100);
      finishSummary();
      runBtn.disabled = false;
      runBtn.textContent = "Run Again";
      isRunning = false;
      return;
    }

    let i = 0;
    const total = steps.length;

    function next() {
      if (token !== runToken) return; // canceled
      if (i >= total) {
        setProgress(100);
        finishSummary();
        runBtn.disabled = false;
        runBtn.textContent = "Run Again";
        isRunning = false;
        return;
      }

      const step = steps[i];

      // If it's a "run" step, show as running then mark ok
      if (step.state === "run") {
        addLogLine(step.text, "run");
        setProgress(Math.round(((i + 0.25) / total) * 100));

        setTimeout(() => {
          if (token !== runToken) return;
          // Replace last line state to ok (simple approach: append ok line)
          addLogLine(step.text, "ok");
          setProgress(Math.round(((i + 1) / total) * 100));
          i += 1;
          setTimeout(next, 260);
        }, 420);
      } else {
        addLogLine(step.text, step.state);
        setProgress(Math.round(((i + 1) / total) * 100));
        i += 1;
        setTimeout(next, 320);
      }
    }

    next();
  }

  runBtn.addEventListener("click", () => {
    // Allow reruns even if last run finished
    if (isRunning) return;
    resetUi();
    runSimulation();
  });

  // Initial state
  resetUi();
}

// =========================
// Dark mode toggle
// =========================
function setupThemeToggle() {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;

  const STORAGE_KEY = "theme";
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)");

  function apply(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);

    btn.textContent = theme === "dark" ? "☀️" : "🌙";
    btn.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
    );
    btn.title = theme === "dark" ? "Light mode" : "Dark mode";
  }

  // Initial theme
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "dark" || saved === "light") {
    apply(saved);
  } else {
    apply(prefersDark?.matches ? "dark" : "light");
  }

  // Toggle on click
  btn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    apply(current === "dark" ? "light" : "dark");
  });

  // If user hasn't chosen manually, follow OS changes
  prefersDark?.addEventListener?.("change", (e) => {
    const savedNow = localStorage.getItem(STORAGE_KEY);
    if (!savedNow) apply(e.matches ? "dark" : "light");
  });
}
