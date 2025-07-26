$(document).ready(function () {


  $(document).on({
    mouseenter: function () {
      $(this).addClass("overItem");
    },
    mouseleave: function () {
      $(this).removeClass("overItem");
    }
  }, ".format-row");

  $("a[name='RahmenTabs'],.RahmenTabs").click(function (e) {
    var $RahmenTab = $(this);

    $RahmenTab.parent().parent().children().removeClass("active");
    
    var ratio_min, ratio_max, bestseller;
    ratio_min = $RahmenTab.data("ratio-min");
    ratio_max = $RahmenTab.data("ratio-max");
    var bestseller_tab = $RahmenTab.text() === "Bestseller";
    let XXXL_tab = e.target.getAttribute("data-xxxl") == "true";
    var $RahmenStarke = $("input[name='Rahmen']:checked")
    if ($RahmenStarke.length === 1) {
      rahmenbreite = $RahmenStarke.data('rahmenbreite');
    } else {
      rahmenbreite = 19;
    }

    $(".format-row").each(function () {
      var $tr = $(this);

      $tr.find(".r19,.r38,.r0").not(".r" + rahmenbreite).hide();
      var $td = $tr.find(".r" + rahmenbreite);
      $td.show();

      if ($td.eq(0).data('preis')) {
        if (bestseller_tab && $td.eq(0).data('bestseller') == "3" || XXXL_tab && $td.eq(0).data('bestseller') == "3") {
          $tr.show();
        } else if (bestseller_tab && $td.eq(0).data('bestseller') == "1") {
          $tr.show();
        } else if (XXXL_tab && $td.eq(0).data('bestseller') == "2") {
          $tr.show();
        } else if (!bestseller_tab && !XXXL_tab && $tr.data("ratio") >= ratio_min && $tr.data("ratio") <= ratio_max) {
          $tr.show();
        }
        else
          $tr.hide();
      }
      else {
        $tr.hide();
      }

    });

    $RahmenTab.parent().addClass("active");
  });

  //rotation speed and timer
  var speed = 4000;

  var run = setInterval(rotate, speed);
  var slides = $('#Textslides .slide');
  var container = $('#Textslides ul');
  var elm = container.find(':first-child').prop("tagName");
  var item_width = container.width();
  var previous = 'prev'; //id of previous button
  var next = 'next'; //id of next button
  slides.width(item_width); //set the slides to the correct pixel width
  container.parent().width(item_width);
  container.width(slides.length * item_width); //set the slides container to the correct total width
  container.find(elm + ':first').before(container.find(elm + ':last'));
  resetSlides();


  $('#buttons a').click(function (e) {
    //slide the item
    if (container.is(':animated')) {
      return false;
    }
    if (e.target.id == previous) {
      container.stop().animate({
        'left': 0
      }, 1500, function () {
        container.find(elm + ':first').before(container.find(elm + ':last'));
        resetSlides();
      });
    }

    if (e.target.id == next) {
      container.stop().animate({
        'left': item_width * -2,
      }, 1500, function () {
        container.find(elm + ':last').after(container.find(elm + ':first'));
        resetSlides();
      });

    }

    //cancel the link behavior     
    return false;
  });


  //if mouse hover, pause the auto rotation, otherwise rotate it 

  container.parent().mouseenter(function () {
    clearInterval(run);
  }).mouseleave(function () {
    run = setInterval(rotate, speed);
  });

  function resetSlides() {
    //and adjust the container so current is in the frame
    container.css({
      'left': -1 * item_width
    });
  }

});
//a simple function to click next link
//a timer will call this function, and the rotation will begin

function rotate() {
  $('#next').click();
}