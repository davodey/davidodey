require([
	//libs
	'jquery',
	'../../js/app-built/lib/projects/getAverageTemperature'

], function ($) {
	'use strict';

	$(document).ready(function () {
		$('.getTemp').avgWeather({
			tempUnits: 'imperial'
		});
	});
});