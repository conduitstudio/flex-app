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
        $reveals = $stage.find('.stage-reveal:not(:first-child)'); // <= first child is always full width

			// Lets
			let after_anim_timeout = 0;

      // Make sure we have a stage
      if( $stage.length == 0 ) console.warn( 'Cannot find stage for ' + $self.closest('section').attr('id') );

			$self.closest('.slider').addClass('points-' + ( $reveals.length+1 ) );


      // Add dragslider
      const slider = new Dragdealer( $self[0], {
        tapping: false, // <= disallow clicking on the bar to progress it just a bit
				speed: 0.3,
        animationCallback: function(x, y) {

          const percent = x,
            divided_by = 1/$reveals.length,
						active_reveal_index = Math.floor( percent/divided_by ),
            $active_reveal = $reveals.eq( active_reveal_index );

          let reveal_width_perc = Math.round( ( (percent%divided_by) / divided_by ) * 1000 ) / 1000,
						in_process = true;

          // TODO: Round to 0 or 100
          if( reveal_width_perc > .995 ) reveal_width_perc = 1;
          if( reveal_width_perc < .005 ) reveal_width_perc = 0;
					if( reveal_width_perc === 0 || reveal_width_perc === 1 ) in_process = false;

          // Percentage must be divided by 4 since we have 4 images to know what image we are on
          $active_reveal.width( reveal_width_perc * 100 + '%' );

					if( in_process ) {
						$active_reveal.addClass('in-process');
					} else {
						$active_reveal.removeClass('in-process');
					}


          // Ensure done at ends (steps)
					$reveals.each( function( i ) {
						const point_perc = divided_by * (i+1);
	          if( x > point_perc ) $reveals.eq(i).width('100%').removeClass('in-process');
						if( x <= divided_by ) $reveals.eq(i+1).width('0%').removeClass('in-process');
					});


					// Check if full after a millisecond
					clearTimeout( after_anim_timeout );
					after_anim_timeout = setTimeout( () => {
						const value = this.getValue();
						if( value[0] === 1 ) {
							const $active_reveal = $reveals.last();
							$active_reveal.removeClass('in-process').width( '100%' );
						}
					}, 100 );

        },
			  requestAnimationFrame: true,
        dragStopCallback: function(x,y) {
					Flex.reset.start_over();

					const value = this.getValue();
					if( value[0] !== 1 ) {
	          this.setValue( (Math.round(x * $reveals.length) / $reveals.length).toFixed(3), y, false );
					} else {
						// Note this also runs in animation timeout above
						const $active_reveal = $reveals.last();
						$active_reveal.removeClass('in-process').width( '100%' );
					}
        }
      });

			$self.data('slider', slider );

			// Slider-jumps
			$self.siblings('.slider-jumps').find('a').on( Flex.click_event + '.flex', function(e) {
				e.preventDefault();

				const x = Math.round( $(this).data('sliderjump') / $reveals.length * 1000 ) / 1000;
        slider.setValue( x, 0, false );
			});

		});
		return this;
	};
}(jQuery));
