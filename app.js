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
	version: '0.3',
	ratio: 3840/2560,
	fx_speed: 500,

	document: $(document),
	window: $(window),
	body: $('body'),

	pages: [],
	preload: [],

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
			const $last_page = $('.page.in'),
				$screen_saver = $('#screen-saver'),
				$screen_saver_video = $screen_saver.find('video').first();

			// Fade out last page to reveal screensaver
			$last_page.removeClass('in');

			// Hide nav trigger
			Flex.body.removeClass('show-nav').removeClass('active-nav');

			// Set slider back to beginning
			$('[data-slider]').each( function() {
				const slider = $(this).data('slider');
				slider.setValue( 0, 0, false );
			});

			// Reset all videos
			$('.video.played').removeClass('played');
			$('.video-trigger.out').removeClass('out');

			// Remove all modals
			$('.modal.in').removeClass('in');

			// Reset home swiper
			Flex.after_animation( function() {

				// Display none on last page
				$last_page.addClass('out');

				// Ready screensaver
				$screen_saver.removeClass('out');
				Flex.async( function() {
					$screen_saver.addClass('in');

					// Cleanup after screen saver is in
					Flex.after_animation( function() {

						// Play the screensaver video and show it
						$screen_saver_video[0].play();

						$('[data-swiper]').each( function() {
							const $this = $(this),
								swiper = $this.data('swiper');
							swiper.slideToLoop( 0, 0, false );

							$this.find('.swiper-pagination > .swiper-pagination-bullet:first-child').addClass('swiper-pagination-bullet-active')
								.siblings('.swiper-pagination-bullet-active').removeClass('swiper-pagination-bullet-active');
						});
					});
				});
			});

		},
	},
	setOrientation: function() {

		// Set classes
		if( Flex.window.width() / Flex.window.height() >= Flex.ratio ) {
			Flex.body.removeClass('size-by-width').addClass('size-by-height');
		} else {
			Flex.body.removeClass('size-by-height').addClass('size-by-width');
		}

	},



	on_load: function() {

		// TODO: Run onload functions...
		setTimeout( () => {
			Flex.body.addClass('in');
			$('#screen-saver').removeClass('out').addClass('in');
		}, 2000 );

		// Preload Images
		$(Flex.preload).each(function(){
			$('<img/>')[0].src = this;
		});

	},
	run: function() { // <= on ready

		Flex.window.on('resize.orientation', Flex.setOrientation);
		Flex.setOrientation();

		// General <a> clicks should reset timeout
		$('a').on('click.flex', function() {
			Flex.reset.start_over();
		});

		// "Components"
		Flex.document.on( 'click.flex', '[data-goto]', Flex.on_goto);
		Flex.document.on( 'click.flex', '[data-openmodal]', Flex.on_openmodal);
		$('[data-controller="NavTrigger"]').NavTrigger();
		$('[data-slider]').Slider();
		$('[data-swiper]').Swiper();
		$('[data-videotrigger]').VideoTrigger();

		// Everything has init, so send out
		$('.page').addClass('out');


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
