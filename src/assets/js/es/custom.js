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
  }); // test form date datepicker

  $('.datepicker').datepicker({
    startDate: 'defaultDate',
    container: '#datepicker'
  });
  $('.datepicker:focus').parent();
  $('.phone').on('keypress keyup blur', function () {
    $(this).val($(this).val().replace(/[^\d].+/, ''));

    if (event.which < Number('48') || event.which > Number('57')) {
      event.preventDefault();
    }
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
wow.init(); // test drive

function scrollDown() {
  $('html, body').animate({
    scrollTop: $('div.test-form-wrap').offset().top - Number('200')
  }, Number('1000'));
}

function checkSelected(data, target) {
  for (var i = 0; i < data.length; i++) {
    data[i].classList.remove('selected');
  }

  target.classList.add('selected'); // change images

  var img = target.querySelector('.car-list-inner .img-fluid').getAttribute('src');
  document.querySelector('#my_changing_image').setAttribute('src', img); // change checkSelected

  var getValue = target.getAttribute('data-value');
  var setValue = document.querySelector('.modelseelct');
  setValue.value = getValue;
  document.querySelector('.getImgPath').value = img;
}

function selectTrigger() {
  var selectBox = document.querySelector('#my_select_box');
  selectBox.addEventListener('change', function () {
    var val = this.value;
    var icns = document.querySelectorAll('.select-change');
    var target = document.querySelector(".select-change[data-value=".concat(val, "]"));
    checkSelected(icns, target);
  });
}

window.addEventListener('load', function () {
  var icns = document.querySelectorAll('.select-change');

  for (var i = 0; i < icns.length; i++) {
    icns[i].addEventListener('click', function () {
      checkSelected(icns, this);
      scrollDown();
    });
  }

  selectTrigger();
});