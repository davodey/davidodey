define("app/pages/main",function(){}),$(document).ready(function(){$("#contactform").submit(function(){console.log("hello");var e=$(this).serialize();return $.ajax({type:"POST",url:"contact_form/contact.php",data:e,success:function(e){$("#note").ajaxComplete(function(t,n,r){e=="OK"?(result='<div class="notification_ok">Your message has been sent Succesfully. Thank you!</div>',$("#contactform").find(".textbox").val("")):result=e,$(this).hide(),$(this).html(result).slideDown("slow"),$(this).html(result)})}}),!1})}),define("app/contact_form",function(){}),$(document).ready(function(){var e="#mobile",t="#mobile-navigation a.button";$(window).width()<640?$(e).removeClass("container-fluid").addClass("container"):$(e).addClass("container-fluid"),$(t).click(function(){event.preventDefault(),$("#navigation").toggleClass("mobile-toggle"),$(this).toggleClass("left block-important")}),$(t).css("right","-100px");var n=0;$(window).scroll(function(){var e=$(this).scrollTop();e>n?$(t).css("right","-100px"):$(t).css("right","0"),n=e}),$(window).scroll(function(){var e=$("#contact").position(),t=$(window).scrollTop(),n=e.top-88,r=$("li:last-child");t>n?($("li").removeClass("active"),$(r).addClass("active")):($(r).removeClass("active"),$("li:first-child").addClass("active"))})}),define("app/custom",function(){}),$(document).ready(function(){$(".facebookShare").click(function(){return console.log("facebook loaded"),elem=$(this),postToFeed(elem.data("title"),elem.data("desc"),elem.prop("href"),elem.data("image")),!1})}),define("app/facebook",function(){});