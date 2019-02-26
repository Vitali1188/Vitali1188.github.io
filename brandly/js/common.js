;(function() {

  var config = {
    arrows: false,
    dots: true,
    autoplay: true,
    speed: 1000,
  };

  $('.header_slick-slider').slick(config);
  $('.treanding_slick-slider').slick(config);
  $('.blog_slick-slider').slick({
    slidesToShow: 2,
    slidesToScroll: 2,
    dots: true,
    arrows: false,
    speed: 1000,
    autoplay: true,
    responsive: [
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    }]
  });

  // HAMBURGER

  $('.hamburger_btn').on('click', function() {
    $('.header_nav').toggleClass('active');
    $('.hamburger_btn').toggleClass('active');
  });


})();