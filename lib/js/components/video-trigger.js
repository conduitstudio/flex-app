/* ---------------------------------- */

/* VideoTrigger */

(function($) {
	'use strict';
	$.fn.VideoTrigger = function() {
		this.each(function() {
			const $self = $(this);

			$self.on( 'click.flex', function(e) {
				e.preventDefault();
				console.log('play video');
				const $this = $(this),
					$video = $this.siblings('video');
					
				// Play the video
				$video[0].play();
				
				// Remember we've played this before
				$this.closest('.video').addClass('played');
				
				// Fade our play image out
				$this.addClass('out');

			});

		});
		return this;
	};
}(jQuery));
