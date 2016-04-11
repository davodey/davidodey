require(['jquery'], function($) {
   'use strict';
   $(document).ready(function() {
      $('#contactForm').submit(function(){
         var $honey = $('#honey').val();
         if ( $honey.length !== 0 ) {
            console.log('go away bot');
         } else {
            console.log('shit');
            var str = $(this).serialize(),
                result;
            console.log(str);
            $.ajax({
               type: 'POST',
               url: 'contact_form/contact2.php',
               data: str,
               success: function (msg) {
                  console.log(msg);
                  $('#note').ajaxComplete(function () {
                     if (msg == 'OK') {
                        result = '<div class="notification_ok">Your message has been sent Succesfully. Thank you!</div>';
                        $('#contactform').find('.textbox').val('');

                     } else {
                        result = msg;
                     }
                     $(this).hide();
                     $(this).html(result).slideDown('slow');
                     $(this).html(result);
                  });

               }

            });
         }
         return false;
      });

   });
});
