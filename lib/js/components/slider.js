/* ---------------------------------- */

/* Slider */

(function($) {
	'use strict';
	$.fn.Slider = function() {
		this.each(function() {
			const $self = $(this),
				$page = $self.closest('section'),
        $stage = $page.find('.stage'),
        $handle = $self.find('.handle'),
				$all_reveals = $stage.find('.stage-reveal'),
        $reveals = $stage.find('.stage-reveal:not(:first-child)'); // <= first child is always full width

			// Lets
			let after_anim_timeout = 0;

      // Make sure we have a stage
      if( $stage.length == 0 ) console.warn( 'Cannot find stage for ' + $self.closest('section').attr('id') );

			$self.closest('.slider').addClass('points-' + ( $all_reveals.length ) );

      // Add dragslider
			const divided_by = Math.round( (1/$reveals.length) * 1000 ) / 1000,
				threshold = 0.004; // <= within 1%, call it good
      const slider = new Dragdealer( $self[0], {
        tapping: false, // <= disallow clicking on the bar to progress it just a bit
				speed: 0.2,
				xPrecision: 1000,
      	animationCallback: function(x, y) {

					// This is on a drag so we want to track the position
          const percent = x;
					let active_reveal_index = Math.floor( percent/divided_by ),
						$active_reveal = $reveals.eq( active_reveal_index );

					// Ensure prev and next widths / .in-process
					$active_reveal.prevAll().width('100%').removeClass('in-process');
					$active_reveal.nextAll().width(0).removeClass('in-process');

					// Deal with current reveal
          // let reveal_width_perc = Math.round( ( (percent%divided_by) / divided_by ) * 100 ) / 100,
          let reveal_width_perc = Math.round( ( (percent%divided_by) / divided_by ) * 1000 ) / 1000,
						in_process = x !== 1;

          // Round to 0 or 100 threshold of .005
          if( reveal_width_perc < threshold ) reveal_width_perc = 0;
          if( reveal_width_perc > 1-threshold ) reveal_width_perc = 1;
					if( reveal_width_perc === 0 || reveal_width_perc === 1 ) in_process = false;

          // Percentage must be divided by 4 since we have 4 images to know what image we are on
          $active_reveal.width( reveal_width_perc * 100 + '%' );

					if( in_process ) {
						$active_reveal.addClass('in-process');
					} else {
						$reveals.removeClass('in-process');
					}

					// Check if full after a millisecond
					// clearTimeout( after_anim_timeout );
					// after_anim_timeout = setTimeout( () => {
					// 	console.log('animation complete');
					// 	const x_y = this.getValue();
					// 	const x = x_y[0];
					// 	console.log(x);
					//
					// 	//
					// 	// // Ensure done at ends (steps)
					// 	// $reveals.each( function( i ) {
					// 	// 	const point_perc = divided_by * (i+1);
					// 	// 	if( x >= point_perc ) $reveals.eq(i).width('100%').removeClass('in-process');
					// 	// 	if( x <= divided_by ) $reveals.eq(i+1).width('0%').removeClass('in-process');
					// 	// });
					// }, 100 );

        },
			  requestAnimationFrame: true,
        dragStopCallback: function(x,y) {
					Flex.reset.start_over();

					const new_x = (Math.round(x * $reveals.length) / $reveals.length).toFixed(3);
					this.setValue( new_x, y, false );

					// Note this also runs in animation timeout above
					// const $active_reveal = $reveals.last();
					// $active_reveal.removeClass('in-process').width( '100%' );
        }
      });

			$self.data('slider', slider );

			// Slider-jumps
			$self.siblings('.slider-jumps').find('a').on( Flex.click_event + '.flex', function(e) {
				e.preventDefault();

				// Slide our slider to the next position
				const active_reveal_index = $(this).data('sliderjump'),
					new_x = ( active_reveal_index / $reveals.length ).toFixed(3);

				console.log(new_x);
        slider.setValue( new_x, 0, false );

				// // Turn on reveal CSS animations
				// $stage.addClass('animate');
				//
				// // First remove width attr
				// $reveals.removeAttr('style');
				//
				// // if it's the first item (not in $reveals)
				// const $active_reveal = $all_reveals.eq( active_reveal_index ); // <= +1 because 1st one is not in $reveals (always is .in)
				//
				// // Set the width of our next reveal.
				// $active_reveal.prevAll().addClass('in');
				// $active_reveal.addClass('in').nextAll().removeClass('in');
				// $active_reveal.addClass('in-process');
				//
				//
				// Flex.after_animation( function() {
				// 	$stage.removeClass('animate');
				// 	$active_reveal.removeClass('in-process');
				// });
			});

			// Listen for Reset
			$self.on('reset-slider', function() {
				slider.setValue( 0, 0, false );
			});

		});
		return this;
	};
}(jQuery));
