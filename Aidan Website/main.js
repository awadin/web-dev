$(document).ready(() => {
  /*
	$("#mcgill").on('mouseenter', () => {
    $("#m_img").fadeOut(() => {
      $(this).attr("src", mcgillPic);
      $(this).load(() => {
        $(this).fadeIn();
      })
    })
  });
  */
 //possibly make this a smoother transition between images (fadeIn/fadeOut) *above?*
 //Seperate each pages JS into seperate files
 var generic = "images/graduation-cap-icon-png-1.jpg";
 var mcgillPic = "images/mcgill.png";
$("#mcgill").on('mouseover', () => {
 $("#m_img").attr("src", mcgillPic);
}).on("mouseout", () => {
  $("#m_img").attr("src", generic);
});

//For Education Page

//https://webdesign.tutsplus.com/tutorials/building-a-vertical-timeline-with-css-and-a-touch-of-javascript--cms-26528
//Review all code ^^^

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

var items = document.querySelectorAll(".timeline li");
 
// code for the isElementInViewport function
 
function callbackFunc() {
  for (var i = 0; i < items.length; i++) {
    if (isElementInViewport(items[i])) {
      items[i].classList.add("in-view");
    }
  }
}
 
window.addEventListener("load", callbackFunc);
window.addEventListener("scroll", callbackFunc);

$(".img_text").on('mouseenter', (event) => {
  $(event.currentTarget).prev().addClass('work_pics_hover')
}).on('mouseleave', (event) => {
  $(event.currentTarget).prev().removeClass('work_pics_hover')
});

}); 

//This animates the skill bars

jQuery('.skillbar').each(function(){
  jQuery(this).find('.skillbar-bar').animate({
    width:jQuery(this).attr('data-percent')
  }, 3500);
});