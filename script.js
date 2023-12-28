
console.log("devG here")

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