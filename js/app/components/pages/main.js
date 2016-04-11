require([
	//libs
	'jquery',
	'validate/validation_config'
	//'app/contact_form'
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
				if ( $honey.length !== 0) {
					console.log('go away bot');
				} else {
					var formData = $('#contactForm').serialize();
					console.log(formData);
					$.ajax({
						type: 'POST',
						url: 'contact_form/contact.php',
						data: formData,
						success: function(response) {
							console.log(response);
							if (response === 'OK') {
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