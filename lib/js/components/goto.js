// Run as function so we can run on document click (swiper clones goto links)
Flex.on_goto = function(e) {

	// console.log(Flex.pages);
	const $self = $(this),
		page_slug = $self.data('goto'),
		$next_page = $('#' + page_slug ),
		next_page_obj = $next_page.data('data'),
		$pages = $('.page'),
		$last_page = $pages.filter('.in').first(),
		$screen_saver = $('#screen-saver'),
		$screen_saver_video = $screen_saver.find('video').first();

	e.preventDefault();

	// If $next_page doesn't exist, consider it the dashboard
	if ( page_slug === 0 ) {

		Flex.reset.do_it();
		return;

  } else if ($next_page.length === 0 ) {

		console.warn('No next_page found');
		return;

	}


	// Flex.e.removeclass('in');
	//
	// return;

	// Always pause video
	$screen_saver_video[0].pause();

	// Activate for use
 	$next_page.removeClass('out');

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

		// Set slider back to beginning
		$last_page.find('[data-swiper-reset-everytime]').each( function() {
			const $this = $(this),
				swiper = $this.data('swiper');
			swiper.slideToLoop( 0, 0, false );

			$this.find('.swiper-pagination > .swiper-pagination-bullet:first-child').addClass('swiper-pagination-bullet-active')
				.siblings('.swiper-pagination-bullet-active').removeClass('swiper-pagination-bullet-active');
		});

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
			Flex.async( function() {
				$next_page.addClass('in');
			});
		});

	});


};
