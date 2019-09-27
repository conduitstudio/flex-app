// Run as function so we can run on document click (swiper clones goto links)
Flex.on_goto = function(e) {
	e.preventDefault();
	e.stopPropagation();

	page_slug = $(this).data('goto');

	// Update history so back button will work
	history.pushState( { page: page_slug }, "Flex - title 1", "?page=" + page_slug );

	Flex.goto( page_slug );
};


Flex.goto = function( page_slug ) {

	// Other vars
	const	$next_page = $('#' + page_slug ),
		next_page_obj = $next_page.data('data'),
		$pages = $('.page'),
		$last_page = $pages.filter('.in').first();


	// Always pause screensaver video
	const $screen_saver = $('#screen-saver');
	if( $screen_saver.length > 0 && $screen_saver.find('video').length > 0 ) {
		$screen_saver.find('video')[0].pause();
	}

	// Close modals
	$('.modal.in').removeClass('in');

	// Close active nav NOTE: Want to do this in sync with page
	Flex.body.removeClass('active-nav');

	// Display none for out pages (in order to be block level)
	$last_page.removeClass('in');
	Flex.after_animation( function() {

		// Show the nav
		if( $next_page.data('navitem') ) {
			Flex.body.addClass('show-nav');

			// Activate the correct nav item
			$('nav .' + $next_page.data('navitem') ).addClass('active').siblings().removeClass('active');
		} else {
			Flex.body.removeClass('show-nav');
			$('nav li.in').removeClass('in');
		}

		// Make display none
		$last_page.addClass('out');

		/*
		 * Show new page
		 */
		$next_page.removeClass('out');

		Flex.async( function() {

			// Odd resize bugs when display none on old pages
			// Flex.window.trigger('resize');
			var event = document.createEvent('HTMLEvents');
			event.initEvent('resize', true, false);
			window.dispatchEvent(event);

			// Fade image in
			setTimeout( function() {
				$next_page.addClass('in');
			}, 400 );

		});

	});

}
