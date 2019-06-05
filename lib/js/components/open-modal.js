// Run as function so we can run on document click (swiper clones these links)
Flex.on_openmodal = function(e) {
  e.preventDefault();

	const $self = $(this),
    $modal = $('#' + $self.data('openmodal') ),
    $close = $self.find('.close-modal');

  $modal.addClass('in');

	// Play video if it exists
	if( $modal.find('.video').length > 0 ) {
		$modal.find('video')[0].play();
	}

	// Global close
	Flex.document.on('click.modal-close', Flex.body, function(e) {

    const $target = $(e.target);

		if( ! $target.parent().hasClass('holder') &&
      $target.parent('[data-openmodal]').length === 0 ) {

			e.preventDefault();
      $modal.removeClass('in');

			if( $modal.find('video').length > 0 ) {
				$modal.find('video')[0].pause();
			}

			// Reset timer
			Flex.reset.start_over();


			// Remove listener
			Flex.document.off('click.modal-close');

		}
	});

}
