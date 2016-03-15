$(document).ready(function(){
	$('.facebookShare').click(function(){
		console.log('facebook loaded');
		elem = $(this);
		postToFeed(elem.data('title'), elem.data('desc'), elem.prop('href'), elem.data('image'));

		return false;
	});

})
