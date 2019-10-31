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
// @codekit-prepend "./lib/js/vendor/jquery.min.js"
// @codekit-prepend "./lib/js/vendor/dragdealer.min.js" quiet
// @codekit-prepend "./lib/js/vendor/mustache.min.js" quiet
// @codekit-prepend "./lib/js/vendor/swiper.min.js" quiet


/* ---------------------------------- */
/* ---------------------------------- */

/* Initialize */

let Flex = {
	version: Front.version,
	ratio: 3840/2560,
	fx_speed: 500,
	is_app: false,
	is_web: false,

	click_event: 'pointerup',
	cancel_click: false,

	document: $(document),
	window: $(window),
	body: $('body'),
	home_slideshow: $('#home-slideshow'),
	product_slideshow: $('#product-slideshow'),

	pages: {
		home: $('#home'),
	},

	// Functions
	async: function( fx ) {
		setTimeout( fx, 10 );
	},
	after_animation: function( fx ) {
		setTimeout( fx, Flex.fx_speed );
	},
	get_query_var: function( variable ) {
     var query = window.location.search.substring(1);
     var vars = query.split("&");
     for (var i=0;i<vars.length;i++) {
       var pair = vars[i].split("=");
       if(pair[0] == variable){return pair[1];}
     }
     return(false);
	},
	get_page: function() {
		return Flex.get_query_var( 'page' );
	},


	// Timeout
	reset: {
		how_long: 4 * 60 * 1000, // <= 60 * 100 = minute
		// how_long: 10 * 1000, // <= seconds (for testing)
		timeout: 0,
		start: function() {
			// Flex.reset.timeout = setTimeout( Flex.reset.do_it, Flex.reset.how_long ); // <= for testing
			if( Flex.is_app ) Flex.reset.timeout = setTimeout( Flex.reset.do_it, Flex.reset.how_long );
		},
		start_over: function() {
			// console.log('reset timeout');
			clearTimeout( Flex.reset.timeout );
			Flex.reset.start();
		},
		do_it: function() {

			// Vars
			const $last_page = $('.page.in');

			// Reset homepage swiper if still on homepage
			if( $last_page[0].id == 'home' ) {
				Flex.home_slideshow.trigger('reset-swiper', { animate: true });
				return;
			}

			// Hide nav trigger
			Flex.body.removeClass('show-nav').removeClass('active-nav');

			// Remove all modals
			$('.modal.in').removeClass('in');

			// Bring home back in
			$last_page.removeClass('in');

			// Update history so back button will work
			history.pushState( { page: 'home' }, "", "?page=home" );

			// Reset $last_page elements
			Flex.after_animation( function() {

				// If lastpage had a Swiper
				if( $last_page[0].id === 'the-collection' ) {
					Flex.product_slideshow.trigger('reset-swiper');
				}

				// Reset all videos to start
				$('video').each( function() {
					var video = $(this).get(0);
					video.pause();
					video.currentTime = 0;
				});

				// Set all sliders back to beginning
				$('[data-slider]').trigger('reset-slider');

				// Display none on last page (removing .in fades it out)
				$last_page.addClass('out');
				Flex.pages.home.removeClass('out');

				// Update Home swiper to be back at the beginning
				Flex.home_slideshow.trigger('reset-swiper');

				// Otherwise there is a jump (too much at once)
				Flex.async( function() {
					setTimeout( () => {
						Flex.pages.home.addClass('in');
					}, 400 );
				});

			});

		},
	},
	setOrientation: function() {
		setTimeout( () => { // <= async for edge fullscreen detection / or other animation
			// Set classes
			if( Flex.window.width() / Flex.window.height() >= Flex.ratio ) {
				$('#version .size-by').html('size-by-height');
				Flex.body.removeClass('size-by-width').addClass('size-by-height');
			} else {
				$('#version .size-by').html('size-by-width');
				Flex.body.removeClass('size-by-height').addClass('size-by-width');
			}

			Flex.window.trigger('orientation-set');
		}, 100 );
	},

	on_load: function() {

		// TODO: Run onload functions...
		setTimeout( () => {
			Flex.body.addClass('in');
		}, 2000 );

		// First setup window listener for all images loaded_all_images
		Flex.window.on('loaded_all_images', function() {

			// Hide loading graphic
			setTimeout( () => {

				// Loaders
				$('#loader').addClass('out').removeClass('in');

				// If we have a page, load that page in... else load home page
				if( Flex.get_page() ) {
					Flex.goto( Flex.get_page() );
				} else {
					$('#home').removeClass('out').addClass('in');
				}

				// Update after potential resize
				$('[data-swiper]').each( function() {
					const swiper = $(this).data('swiper');
					swiper.update();
				});

			}, 300 );

		});

		// Run all preloaders
		$('[data-controller="Preload"]').Preload();

	},
	run: function() { // <= on ready

		// Detect if web or app
		if ( navigator.userAgent.match( /MSAppHost/i ) ) {
			Flex.is_app = true;
		} else {
			Flex.is_web = true;
		}

		// Update version
		setTimeout( () => {
			$('#version .version-number').html( Flex.version );
		}, 500 );

		Flex.window.on('resize.orientation', Flex.setOrientation);
		Flex.setOrientation();

		// General <a> clicks should reset timeout
		$('a').on( Flex.click_event + '.flex', function() {
			Flex.reset.start_over();
		}).on('click.disable', function(e) {
			e.preventDefault();
		});

		// Load "Components"
		Flex.document.on( Flex.click_event + '.flex-goto', '[data-goto]', Flex.on_goto).on('click.flex', '[data-goto]', function(e) {e.preventDefault();e.stopPropagation();});
		Flex.document.on( Flex.click_event + '.flex-modal', '[data-openmodal]', Flex.on_openmodal).on('click.flex', '[data-openmodal]', function(e) {e.preventDefault();e.stopPropagation();});
		$('[data-controller="DynamicSize"]').DynamicSize();
		$('[data-controller="NavTrigger"]').NavTrigger();
		$('[data-slider]').Slider();
		$('[data-swiper]').Swiper();

		// Everything has init, so send out
		$('.page').not('#loader').addClass('out');

		// Listen for popstate
		Flex.window.on('popstate', function(e) {
			var page = "";
			if(e.state) {
				page = e.state.page;
			}
			Flex.goto( Flex.get_page() );
		});

		// Run on_load()
	  if (document.readyState === 'complete') {
	    Flex.on_load();
	  } else {
			Flex.window.on('load', Flex.on_load);
	  }

	}
};
$(function() {
	if( $(window).width() < 700 ) {
		$('#loader').addClass('out').removeClass('in');
		$('.mobile-browsers').show();
		return;
	}

	Flex.run();
});




console.log( 'Version: ', Flex.version );




/* ---------------------------------- */

/* Includes */

/* Components */
// @codekit-append "./lib/js/components/_components.js" quiet
