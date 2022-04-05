/* Navigation Smooth Scroll on buttons */
// Select all links with hashes
$('a[href*="#"]')
// Remove links that don't actually link to anything
.not('[href="#"]')
.not('[href="#0"]')
.click(function(event) {
    // On-page links
    if (
    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
    && 
    location.hostname == this.hostname
    ) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    // Does a scroll target exist?
    if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
        scrollTop: target.offset().top
        }, 1000, function() {
        // Callback after animation
        // Must change focus!
        var $target = $(target);
        $target.focus();
        if ($target.is(":focus")) { // Checking if the target was focused
            return false;
        } else {
        };
        });
    }
    }
});


// Mobile Navigation
const toggleButton = document.getElementsByClassName('mobile-nav-btn')[0];
const navbarLinks =  document.getElementsByClassName('main-nav-list')[0];

// When clicking mobile menu button, toggle navbarlinks to display as flex items
toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
})

/*
// When clicking a navbarlink, hide the navbarlinks
navbarLinks.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
})
*/

// Change Mobile Nav Button Icon
$('.mobile-nav-btn').click(function() {
    var icon = $('.mobile-nav-btn-container i');

    if (icon.hasClass('fas fa-bars')) {
        icon.removeClass('fas fa-bars');
        icon.addClass('fas fa-times');
        
    } else {
        icon.removeClass('fas fa-times');
        icon.addClass('fas fa-bars');
    }
});

// Keep copyright year up to date
const currentYearElement = document.querySelector('.current-year');
const currentYear = new Date().getFullYear();

currentYearElement.innerHTML = currentYear;