/*global  Modernizr, Snap*/
require(['jquery', 'snap'], function($) {
	'use strict';
	$(document).ready(function() {
		// Lets cut the mustard and fire only if browser can do the following
		// if('querySelector' in document && 'localStorage' in window && 'addEventListener' in window) {
		if (Modernizr.flexbox) {
			var snapper = new Snap({
				element: document.getElementById('content')
			});
			var toggleMenu = $('#open-left');
			toggleMenu.click(function() {

				if (snapper.state().state === 'left') {
					snapper.close();
				} else {
					snapper.open('left');
				}
			});
		}
	});
});