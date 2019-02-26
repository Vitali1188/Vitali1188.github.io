;(function() {
  "use strict";

  $('.hamburger_mnu').on('click', activeMnu);
  



  function activeMnu(event) {
      $('.hamburger_mnu').toggleClass('active');
      $('.header_mnu').toggleClass('active');
  } 

})();