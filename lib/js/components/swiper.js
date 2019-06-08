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
					shortSwipes: false,
					longSwipesRatio: 0.1,
					longSwipesMs: 50,
		      // pagination: { // <= using custom because "loop" option breaks it
		      //   el: '.swiper-pagination',
		      // },
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


			// Listen for left / right triggers
			$triggers.on('pointerdown', function(e) {
				e.preventDefault();

				const $this = $(this);
				let index = swiper.realIndex;
				if( $this.hasClass('swiper-left') ) {
					swiper.slidePrev( swiper_speed );
					// index = index === 0 ? $slides.length - 1 : index-1;
				} else {
					// index = index === $slides.length - 1 ? 0 : index+1;
					swiper.slideNext( swiper_speed );
				}


				console.log('touched',$(e.currentTarget).attr('class') );
				console.log(swiper.realIndex);
				// console.log(swiper.realIndex + ' | ' + swiper.previousIndex);
				//
				// swiper.slideToLoop( index, swiper_speed, false );

			}).on('click', function(e) {
				e.preventDefault();
			});

		});
		return this;
	};
}(jQuery));
