/* ---------------------------------- */

/* DynamicSize */
console.log('load');
(function($) {
	'use strict';
	$.fn.DynamicSize = function() {
		this.each(function() {

      console.log('in');
			const $self = $(this),
        which = $self.data('which'),
        ratio = $self.data('ratio');

        console.log(which, ratio);
      if( which === 'width' ) {
        Flex.window.on('resize.dynamic-size', function() {
          $self.width( $self.height() * ratio );
        }).trigger('resize.dynamic-size');
      } else {
        Flex.window.on('resize.dynamic-size', function() {
          $self.height( $self.width() * ratio );
        }).trigger('resize.dynamic-size');
      }
		});
		return this;
	};
}(jQuery));
