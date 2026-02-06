
import { daveData } from "./daveData.js";

console.log("devG here")

function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

    return Array.from(section.querySelectorAll(".skill")).map((skillEl) => {
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
    }).filter((s) => s.progressBar && s.percentageSpan);
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

    const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting && !autoRan) {
            autoRan = true;
            runSkillsAnimation();
        }
    }, { threshold: 0.25 });

    observer.observe(section);
}

function setupTechnicalSkillsRerunButton() {
    const btn = document.getElementById("technical-skills-rerun");
    if (!btn) return;
    btn.addEventListener("click", () => runSkillsAnimation());
}

// for progress bar animation 0-specified percentage
$(document).ready(function() {
    renderTechnicalSkills();
    setupTechnicalSkillsObserver();
    setupTechnicalSkillsRerunButton();
});


// sidebar customs on smaller screen
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('show');

    // Toggle 'open' class for animated hamburger-to-X icon
    const animatedIcon = document.querySelector('.animated-icon1');
    animatedIcon.classList.toggle('open');
}
window.toggleSidebar = toggleSidebar;

// Adjust sidebar height based on navbar height
window.addEventListener('load', function() {
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.top = navbarHeight + 'px';
    sidebar.style.height = 'calc(100vh - ' + navbarHeight + 'px)';
});



    // FROM VALIDATIONS
    $(document).ready(function() {
        $('#contactForm').submit(function(e) {
          e.preventDefault();
          
          // Basic validation
          var name = $('#name').val();
          var email = $('#email').val();
          var message = $('#message').val();
          
          if (name === '' || email === '' || message === '') {
            alert('Please fill in all fields.');
            return;
          }
          
          // Additional email validation using a regular expression
          var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
          }
          
          // Form submission logic (you can replace this with your own handling)
          // For example, you can use AJAX to submit the form data to a server
          
          // Reset form fields after successful submission (optional)
          $('#contactForm')[0].reset();
        });
      });