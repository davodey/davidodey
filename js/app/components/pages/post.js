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

				// set true or false to toggle the counts
				facebook: true,
				linkedin: true,
				googlePlus: true,

				// set the page url you want to get the counts from
				pageUrl: 'http://www.google.com',

				// classes that will display the counts
				facebookClass: 'facebook-count',
				linkedinClass: 'linkedin-count',
				googlePlusClass: 'google-count',

				// enter google plus api
				// get it here https://developers.google.com/+/web/api/rest/oauth#acquiring-and-using-an-api-key
				// googlePlusApi: 'AIzaSyABnfY5UqFkTVEzpw5a1oTmbzBM_vbdlts'
			};

		function loadCounts (url, callback) {
			$.ajax({
				url: url,
				cache: true,
				type: 'POST',
				dataType: 'jsonp',
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
						console.log(data);
						$('.'+ settings.facebookClass).text(data.shares);
					});
				}
			},
			linkedin: {
				url: 'https://www.linkedin.com/countserv/count/share?url='+ settings.pageUrl +'&format=json?callback=JSON_CALLBACK',
				getCount: function (){
					loadCounts(this.url, function (data){
						console.log(data);
						$('.'+ settings.linkedinClass).text(data.count);
					});
				}
			},
			googlePlus: {
				url: 'https://clients6.google.com/rpc?key=' + settings.googlePlusApi + 'callback=?',
				getCount: function (){
					var params = {
						nolog: true,
						id: settings.pageUrl
					};
					gapi.client.setApiKey('AIzaSyCKSbrvQasunBoV16zDH9R33D88CeLr9gQ')
					gapi.client.rpcRequest('pos.plusones.get', 'v1', params).execute(function(data) {
						console.log(data.metadata.globalCounts.count);
						$('.'+ settings.googlePlusClass).text(data.metadata.globalCounts.count)
					});
				}
			},
			execute: function() {
				if (settings.facebook === true) {
					this.facebook.getCount();
				}
				if (settings.linkedin === true) {
					this.linkedin.getCount();
				}
				if (settings.googlePlus === true) {
					this.googlePlus.getCount();
				}
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