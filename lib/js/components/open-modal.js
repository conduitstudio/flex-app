// Run as function so we can run on document click (swiper clones these links)
Flex.on_openmodal = function(e) {
	// alert('on_openmodal 1')
  // e.preventDefault();
	// e.stopPropagation();

  // If disable clicks (i.e. touching to swipe)
  // if( Flex.cancel_click ) {
  //   console.log('cancel click');
  //   return false;
  // }

	const $modal = $('#' + $(this).data('openmodal') );
  $modal.addClass('in');

	// Play video if it exists
	if( $modal.find('video').length > 0 ) {
		$modal.find('video')[0].play();
	}

  // Wait for fully open to allow to be closed
  setTimeout( () => {
    $modal.addClass('allow-close');
  }, 500 );

	// Global close
	Flex.document.on( Flex.click_event + '.modal-close', Flex.body, function(e) {

    // Looks buggy in APP when opening then quickly closing. So we want to wait until
    //  its fully open before allowing closure clicks.
    if( ! $modal.hasClass('allow-close') ) return false;

    const $target = $(e.target);

		if( ! $target.parent().hasClass('holder') && $target.parent('[data-openmodal]').length === 0 ) {

			e.preventDefault();

      $modal.removeClass('in allow-close');

			if( $modal.find('video').length > 0 ) {
				$modal.find('video')[0].pause();
			}

			// Reset timer
			Flex.reset.start_over();

			// Remove listener
			Flex.document.off( Flex.click_event + '.modal-close');

		}
	});

}
