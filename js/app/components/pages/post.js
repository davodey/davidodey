require([
	//libs
	'jquery',
	'disqus',
	'typescript',
	'share/platform/platform',
	'share/platform/twitter'
], function($, sharrre) {
	'use strict';
	$(document).ready(function () {
		
		$(function () {
			var $shareList = $('.share-links li'),
				thisUrl = $(location).attr('href');

			// get facebook count
			$.ajax({
				url: 'https://count.donreach.com/',
				cache: true,
				type: 'GET',
				dataType: 'jsonp',
				data: {
					url: thisUrl
				},
				success: function (response) {
					$('.facebook-count').text(response.shares.facebook);
					$('.linkedin-count').text(response.shares.linkedin);
					$('.google-count').text(response.shares.google);
				}
			});

			$('#twitterShare').sharrre({
				share: {
					twitter: true
				},
				template: '<a class="twitter" href="#"><svg><use xlink:href="#twitter"></use></svg>{total}</a>',
				enableHover: false,
				enableTracking: true,
				buttons: { twitter: {via: 'dodey'}},
				click: function(api){
					api.simulateClick();
					api.openPopup('twitter');
				}
			});

			$shareList.on('click', 'a.popup', function () {
				window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
				return false;
			});
		});
	});
});