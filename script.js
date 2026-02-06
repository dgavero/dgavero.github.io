
import { daveData } from "./daveData.js";

console.log("devG here")

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

// for progress bar animation 0-specified percentage
$(document).ready(function() {
    renderTechnicalSkills();

    let animated = false;

    function animateSkills() {
        $('.skill').each(function() {
            let $currentSkill = $(this);
            let percent = $currentSkill.find('.percentage').data('value');
            let progressBar = $currentSkill.find('.progress-bar');
            let percentageSpan = $currentSkill.find('.percentage');

            $({ Counter: 0 }).animate({ Counter: percent }, {
                duration: 2000,
                easing: 'linear',
                step: function() {
                    progressBar.width(this.Counter + '%');
                    percentageSpan.text(Math.ceil(this.Counter) + '%');
                }
            });
        });
        animated = true; // Animation flag set to prevent repeated animations
    }

    $(window).scroll(function() {
        if (!animated) {
            let skillsPos = $('.skill').first().offset().top;
            let winTop = $(window).scrollTop();
            let winHeight = $(window).height();

            if (skillsPos < winTop + winHeight - 50) {
                animateSkills();
            }
        }
    });

    // Trigger the scroll event initially to check if the animation should start immediately on page load
    $(window).scroll();
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