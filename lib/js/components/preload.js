/* ---------------------------------- */

/* Preload */
console.log('run preload.js');
(function($) {
	'use strict';

	$.fn.Preload = function() {
    let loaded = [],
			total_preloads = this.length;
		this.each(function(i) {
			const $self = $(this),
        src = $self.data('src');

      // Wait / async
      setTimeout( () => {

        // Listen for this loaded
        $self.on('load', function() {
          loaded.push( src );
					if( loaded.length === total_preloads ) {
						Flex.window.trigger('loaded_all_images');
					}
        }).attr('src', src );

      }, 1000 );

		});
		return this;
	};
}(jQuery));
