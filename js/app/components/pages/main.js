require([
	//libs
	'jquery',
	'validate/validation_config',
	'app/contact_form'
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
					email: 'Please Enter a Valid Email poopAddress'
				},
				'message': {
					required: 'Please Enter a Message'
				}
			},
			submitHandler: function(form) {
				if ( $honey.length !== 0) {
					console.log('go away bot');
				} else {
					console.log('hello')
					var str = $(this).serialize();

					$.ajax({
						type: "POST",
						url: "contact_form/contact.php",
						data: str,
						success: function (msg) {

							$("#note").ajaxComplete(function (event, request, settings) {

								if (msg === 'OK') // Message Sent? Show the 'Thank You' message
								{
									result = '<div class="notification_ok">Your message has been sent Succesfully. Thank you!</div>';
								}
								else {
									result = msg;
								}

								$(this).hide();
								$(this).html(result).slideDown("slow");
								$(this).html(result);


							});

						}

					});

					return false;
				}
			}
		});
	});
});