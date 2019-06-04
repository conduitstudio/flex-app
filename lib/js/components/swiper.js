/* ---------------------------------- */

/* Swiper: Site Navigation */

(function($) {
	'use strict';
	$.fn.Swiper = function() {
		this.each(function() {
			const $self = $(this),
				swiper_options = {
	        slidesPerView: 'auto',
	        centeredSlides: $self.data('centered') !== undefined ? $self.data('centered') : true,
	        spaceBetween: Flex.window.width() * ( 30/1000 ),
	        slidesPerGroup: 1,
	        loop: $self.data('loop') !== undefined ? $self.data('loop') : true,
					// loop: false,
	        // loopedSlides: $self.data('loopedSlides') !== undefined ? $self.data('loopedSlides') : 2,
					shortSwipes: false,
					longSwipesRatio: 0.1,
					longSwipesMs: 50,
	        speed: 500,
		      navigation: {
		        nextEl: '.swiper-button-next',
		        prevEl: '.swiper-button-prev',
		      },
					on: {
						touchStart: function() {
							Flex.reset.start_over();
						},
						touchEnd: function() {
							Flex.reset.start_over();
						}
					}
	      },
				swiper = new Swiper( '#' + $self[0].id, swiper_options );

			$self.data('swiper', swiper );

		});
		return this;
	};
}(jQuery));
