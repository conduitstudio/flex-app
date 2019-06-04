/* ---------------------------------- */

/* NavTrigger */

(function($) {
	'use strict';
	$.fn.NavTrigger = function() {
		this.each(function() {
			const $self = $(this);

			// console.log(Flex.pages);
			$self.on( 'click.flex', function(e) {
				e.preventDefault();

        Flex.body.toggleClass('active-nav');

			});

			// Global close
			$(document).on('click.flex', Flex.body, function(e) {
				const $body = Flex.body,
					$target = $(e.target);
				
				if( $body.hasClass('active-nav') &&
					$target.closest('.nav-trigger').length === 0 && 
					$target.closest('nav').length === 0 ) {
					e.preventDefault();
					$body.removeClass('active-nav');
				}
			});

		});
		return this;
	};
}(jQuery));
