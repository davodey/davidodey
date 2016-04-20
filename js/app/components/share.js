require([
	//libs
	'jquery',
	'share/platform/platform',
	'share/platform/facebook',
	'share/platform/twitter',
	'share/platform/googlePlus',
	'share/platform/linkedin'
], function($, sharrre, facebook) {
	'use strict';

	$(document).ready(function () {
		$('#twitterShare').sharrre({
			share: {
				twitter: true
			},
			template: '<a class="twitter" href="#"><svg><use xlink:href="#twitter"></use></svg>{total}</a>',
			enableHover: false,
			enableTracking: true,
			buttons: { twitter: {via: '_JulienH'}},
			click: function(api, options){
				api.simulateClick();
				api.openPopup('twitter');
			}
		});
		$('#facebookShare').sharrre({
			share: {
				facebook: true
			},
			template: '<a class="box" href="#"><div class="count" href="#">{total}</div><div class="share"><span></span>Like</div></a>',
			enableHover: false,
			enableTracking: true,
			click: function(api, options){
				api.simulateClick();
				api.openPopup('facebook');
			}
		});
		$('#googleplusShare').sharrre({
			share: {
				googlePlus: true
			},
			template: '<a class="box" href="#"><div class="count" href="#">{total}</div><div class="share"><span></span>Google+</div></a>',
			enableHover: false,
			enableTracking: true,
			click: function(api, options){
				api.simulateClick();
				api.openPopup('googlePlus');
			}
		});
	});
});