/* ---------------------------------- */

/*
 * Flex
 * 2019
 *
 * application.js
 *
 */

/* JSHint */
/* globals console, jQuery, Mustache */
/* jshint loopfunc: true, curly: false, esnext: true */


/* ---------------------------------- */

/* Includes */
// @codekit-prepend "./lib/js/cordova/platformOverrides.js"
// @codekit-prepend "./lib/js/vendor/jquery.min.js"
// @codekit-prepend "./lib/js/vendor/dragdealer.min.js" quiet
// @codekit-prepend "./lib/js/vendor/mustache.min.js" quiet
// @codekit-prepend "./lib/js/vendor/swiper.min.js" quiet


/* ---------------------------------- */
/* ---------------------------------- */

/* Initialize */
let Flex = {
	version: '1.1.2',
	ratio: 3840/2560,
	fx_speed: 500,

	click_event: 'pointerup',
	cancel_click: false,

	document: $(document),
	window: $(window),
	body: $('body'),

	pages: [],
	preload: [
		'lib/img/pages/agile-studio/sprint-planning-floorplan.png',
		'lib/img/pages/agile-studio/working-in-pairs-floorplan.png',
		'lib/img/pages/agile-studio/daily-stand-up-floorplan.png',
	],

	// Functions
	async: function( fx ) {
		setTimeout( fx, 100 );
	},
	after_animation: function( fx ) {
		setTimeout( fx, Flex.fx_speed );
	},

	// Timeout
	reset: {
		how_long: 4 * 60 * 1000, // <= 60 * 100 = minute
		// how_long: 10 * 1000, // <= seconds (for testing)
		timeout: 0,
		start: function() {
			Flex.reset.timeout = setTimeout( Flex.reset.do_it, Flex.reset.how_long ); // <= 4 minutes
		},
		start_over: function() {
			// console.log('reset timeout');
			clearTimeout( Flex.reset.timeout );
			Flex.reset.start();
		},
		do_it: function() {

			// Redefined vars
			const $home = $('#home'),
				$last_page = $('.page.in').not($home);

			// Reset swiper witout animation
			$('[data-swiper]').each( function() {
				const $this = $(this),
					swiper = $this.data('swiper');

				// Go to first slide
				swiper.slideToLoop( 0, 0, false );

				// Update pagination to first slide
				$this.find('.swiper-pagination > .swiper-pagination-bullet:first-child').addClass('swiper-pagination-bullet-active')
					.siblings('.swiper-pagination-bullet-active').removeClass('swiper-pagination-bullet-active');
			});

			// If we are not already on the #home
			if( $last_page.length > 0 ) {
				$last_page.removeClass('in');

				// Hide nav trigger
				Flex.body.removeClass('show-nav').removeClass('active-nav');

				// Remove all modals
				$('.modal.in').removeClass('in');

				// Bring home back in
				$home.removeClass('out').addClass('in');

				// Update Home slider to be centeredSlide
				let home_swiper = $('#menu-slideshow').data('swiper');
				home_swiper.update();

			}

			// Reset home swiper
			Flex.after_animation( function() {

				// Reset all videos to start
				$('video').each( function() {
					var video = $(this).get(0);
					video.pause();
					video.currentTime = 0;
				});

				// Display none on last page
				$last_page.addClass('out');

				// Set slider back to beginning
				$('[data-slider]').each( function() {
					const slider = $(this).data('slider');
					slider.setValue( 0, 0, false );
				});

			});

		},
	},
	setOrientation: function() {
		setTimeout( () => { // <= async for edge fullscreen detection / or other animation

			// Set classes
			if( Flex.window.width() / Flex.window.height() >= Flex.ratio ) {
				Flex.body.removeClass('size-by-width').addClass('size-by-height');
			} else {
				Flex.body.removeClass('size-by-height').addClass('size-by-width');
			}

		}, 100 );
	},

	on_load: function() {

		// TODO: Run onload functions...
		setTimeout( () => {
			Flex.body.addClass('in');
			// $('#screen-saver').removeClass('out').addClass('in');
			// $('#home').removeClass('out').addClass('in');
		}, 2000 );

		// Preload Images
		$(Flex.preload).each(function(){
			$('<img/>')[0].src = this;
		});

		// First setup window listener for all images loaded_all_images
		Flex.window.on('loaded_all_images', function() {

			// Hide loading graphic
			setTimeout( () => {
				$('#loader').addClass('out').removeClass('in');
				$('#home').removeClass('out').addClass('in');
			}, 4000 );

		});

		// Run all preloaders
		$('[data-controller="Preload"]').Preload();

	},
	run: function() { // <= on ready

		Flex.window.on('resize.orientation', Flex.setOrientation);
		Flex.setOrientation();

		// General <a> clicks should reset timeout
		$('a').on( Flex.click_event + '.flex', function() {
			Flex.reset.start_over();
		}).on('click.disable', function(e) {
			e.preventDefault();
		});

		// "Components"
		Flex.document.on( Flex.click_event + '.flex', '[data-goto]', Flex.on_goto).on('click.flex', '[data-goto]', function(e) {e.preventDefault();});
		Flex.document.on( Flex.click_event + '.flex', '[data-openmodal]', Flex.on_openmodal).on('click.flex', '[data-openmodal]', function(e) {e.preventDefault();});
		$('[data-controller="NavTrigger"]').NavTrigger();
		$('[data-slider]').Slider();
		$('[data-swiper]').Swiper();

		// Everything has init, so send out
		$('.page').not('#loader').addClass('out');


		// Run on_load()
	  if (document.readyState === 'complete') {
	    Flex.on_load();
	  } else {
	    window.addEventListener("load", Flex.on_load);
	  }

	}
};
console.log( 'Version: ', Flex.version );




/* ---------------------------------- */

/* Includes */

/* Components */
// @codekit-append "./lib/js/components/_components.js" quiet


// Trigger web if no app
// @codekit-append "./lib/js/cordova/trigger.js"
