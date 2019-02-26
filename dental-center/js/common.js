  'use strict';
  $( document ).ready( function() {

      // header navigation****************************************    

    $( document ).on( 'scroll reload', function() {

      if( $( window ).width() <= 768 ) return;

      var mt = 38, lt = 15;
      if( $( window ).width() <= 992 ) {
        mt = 110;
        lt = 83;
      }


      if( $( window ).scrollTop() > $( '.header_top_panel' ).height() + mt && !$( '.header_container' ).is( '.header_container_fixed_top' )){
        $( '.header_container' ).toggleClass( 'header_container_fixed_top' );
        $( '.block_after_header_js' ).css( {marginTop : $( '.header_container' ).height() + lt + 'px'} );
      }
      else if( $( window ).scrollTop() < $( '.header_top_panel' ).height() + mt && $( '.header_container' ).is( '.header_container_fixed_top' ) ){
        $( '.header_container' ).toggleClass( 'header_container_fixed_top' );
        $( '.block_after_header_js' ).css( {marginTop : 0} );
      }

    });

    // slick*******************************************

    var slickConf = {
      dots: false,
      infinite: true,
      speed: 500,
      fade: true,
      autoplay: true,
      cssEase: 'linear'
    }

    $( '.slider_slick-slider' ).slick( slickConf );


    // magnific*************************************

    var magnificConf = {
      type: 'inline',
      removalDelay: 300,
      mainClass: 'mfp-zoom-in'
    }

    $( '.make_an_appointment' ).magnificPopup( magnificConf );


    var userData = $( '.user_data_txt' );
    
    userData.each( function( index ) {
      this.addEventListener( 'blur', function( event ) {
        if( this.value )
          this.classList.add( 'content' );
        else 
          this.classList.remove( 'content' );
      } )
    } );




    // button scroll to top *******************************************

    $("#back-top").hide();

    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 300) {
                $('#back-top').fadeIn();
            } else {
                $('#back-top').fadeOut();
            }
        });
 
        // scroll body to 0px on click
        $('#back-top a').click(function () {
            $('body, html').animate({
                scrollTop: 0
            }, 500);
            return false;
        });
    });











// scroll to anchor***********************************************

    $(".entry_comments_scroll_to").on("click", function(e){
      console.log( $(".entry_comments_scroll_to"))
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top
        }, 777);
        e.preventDefault();
        return false;
    });








    // mobile menu***********************************************



    if (!Element.prototype.matches) {

      Element.prototype.matches = Element.prototype.matchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector;

    }

    addEventListener( 'click', function( event ) {
      if( event.target.matches( '.item_inner_mnu_btn' ) ) {
        var parent = event.target.parentNode;
          parent.classList.toggle('active_item');
          event.target.classList.toggle('active');
      }

      if( event.target.matches('.hamburger_btn_2') || event.target.matches('.hamburger_inner') ) {
        $('.hamburger_btn_2').toggleClass('active');
        $('.main_menu').toggleClass('active');
      }

    });








  } );
