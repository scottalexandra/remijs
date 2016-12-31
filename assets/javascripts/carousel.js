$(document).ready(function() {

  var carousel1 = {
    numOfSlides: $('.carousel-1-slide').length,
    leftArrow: $('#carousel-1-arrow-left'),
    rightArrow: $('#carousel-1-arrow-right'),
    slides: $('.left-slides'),
    slideSpeed: 5000,
    pause: false
  }

  var carousel2 = {
    numOfSlides: $('.carousel-2-slide').length,
    leftArrow: $('#carousel-2-arrow-left'),
    rightArrow: $('#carousel-2-arrow-right'),
    slides: $('.right-slides'),
    slideSpeed: 6000,
    pause: false
  }

  var interval1;
  var interval2;

  startScrollTimer1();
  startScrollTimer2();

  $('.one').css('width', (carousel1.numOfSlides/2 * 100) + '%');

  $('.two').css('width', (carousel2.numOfSlides/2 * 100) + '%');

  function startScrollTimer1() {
    interval1 = setInterval(rotateRight.bind(this, carousel1.slides), carousel1.slideSpeed)
  }

  function startScrollTimer2() {
    interval2 = setInterval(rotateRight.bind(this, carousel2.slides), carousel2.slideSpeed)
  }

  $('.pause-button').on('click', function(e) {
    var $pauseButton = $(e.currentTarget);
    var pauseButtonId = e.currentTarget.id;

    if($pauseButton.hasClass('paused')) {
      $pauseButton.removeClass('paused');

      if(pauseButtonId === 'c1') {
        startScrollTimer1();
        carousel1.pause = false;
      } else {
        startScrollTimer2();
        carousel2.pause = false;
      }
    } else {
      $pauseButton.addClass('paused')

      if(pauseButtonId === 'c1') {
        clearInterval(interval1);
        carousel1.pause = true;
      } else {
        clearInterval(interval2);
        carousel2.pause = true;
      }
    }
  });

  $('.arrow-btn').click(function(e) {
    switch (e.target.id) {
      case 'carousel-1-arrow-right':
        clearInterval(interval1);
        rotateRight(carousel1.slides);
        if(!carousel1.pause) {
          startScrollTimer1();
        }
        break;
      case 'carousel-1-arrow-left':
        clearInterval(interval1);
        rotateLeft(carousel1.slides);
        if(!carousel1.pause) {
          startScrollTimer1();
        }
        break;
      case 'carousel-2-arrow-right':
        clearInterval(interval2);
        rotateRight(carousel2.slides);
        if(!carousel2.pause) {
          startScrollTimer2();
        }
        break;
      case 'carousel-2-arrow-left':
        clearInterval(interval2);
        rotateLeft(carousel2.slides);
        if(!carousel2.pause) {
          startScrollTimer2();
        }
        break;
    }
  });

  function rotateLeft(slides) {
    var first = $(slides).children(':first');
    var last = $(slides).children(':last')

    $(slides).prepend(last);

    $(first).hide('slide',{direction:'right'},1000);

    $(last).show('slide', {direction: 'left'}, 1000);
  };

  function rotateRight(slides) {
    var first = $(slides).children(':first');
    var next = $(first).next();

    $(first).hide('slide', {direction:'left'}, 1000)

    $(next).show('slide', {direction: 'right'}, 1000)

    $(slides).append(first);
  };
});
