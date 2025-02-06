require([
	//libs
	'jquery',
	'validate/validation_config'
], function($) {
	'use strict';

	$(document).ready(function(){
		var $honey = $('#honey').val();
		$('#contactForm').validate({
			rules: {
				'name': {
					required: true
				},
				'email': {
					required: true,
					email: true
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
					required: 'Please Enter Your Email Address',
					email: 'Please Enter a Valid Email Address'
				},
				'message': {
					required: 'Please Enter a Message'
				}
			},
			submitHandler: function(form) {
				var value = $('textarea').val();
				if ( $honey.length !== 0 && ~value.indexOf('@') && ~value.indexOf('sir')) {
				} else {
					var formData = $('#contactForm').serialize();
					console.log(formData);
					$.ajax({
						type: 'POST',
						url: 'https://formspree.io/dodey@icloud.com',
						data: formData,
						dataType: 'json',
						success: function(response) {
							if (response.next === '/thanks') {
								$('#submitForm').hide();
								$('#message').fadeIn('fast');
								$('input, textarea').removeClass('valid').val('');
							}
						}
					});
				}
			}
		});
	});
});