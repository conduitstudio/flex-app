// Run as function so we can run on document click (swiper clones goto links)
Flex.on_goto = function(e) {
	alert('on_goto 1 { Flex.cancel_click: ' + Flex.cancel_click + '}')
	e.preventDefault();
	e.stopPropagation();

	const $self = $(this),
		page_slug = $self.data('goto'),
		$next_page = $('#' + page_slug ),
		next_page_obj = $next_page.data('data'),
		$pages = $('.page'),
		$last_page = $pages.filter('.in').first();

	// If $next_page doesn't exist, consider it the dashboard
	if ( page_slug === 0 ) {

		Flex.reset.do_it();
		return;

  } else if ($next_page.length === 0 ) {

		console.warn('No next_page found');
		return;

	} else if( Flex.cancel_click ) {

		console.log('cancel click');
		return false;

	}


	// Flex.e.removeclass('in');
	//
	// return;


	// Always pause video
	if( $('#screen-saver').length > 0 && $('#screen-saver').find('video').length > 0 ) {
		$('#screen-saver').find('video')[0].pause();
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


};
