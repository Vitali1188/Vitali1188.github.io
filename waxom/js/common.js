;(function() {
  $(document).ready(function() {
    $('.header_slider').slick({
      slidesToShow: 1,
      speed:1500,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      dots: true,
      arrows: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false
          }
        }
      ]
    });

    $('.recent_posts .posts_slider').slick({
      slidesToShow: 3,
      speed:1500,
      slidesToScroll: 3,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: true,
      responsive: [
    {
      breakpoint: 993,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
          breakpoint: 768,
          settings: {
            arrows: false,
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
    {
      breakpoint: 577,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      }
    }
  ]
    });
  });




// замена картинки
  $(window).on('load resize', function() {
    if ($(window).width() <= '480')
        $('.w-wp_realization_img').attr('src', 'img/browser-center.jpg');
      else
        $('.w-wp_realization_img').attr('src', 'img/browsers.png');
  });




  $(document).on('scroll reload', function() {


    function togg() { $('.header_top_box').toggleClass('header_top_box_fixed');}

    var scrollTop = $('html').scrollTop() > $('body').scrollTop() ? $('html').scrollTop() : $('body').scrollTop();

    if(scrollTop > 1 && !$('.header_top_box').is('.header_top_box_fixed'))
      togg()
    else if(scrollTop < 1&& $('.header_top_box').is('.header_top_box_fixed') )
      togg()

  });

  var flagHamburger = true;

  $('.hamburger').on('click', function() { 

    if(!flagHamburger) return;
    flagHamburger = false;
    setTimeout(function() {flagHamburger = true;}, 800);

    $('.hamburger_inner').toggleClass('is_active');

    if($('.header_mnu').is('.is__active')){
      setTimeout(function() {
        $('.header_mnu').toggleClass('bgc_mnu'); 

        setTimeout(function() {$('.header_mnu').toggleClass('is__active'); }, 400);

      }, 400);
     
    } else{
      $('.header_mnu').toggleClass('is__active');
      setTimeout(function() {$('.header_mnu').toggleClass('bgc_mnu');}, 5)
    }

// slides li mnu

    let count = 0;

    $('.header_mnu li').each(function(index,celem) {
      setTimeout(function() {
        celem.classList.toggle('is_active_li')
      }, count += 40)
    });

  });


  // paralax header

  $(document).on('scroll', function() {
    $('header .item_slider_bg').each(function(index, element) {
      element.style.backgroundPosition = 'center ' + Math.round($('html').scrollTop() / 2) + 'px';
    })
  });


  $(window).on('scroll', function() {
    $('.counts .item .count').each(function(index, element) {

      if(element.getBoundingClientRect().bottom >= 10){
        var count = element.getAttribute('data-idest');

        var a = +element.innerText;
        setInterval(function() {
        if(a < count)
          element.innerText = ( a += 1);
        },5)
      }
    
  })
})

// поддержка SVG в ебаном IE11
  svg4everybody();

  $(document).ready(function(){
    var player = new Plyr($('#player'));

    
    $('.presentation .play').on('click', function() {player.play()});

    player.on('pause', active);
    player.on('play', active);

    function active() {
      $('.presentation .play').toggleClass('active');
      $('.presentation .overlay').toggleClass('active_overlay');
      $('.presentation .title').toggleClass('active');
      $('.presentation p').toggleClass('active');
}
});

})();
