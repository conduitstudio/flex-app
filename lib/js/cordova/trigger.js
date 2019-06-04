
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
      jQuery(function ($) {
        Flex.run($);
      });
    }
  }catch(err) {
    console.log(err);
  }

} )();
