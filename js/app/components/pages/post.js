require([
	//libs
	'jquery',
	'disqus',
	'typescript',
	'share/platform/platform',
	'share/platform/twitter'
], function($) {
	'use strict';
	$(document).ready(function () {
		var socialCounts,
			$thisUrl = $(location).attr('href'),
			settings = {
				pageUrl: $thisUrl,                      // GET COUNTS FROM THIS URL
				facebookTarget: $('.facebook-count'), 	// DISPLAY FB COUNT IN THIS ELEMENT / DIV / SPAN etc..
				linkedinTarget: $('.linkedin-count'), 	// DISPLAY LD COUNT IN THIS ELEMENT / DIV / SPAN etc.
				googleTarget: $('.google-count'),       // DISPLAY G+ COUNT IN THIS ELEMENT / DIV / SPAN etc.
				googlePlusApi: '' 						// ENTER GOOGLE PLUS API
			};

		function loadCounts (url, callback) {
			$.ajax({
				url: url,
				cache: true,
				type: 'GET',
				dataType: 'JSONP',
				success: function(data){
					callback(data);
				}
			});
		}

		socialCounts = {
			facebook: {
				url: 'http://graph.facebook.com/?id='+ settings.pageUrl,
				getCount: function (){
					loadCounts(this.url, function (data){
						settings.facebookTarget.text(data.shares);
					});
				}
			},
			linkedin: {
				url: 'https://www.linkedin.com/countserv/count/share?url='+ settings.pageUrl +'&format=json?callback=JSON_CALLBACK',
				getCount: function (){
					loadCounts(this.url, function (data){
						settings.linkedinTarget.text(data.count);
					});
				}
			},
			googlePlus: {
				url: 'https://clients6.google.com/rpc?key=YOUR_API_KEY',
				getCount: function (){
					loadCounts(this.url, function (data){
						settings.googleTarget.text(data.count);
					});
				}
			},
			execute: function() {
				this.facebook.getCount();
				this.linkedin.getCount();
				this.googlePlus.getCount();
			}
		};
		
		$(function () {
			var $shareList = $('.share-links li');
			$shareList.on('click', 'a.popup', function () {
				window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
				return false;
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

			socialCounts.execute();
		});
	});
});