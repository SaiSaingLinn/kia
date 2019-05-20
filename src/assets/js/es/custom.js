"use strict";

// console.log("hello world");
$(document).ready(function () {
  // $('.btn-search-icon').click(function(){
  //   var searchwidth=$('.searchright').width()===Number('28')? '100%':'60px';
  //   $('.searchright').animate({ width:searchwidth});
  // });
  // $('.kia-model').mouseover(function(){
  //   $('.car-model-list').show();}).mouseout(function(){$('.car-model-list').hide();})
  // $('.search-form').hide();
  $('.btn-search-icon').click(function () {
    $('.search-form').fadeIn();
  });
  $('.close, main').click(function () {
    $('.search-form').fadeOut();
  }); // promotion pages

  $('.nav-tabs a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
    var target = $(this).attr('href'); // console.log(target);

    setTimeout(function () {
      $("".concat(target, " .single-item")).slick({
        arrows: false,
        autoplay: true,
        autoplaySpeed: Number('2000')
      });
    }, Number('200'));
  });
  $('#home .single-item').slick({
    arrows: false,
    autoplay: true,
    autoplaySpeed: Number('2000')
  }); // car selectors

  var model = $('.model-wrapper .models li button');
  var modelContent = $('.selector .category .stage');
  var modelColor = $('.swatches-color .swatches-button img');
  var modelCarColor = $('.stage-content-image .stage-vehicle img');
  model.click(function () {
    var selectModel = $(this).data('model');
    $(this).addClass('active');
    $('.model-wrapper .models li button').not(this).removeClass('active');
    modelContent.each(function () {
      var selectContent = $(this).data('content');

      if (selectContent === selectModel) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });
  }); // change car Color

  modelColor.click(function () {
    var selectColor = $(this).data('color');
    $(this).addClass('active');
    $('.swatches-color .swatches-button img').not(this).removeClass('active');
    modelCarColor.each(function () {
      var selectCarColor = $(this).data('carcolor');

      if (selectCarColor === selectColor) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });
  });
}); // ----------- Begin JS for Kia main page ----------//

$('.header-slider').slick({
  dots: false,
  infinite: true,
  autoplay: true,
  speed: 1000,
  fade: true,
  cssEase: 'linear'
});
$('.popular-car-list').slick({
  dots: false,
  infinite: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [{
    breakpoint: 1200,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3
    }
  }, {
    breakpoint: 992,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2
    }
  }, {
    breakpoint: 510,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }]
});
$('.promotion-slider').slick({
  centerMode: true,
  centerPadding: '20%',
  slidesToShow: 1,
  responsive: [{
    breakpoint: 600,
    settings: {
      centerPadding: '0',
      slidesToShow: 1
    }
  }]
}); // ----------- End JS for Kia main page -------------//
// ------------Begin JS for Trade-in detail ----------//

$('.spare-part').slick({
  dots: false,
  infinite: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 1
}); // -------------Begin JS for Tradein Upload page------------//

$(window).scroll(function () {
  if ($(this).scrollTop() >= Number('50')) {
    $('.return-to-top').fadeIn(Number('200'));
  } else {
    $('.return-to-top').fadeOut(Number('200'));
  }
});
$('.return-to-top').click(function () {
  $('body,html').animate({
    scrollTop: 0
  }, Number('500'));
}); // -------------End JS for Tradein Upload page------------//

var wow = new WOW({
  boxClass: 'wow',
  // animated element css class (default is wow)
  animateClass: 'animated',
  // animation css class (default is animated)
  offset: 0,
  // distance to the element when triggering the animation (default is 0)
  mobile: true,
  // trigger animations on mobile devices (default is true)
  live: true,
  // act on asynchronously loaded content (default is true)
  callback: function callback(box) {// the callback is fired every time an animation is started
    // the argument that is passed in is the DOM node being animated
  },
  scrollContainer: null // optional scroll container selector, otherwise use window

});
wow.init();