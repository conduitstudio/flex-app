/* ---------------------------------- */

/* DynamicSize */

(function($) {
	'use strict';
	$.fn.DynamicSize = function() {
		this.each(function() {

			const $self = $(this),
        ratio = $self.data('ratio');

			Flex.window.on('orientation-set.dynamic-size', function() {

	      if( Flex.body.hasClass('size-by-width') ) {
					$self.removeAttr('style').height( $self.width() / ratio );
	      } else if( Flex.body.hasClass('size-by-height') ) {
					$self.removeAttr('style').width( $self.height() * ratio );
				}

			});

		});
		return this;
	};
}(jQuery));
