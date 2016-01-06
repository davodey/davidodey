$(document).ready(function() {  
var mobileId = ("#mobile"); 
var menuButton =  ("#mobile-navigation a.button");
	if ($(window).width() < 640) {
	   $(mobileId).removeClass( "container-fluid" ).addClass( "container" );
	} else {
	 $(mobileId).addClass( "container-fluid" );
	}

	//$("#mobile-navigation a.button").css("right", "0");
	
	$(menuButton).click(function(){
	  event.preventDefault();
		$("#navigation").toggleClass("mobile-toggle");
		$(this).toggleClass("left block-important");
	})
	
	$(menuButton).css("right", "-100px");
	
	var iScrollPos = 0;

	$(window).scroll(function () {
    	var iCurScrollPos = $(this).scrollTop();
		if (iCurScrollPos > iScrollPos) {
        //Scrolling Down
       $(menuButton).css("right", "-100px");
		} else {
       //Scrolling Up
       $(menuButton).css("right", "0");
	   }
    iScrollPos = iCurScrollPos;
});

// this will turn on the hire me link when the page is scrolled to a certain position.
// tells me the position of the contact area


$(window).scroll(function() {  
    var position = $('#contact').position();
    var height = $(window).scrollTop();
    var truePosition = (position.top - 88)
    var hireLink = $('li:last-child');

    if (height > truePosition) {
        $('li').removeClass('active');
        $(hireLink).addClass('active');
    } else {
        $(hireLink).removeClass('active');
        $('li:first-child').addClass('active');
    }
});

});
