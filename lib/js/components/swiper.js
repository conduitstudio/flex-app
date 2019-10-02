/* ---------------------------------- */

/* Swiper: Site Navigation */

(function($) {
	'use strict';
	$.fn.Swiper = function() {
		this.each(function() {
			let $dots;
			const $self = $(this),
				$slides = $self.find('.swiper-slide'),
				$pagination = $self.find('.swiper-pagination'),
				$triggers = $self.children('.swiper-left,.swiper-right'),
				swiper_speed = 500,

				swiper_options = {
	        slidesPerView: 'auto',
	        centeredSlides: $self.data('centered') !== undefined ? $self.data('centered') : true,
	        spaceBetween: Flex.window.width() * ( 30/1000 ),
	        slidesPerGroup: 1,
	        loop: $self.data('loop') !== undefined ? $self.data('loop') : true,
					touchEventsTarget: 'container',
					shortSwipes: false,
					longSwipesRatio: 0.1,
					longSwipesMs: 100,
					passiveListeners: false,
					noSwipingClass: 'button',

	        speed: swiper_speed,
					on: {
						init: function () {
							// Setup pagination bullets
							$slides.each( function(i) {
								$('<span class="swiper-pagination-bullet'+ (i==0?' swiper-pagination-bullet-active':'')+'"/>').appendTo( $pagination );
							});

							$dots = $pagination.find('.swiper-pagination-bullet');
						},
						slideChangeTransitionEnd: function() {
							if( $dots !== undefined && $dots.length > 0 ) {
								const $all_slides = $self.find('.swiper-slide'),
									index = $all_slides.filter('.swiper-slide-active').first().attr('data-swiper-slide-index');

								$dots.eq(index).addClass('swiper-pagination-bullet-active').siblings('.swiper-pagination-bullet-active').removeClass('swiper-pagination-bullet-active');
							}
						},
						touchEnd: function(e) {
							e.preventDefault();
							Flex.reset.start_over();
						}
					}
	      },
				swiper = new Swiper( '#' + $self[0].id, swiper_options );

			$self.data('swiper', swiper );


			// Listen for left / right triggers
			let animating_timeout = 0;
			$triggers.on('pointerdown', function(e) {
				e.preventDefault();

				// Manually disable animating
				clearTimeout( animating_timeout );
				animating_timeout = setTimeout( () => {
					swiper.animating = false;
				}, swiper_speed );

				if( swiper.animating ) return;

				const $this = $(this);
				if( $this.hasClass('swiper-left') ) {
					swiper.slidePrev( swiper_speed, true );
				} else {
					swiper.slideNext( swiper_speed, true );
				}

			}).on('click', function(e) {
				e.preventDefault();
			});

		});
		return this;
	};
}(jQuery));
