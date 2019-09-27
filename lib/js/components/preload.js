/* ---------------------------------- */

/* Preload */

(function($) {
	'use strict';

	$.fn.Preload = function() {
    let loaded = [],
			total_preloads = this.length;

		this.each(function(i) {
			const $self = $(this);
      let src = '';

			// Set src
			if( Flex.is_web && $self.data('src-web') !== undefined) {
				src = $self.data('src-web');
			} else if( Flex.is_app && $self.data('src-app') !== undefined) {
				src = $self.data('src-app');
			} else if( $self.data('src') !== undefined ) { // <= no different image for app / web 
				src = $self.data('src');
			} else {
				total_preloads--;
				console.warn( 'Fail: ', $self[0]);
				return;
			}

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
