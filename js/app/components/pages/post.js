require([
	//libs
	'jquery',
	'disqus',
	'typescript'
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

				//in order to get twitter counts you must sign up for a free account @ https://opensharecount.com/
				twitter:true,

				// set the page url you want to get the counts from
				pageUrl: $thisUrl,

				// classes that will display the counts
				facebookClass: 'facebook-count',
				linkedinClass: 'linkedin-count',
				googlePlusClass: 'google-count',
				twitterPlusClass: 'twitter-count',

				// opensharecount requires data sent as json, while others are jsonp
				dataTypeJson: 'json',
				dataTypeJsonp: 'jsonp'
			};

		function loadCounts (url, type, callback) {
			$.ajax({
				url: url,
				cache: true,
				type: 'POST',
				dataType: type,
				data: {
			 		url: settings.pageUrl
			 	},
				success: function(data){
					callback(data);
				}
			});
		}

		socialCounts = {
			facebook: {
				url: 'http://graph.facebook.com/?id='+ settings.pageUrl,
				getCount: function (){
					loadCounts(this.url, settings.dataTypeJsonp, function (data){
						$('.'+ settings.facebookClass).text(data.shares);
					});
				}
			},
			linkedin: {
				url: 'https://www.linkedin.com/countserv/count/share?url='+ settings.pageUrl +'&format=json?callback=JSON_CALLBACK',
				getCount: function (){
					loadCounts(this.url, settings.dataTypeJsonp, function (data){
						$('.'+ settings.linkedinClass).text(data.count);
					});
				}
			},
			googlePlus: {
				url: 'https://count.donreach.com/',
				getCount: function (){
					loadCounts(this.url, settings.dataTypeJsonp, function (data){
						$('.'+ settings.googlePlusClass).text(data.shares.google);
					});
				}
			},
			twitter: {
				url: 'http://opensharecount.com/count.json?url=' + settings.pageUrl,
				getCount: function (){
					loadCounts(this.url, settings.dataTypeJson, function (data){
						$('.'+ settings.twitterPlusClass).text(data.count);
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
				if (settings.twitter === true) {
					this.twitter.getCount();
				}
			}
		};
		
		$(function () {
			socialCounts.execute();
			$('.share-links li').on('click', 'a.popup', function () {
				window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
				return false;
			});
		});
	});
});
