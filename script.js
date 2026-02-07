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

  const label = document.createElement("p");
  label.id = "custom-texts";
  label.textContent = skill.name;

  const progress = document.createElement("div");
  progress.className = "progress text-center";

  const progressBar = document.createElement("div");
  progressBar.className = "progress-bar bg-success";
  progressBar.setAttribute("role", "progressbar");
  progressBar.setAttribute("aria-valuenow", "0");
  progressBar.setAttribute("aria-valuemin", "0");
  progressBar.setAttribute("aria-valuemax", "100");

  const percentage = document.createElement("span");
  percentage.className = "percentage";
  percentage.setAttribute("data-value", String(skill.percent));
  percentage.textContent = "0%";

  progressBar.appendChild(percentage);
  progress.appendChild(progressBar);
  skillWrapper.appendChild(label);
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

// $(document).ready(function() {
//     let animated = false;

//     $(window).scroll(function() {
//         if (!animated) {
//             let skillsPos = $('.skill').offset().top;
//             let winTop = $(window).scrollTop();
//             let winHeight = $(window).height();

//             if (skillsPos < winTop + winHeight - 50) {
//                 $('.skill').each(function() {
//                     let $currentSkill = $(this);
//                     let percent = $currentSkill.find('.percentage').data('value');
//                     let progressBar = $currentSkill.find('.progress-bar');
//                     let percentageSpan = $currentSkill.find('.percentage');

//                     $({ Counter: 0 }).animate({ Counter: percent }, {
//                         duration: 2000,
//                         easing: 'linear',
//                         step: function() {
//                             progressBar.width(this.Counter + '%');
//                             percentageSpan.text(Math.ceil(this.Counter) + '%');
//                         }
//                     });
//                 });
//                 animated = true;
//             }
//         }
//     });
// });

function getSkillsInSection() {
  const section = document.getElementById("technical-skills");
  if (!section) return [];

  return Array.from(section.querySelectorAll(".skill"))
    .map((skillEl) => {
      const progressBar = skillEl.querySelector(".progress-bar");
      const percentageSpan = skillEl.querySelector(".percentage");
      const rawTarget = percentageSpan?.getAttribute("data-value");
      const target = Number(rawTarget);

      return {
        skillEl,
        progressBar,
        percentageSpan,
        target: Number.isFinite(target) ? target : 0,
      };
    })
    .filter((s) => s.progressBar && s.percentageSpan);
}

function setSkillsToZero(skills) {
  skills.forEach(({ progressBar, percentageSpan }) => {
    progressBar.style.width = "0%";
    progressBar.setAttribute("aria-valuenow", "0");
    percentageSpan.textContent = "0%";
  });
}

function setSkillsToFinal(skills) {
  skills.forEach(({ progressBar, percentageSpan, target }) => {
    const finalValue = Math.max(0, Math.min(100, Math.round(target)));
    progressBar.style.width = `${finalValue}%`;
    progressBar.setAttribute("aria-valuenow", String(finalValue));
    percentageSpan.textContent = `${finalValue}%`;
  });
}

let skillsAnimationToken = 0;
function runSkillsAnimation() {
  const skills = getSkillsInSection();
  if (skills.length === 0) return;

  // Cancel any in-flight animation and start a fresh run.
  skillsAnimationToken += 1;
  const token = skillsAnimationToken;

  // Always restart from zero for a "rerun", but do it without
  // triggering CSS transitions so we avoid visible dips.
  const previousTransitions = new Map();

  skills.forEach(({ progressBar }) => {
    previousTransitions.set(progressBar, progressBar.style.transition);
    progressBar.style.transition = "none";
  });

  // Set bars and labels to 0% (no animation).
  setSkillsToZero(skills);

  // Force a reflow so the 0% reset is visually applied before animating.
  // (Prevents partial dips like 85% -> 30% -> 85% on rerun.)
  skills.forEach(({ progressBar }) => {
    void progressBar.offsetWidth;
  });

  // Restore any previous inline transition so other code/styles keep working.
  skills.forEach(({ progressBar }) => {
    const prev = previousTransitions.get(progressBar);
    if (prev && prev.length > 0) {
      progressBar.style.transition = prev;
    } else {
      progressBar.style.removeProperty("transition");
    }
  });

  if (prefersReducedMotion()) {
    setSkillsToFinal(skills);
    return;
  }

  const durationMs = 2000;
  const start = performance.now();

  function frame(now) {
    if (token !== skillsAnimationToken) return; // cancelled by a newer run

    const t = Math.min(1, (now - start) / durationMs);
    skills.forEach(({ progressBar, percentageSpan, target }) => {
      const clampedTarget = Math.max(0, Math.min(100, Number(target) || 0));
      const current = Math.ceil(clampedTarget * t);
      progressBar.style.width = `${current}%`;
      progressBar.setAttribute("aria-valuenow", String(current));
      percentageSpan.textContent = `${current}%`;
    });

    if (t < 1) {
      requestAnimationFrame(frame);
    }
  }

  requestAnimationFrame(frame);
}

function setupTechnicalSkillsObserver() {
  const section = document.getElementById("technical-skills");
  if (!section) return;

  let autoRan = false; // once per page load

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (!entry) return;
      if (entry.isIntersecting && !autoRan) {
        autoRan = true;
        runSkillsAnimation();
      }
    },
    { threshold: 0.25 },
  );

  observer.observe(section);
}

function setupTechnicalSkillsRerunButton() {
  const btn = document.getElementById("technical-skills-rerun");
  if (!btn) return;
  btn.addEventListener("click", () => runSkillsAnimation());
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
  setupTechnicalSkillsObserver();
  setupTechnicalSkillsRerunButton();

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

      if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      form.reset();
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
