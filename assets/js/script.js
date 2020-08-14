'use strict';

var alert = (function() {
	
    var alertLifetime = 5000;

    var generate = function(type, message) {
        var newAlert = $('<div class="alert alert-' + type + ' fade show" id="page-alert" role="alert">' + message + '</div>');

        $('body').append(newAlert);

        setTimeout(function() {
            newAlert.alert('close');
        }, alertLifetime);
    };

    $(document).on('alert.show', function(e, type, message) {
        generate(type, message);
    });

})();

var Navbar = (function() {

    var $navbar = $('.navbar');
    var $navbarCollapse = $('.navbar-collapse');

    function makeNavbarDark() {
        $navbar.removeClass('navbar-light').addClass('navbar-dark');
    }

    function makeNavbarLight() {
        $navbar.removeClass('navbar-dark').addClass('navbar-light');
    }

    function toggleNavbarClass() {
        var scrollTop = $(window).scrollTop();

        if (scrollTop > 5) {
            makeNavbarDark();
        } else {
            makeNavbarLight();
        }
    }

    toggleNavbarClass();

    $(window).on({
        'scroll': function() {
            toggleNavbarClass();
        }
    });

    $navbarCollapse.on({
        'show.bs.collapse': function() {
            makeNavbarDark();
        },
        'hidden.bs.collapse': function() {
            if ($(window).scrollTop() == 0) {
                makeNavbarLight();
            }
        }
    });

})();





var Events = (function() {
	
    var $events = $('.section_events_items');
    var $eventsItem = $('.section_events_item');
    var $eventsItemSm = $('.section_events_item_content_sm');
    var $eventsItemLg = $('.section_events_item_content_lg');

    function toggleItem(e) {
        e.closest($events).find($eventsItem).removeClass('active');
        e.closest($eventsItem).addClass('active');
    }

    $eventsItemSm.on('click', function() {
        toggleItem($(this));
    });
})();

var Newsletter = (function() {

    var $form = $('#subscribe-form');
    var $formEmail = $form.find('#email');

    function signup() {

        function isEmail(email) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
        }

        if (!isEmail($formEmail.val())) {
            $(document).trigger('alert.show', ['danger', "Please enter a valid email!"]);
        } else {
            $(document).trigger('alert.show', ['success', "Sign-up for newsletter successfully!"]);
            $form[0].reset();
        }
    }

    $form.on('submit', function(e) {
        e.preventDefault();
        signup();
		return false;
    });
})();

var Carousel = (function() {

    var $carousel = $('.section_carousel_slider');

    function init() {
        $carousel.each(function() {
            $(this).flickity({
                cellAlign: 'left',
                wrapAround: true,
                imagesLoaded: true
            });
        });
    }

    if ($carousel.length) {
        init();
    }
})();

var Gallery = (function() {

    var $gallery = $('.section_gallery_grid');
    var galleryItem = '.section_gallery_grid_item';

    function initGallery() {
        $gallery.each(function() {

            var grid = $(this).isotope({
                itemSelector: galleryItem
            });

            grid.imagesLoaded().progress(function() {
                grid.isotope('layout');
            });
        });
    };

    if ($gallery.length) {
        initGallery();
    }
})();

var Contact = (function() {

    var $form = $('#contact_form');
    var formEmail = '#contact_form_email';

    function contact() {
		
        $form.find('.is-invalid').removeClass('is-invalid');
        $form.find('.invalid-feedback').html('');
		
        var errors = new Array();

        function isEmail(email) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
        }

        function showError(elem, message) {
            $(elem).addClass('is-invalid');
            $(elem).next('.invalid-feedback').html(message);
        }

        if (!isEmail($(formEmail).val())) {
            errors[formEmail] = "Please enter valid email!";
        }

        if (Object.keys(errors).length) {
            for (let key in errors) {
                showError(key, errors[key]);
            }
        } else {
            $(document).trigger('alert.show', ['success', "Send message successfully!"]);
            $form[0].reset();
        }
    }

    $form.on('submit', function(e) {
        e.preventDefault();
        contact();
    });

})();

var CurrentDate = (function() {

    var $dateContainer = $('#js-current-year');

    function appendDate() {
        var currentYear = new Date().getFullYear();
        $dateContainer.text(currentYear);
    }

    if ($dateContainer.length) {
        appendDate();
    }

})();