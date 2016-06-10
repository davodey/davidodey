define(
		[
			'jquery',
			'validate/jquery.validate'
		],
		function($) {
			'use strict';

			//pelon man said rewrite this!!??

			$.validator.addMethod('nospace', function(value) {
				return value.indexOf(' ') < 0;
			}, 'Value may not include the space character');

			$.validator.addMethod('placeholder', function(value, element) {
				return value!=$(element).attr('placeholder');
			}, jQuery.validator.messages.required);

			jQuery.validator.addMethod('requiredSelect', function(value) {
				return value != -1;
			}, jQuery.validator.messages.required);

			jQuery.validator.addMethod('maskedCreditcard', function (value, element) {
				return value.indexOf('*') === 0 || jQuery.validator.methods.creditcard.call(this, value, element);
			}, jQuery.validator.messages.creditcard);

			jQuery.validator.addMethod('maskedPhone', function(value) {
				return value.replace(/[^0-9]+/g, '').length === 10;
			}, jQuery.validator.messages.phoneUS);

			jQuery.validator.addMethod('basicChar', function(value) {
				var re = /^[a-zA-Z0-9 \!#\&\*\+,\._\-\:'"\?~@\$\(\)]+$/g;

				return re.test(value);
			}, jQuery.validator.messages.basicChar);

			jQuery.validator.setDefaults({
				onfocusout: function(element) {
					this.element(element);
				}
			});
		}
);
