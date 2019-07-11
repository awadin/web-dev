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
 var generic = "images/graduation-cap-icon-png-1.jpg";
 var mcgillPic = "images/mcgill.png";
$("#mcgill").on('mouseover', () => {
 $("#m_img").attr("src", mcgillPic);
}).on("mouseout", () => {
  $("#m_img").attr("src", generic);
});

}); 