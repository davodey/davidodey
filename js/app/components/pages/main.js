require([
	//libs
	'jquery',
	'validate/validation_config',
	'app/contact_form'
], function($) {
	'use strict';

	$(document).ready(function(){
		$('#contactForm').validate({
			rules: {
				'name': {
					required: true
				},
				'email': {
					required: true
				},
				'message': {
					required: true
				}
			},
			messages: {
				'name': {
					required: 'Please Enter Your Name'
				},
				'email': {
					required: 'Please Enter Your Email'
				},
				'message': {
					required: 'Please Enter a Message'
				}
			},
			submitHandler: function(form) {
				form.submit();
			}
		});
	});
});