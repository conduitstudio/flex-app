
(function () {
  "use strict";

  function onDeviceReady() {
    console.log('on device ready');
    // Handle the Cordova pause and resume events
    Flex.run();
  }
  document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

  try{
    if( window.cordova === undefined ) {
      Flex.is_web = true;
      jQuery(function ($) {
        Flex.run($);
      });
    } else {
      Flex.is_app = true;
    }
  }catch(err) {
    console.log(err);
  }

} )();
