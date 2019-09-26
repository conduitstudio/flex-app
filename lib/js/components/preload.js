/* ---------------------------------- */

/* Preload */

(function($) {
	'use strict';

	$.fn.Preload = function() {
    let loaded = [],
			total_preloads = this.length;

		this.each(function(i) {
<<<<<<< HEAD
			const $self = $(this);
      let src = '';

			// Set src
			if( Flex.is_web && $self.data('srcweb') !== undefined) {
				src = $self.data('src-web');
			} else if( Flex.is_app && $self.data('srcapp') !== undefined) {
				src = $self.data('src-app');
			} else if( $self.data('src') !== undefined ) {
				src = $self.data('src');
			} else {
				total_preloads--;
				console.warn( 'Fail: ', $self[0]);
				return;
			}
=======
			const $self = $(this),
        src = Flex.is_web ? $self.data('src-web') : ( $self.data('src-app') !== undefined ? $self.data('src-app') : $self.data('src') );
>>>>>>> 376e1656ece7e3137d254c7302189f1326e57713

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
