;(function(){
  $('.header_slick-slider').slick({
    dots: true,
    speed: 1000,
    // autoplay: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  });

  $('.gallery_slick-slider').slick({
    centerMode: true,
    slidesToShow: 3,
    speed: 1000,
    // autoplay: true,
    responsive: [
      {
        breakpoint: 1201,
        settings: {
          centerMode: false,
        }
      },
      {
        breakpoint: 993,
        settings: {
          slidesToShow: 2,
          centerMode: false,
        }
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          arrows: false
        }
      }
    ]
  });

  $('.popup').magnificPopup({
    type: 'inline',
    preloader: false,
    focus: '#name',
    mainClass: 'mfp-fade',
    removalDelay: 300,
    zoom: {
      enabled: true,
      duration: 300
    },
    callbacks: {
      beforeOpen: function() {
        if($(window).width() < 700) {
          this.st.focus = false;
        } else {
          this.st.focus = '#name';
        }
      }
    }
  });


  // поддержка SVG в ебаном IE11
  svg4everybody();
})();