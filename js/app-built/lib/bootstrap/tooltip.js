+function(e){"use strict";function t(t){return this.each(function(){var r=e(this),i=r.data("bs.tooltip"),s=typeof t=="object"&&t;if(!i&&/destroy|hide/.test(t))return;i||r.data("bs.tooltip",i=new n(this,s)),typeof t=="string"&&i[t]()})}var n=function(e,t){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",e,t)};n.VERSION="3.3.5",n.TRANSITION_DURATION=150,n.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},n.prototype.init=function(t,n,r){this.enabled=!0,this.type=t,this.$element=e(n),this.options=this.getOptions(r),this.$viewport=this.options.viewport&&e(e.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1};if(this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");var i=this.options.trigger.split(" ");for(var s=i.length;s--;){var o=i[s];if(o=="click")this.$element.on("click."+this.type,this.options.selector,e.proxy(this.toggle,this));else if(o!="manual"){var u=o=="hover"?"mouseenter":"focusin",a=o=="hover"?"mouseleave":"focusout";this.$element.on(u+"."+this.type,this.options.selector,e.proxy(this.enter,this)),this.$element.on(a+"."+this.type,this.options.selector,e.proxy(this.leave,this))}}this.options.selector?this._options=e.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},n.prototype.getDefaults=function(){return n.DEFAULTS},n.prototype.getOptions=function(t){return t=e.extend({},this.getDefaults(),this.$element.data(),t),t.delay&&typeof t.delay=="number"&&(t.delay={show:t.delay,hide:t.delay}),t},n.prototype.getDelegateOptions=function(){var t={},n=this.getDefaults();return this._options&&e.each(this._options,function(e,r){n[e]!=r&&(t[e]=r)}),t},n.prototype.enter=function(t){var n=t instanceof this.constructor?t:e(t.currentTarget).data("bs."+this.type);n||(n=new this.constructor(t.currentTarget,this.getDelegateOptions()),e(t.currentTarget).data("bs."+this.type,n)),t instanceof e.Event&&(n.inState[t.type=="focusin"?"focus":"hover"]=!0);if(n.tip().hasClass("in")||n.hoverState=="in"){n.hoverState="in";return}clearTimeout(n.timeout),n.hoverState="in";if(!n.options.delay||!n.options.delay.show)return n.show();n.timeout=setTimeout(function(){n.hoverState=="in"&&n.show()},n.options.delay.show)},n.prototype.isInStateTrue=function(){for(var e in this.inState)if(this.inState[e])return!0;return!1},n.prototype.leave=function(t){var n=t instanceof this.constructor?t:e(t.currentTarget).data("bs."+this.type);n||(n=new this.constructor(t.currentTarget,this.getDelegateOptions()),e(t.currentTarget).data("bs."+this.type,n)),t instanceof e.Event&&(n.inState[t.type=="focusout"?"focus":"hover"]=!1);if(n.isInStateTrue())return;clearTimeout(n.timeout),n.hoverState="out";if(!n.options.delay||!n.options.delay.hide)return n.hide();n.timeout=setTimeout(function(){n.hoverState=="out"&&n.hide()},n.options.delay.hide)},n.prototype.show=function(){var t=e.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(t);var r=e.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(t.isDefaultPrevented()||!r)return;var i=this,s=this.tip(),o=this.getUID(this.type);this.setContent(),s.attr("id",o),this.$element.attr("aria-describedby",o),this.options.animation&&s.addClass("fade");var u=typeof this.options.placement=="function"?this.options.placement.call(this,s[0],this.$element[0]):this.options.placement,a=/\s?auto?\s?/i,f=a.test(u);f&&(u=u.replace(a,"")||"top"),s.detach().css({top:0,left:0,display:"block"}).addClass(u).data("bs."+this.type,this),this.options.container?s.appendTo(this.options.container):s.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var l=this.getPosition(),c=s[0].offsetWidth,h=s[0].offsetHeight;if(f){var p=u,d=this.getPosition(this.$viewport);u=u=="bottom"&&l.bottom+h>d.bottom?"top":u=="top"&&l.top-h<d.top?"bottom":u=="right"&&l.right+c>d.width?"left":u=="left"&&l.left-c<d.left?"right":u,s.removeClass(p).addClass(u)}var v=this.getCalculatedOffset(u,l,c,h);this.applyPlacement(v,u);var m=function(){var e=i.hoverState;i.$element.trigger("shown.bs."+i.type),i.hoverState=null,e=="out"&&i.leave(i)};e.support.transition&&this.$tip.hasClass("fade")?s.one("bsTransitionEnd",m).emulateTransitionEnd(n.TRANSITION_DURATION):m()}},n.prototype.applyPlacement=function(t,n){var r=this.tip(),i=r[0].offsetWidth,s=r[0].offsetHeight,o=parseInt(r.css("margin-top"),10),u=parseInt(r.css("margin-left"),10);isNaN(o)&&(o=0),isNaN(u)&&(u=0),t.top+=o,t.left+=u,e.offset.setOffset(r[0],e.extend({using:function(e){r.css({top:Math.round(e.top),left:Math.round(e.left)})}},t),0),r.addClass("in");var a=r[0].offsetWidth,f=r[0].offsetHeight;n=="top"&&f!=s&&(t.top=t.top+s-f);var l=this.getViewportAdjustedDelta(n,t,a,f);l.left?t.left+=l.left:t.top+=l.top;var c=/top|bottom/.test(n),h=c?l.left*2-i+a:l.top*2-s+f,p=c?"offsetWidth":"offsetHeight";r.offset(t),this.replaceArrow(h,r[0][p],c)},n.prototype.replaceArrow=function(e,t,n){this.arrow().css(n?"left":"top",50*(1-e/t)+"%").css(n?"top":"left","")},n.prototype.setContent=function(){var e=this.tip(),t=this.getTitle();e.find(".tooltip-inner")[this.options.html?"html":"text"](t),e.removeClass("fade in top bottom left right")},n.prototype.hide=function(t){function r(){i.hoverState!="in"&&s.detach(),i.$element.removeAttr("aria-describedby").trigger("hidden.bs."+i.type),t&&t()}var i=this,s=e(this.$tip),o=e.Event("hide.bs."+this.type);this.$element.trigger(o);if(o.isDefaultPrevented())return;return s.removeClass("in"),e.support.transition&&s.hasClass("fade")?s.one("bsTransitionEnd",r).emulateTransitionEnd(n.TRANSITION_DURATION):r(),this.hoverState=null,this},n.prototype.fixTitle=function(){var e=this.$element;(e.attr("title")||typeof e.attr("data-original-title")!="string")&&e.attr("data-original-title",e.attr("title")||"").attr("title","")},n.prototype.hasContent=function(){return this.getTitle()},n.prototype.getPosition=function(t){t=t||this.$element;var n=t[0],r=n.tagName=="BODY",i=n.getBoundingClientRect();i.width==null&&(i=e.extend({},i,{width:i.right-i.left,height:i.bottom-i.top}));var s=r?{top:0,left:0}:t.offset(),o={scroll:r?document.documentElement.scrollTop||document.body.scrollTop:t.scrollTop()},u=r?{width:e(window).width(),height:e(window).height()}:null;return e.extend({},i,o,u,s)},n.prototype.getCalculatedOffset=function(e,t,n,r){return e=="bottom"?{top:t.top+t.height,left:t.left+t.width/2-n/2}:e=="top"?{top:t.top-r,left:t.left+t.width/2-n/2}:e=="left"?{top:t.top+t.height/2-r/2,left:t.left-n}:{top:t.top+t.height/2-r/2,left:t.left+t.width}},n.prototype.getViewportAdjustedDelta=function(e,t,n,r){var i={top:0,left:0};if(!this.$viewport)return i;var s=this.options.viewport&&this.options.viewport.padding||0,o=this.getPosition(this.$viewport);if(/right|left/.test(e)){var u=t.top-s-o.scroll,a=t.top+s-o.scroll+r;u<o.top?i.top=o.top-u:a>o.top+o.height&&(i.top=o.top+o.height-a)}else{var f=t.left-s,l=t.left+s+n;f<o.left?i.left=o.left-f:l>o.right&&(i.left=o.left+o.width-l)}return i},n.prototype.getTitle=function(){var e,t=this.$element,n=this.options;return e=t.attr("data-original-title")||(typeof n.title=="function"?n.title.call(t[0]):n.title),e},n.prototype.getUID=function(e){do e+=~~(Math.random()*1e6);while(document.getElementById(e));return e},n.prototype.tip=function(){if(!this.$tip){this.$tip=e(this.options.template);if(this.$tip.length!=1)throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!")}return this.$tip},n.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},n.prototype.enable=function(){this.enabled=!0},n.prototype.disable=function(){this.enabled=!1},n.prototype.toggleEnabled=function(){this.enabled=!this.enabled},n.prototype.toggle=function(t){var n=this;t&&(n=e(t.currentTarget).data("bs."+this.type),n||(n=new this.constructor(t.currentTarget,this.getDelegateOptions()),e(t.currentTarget).data("bs."+this.type,n))),t?(n.inState.click=!n.inState.click,n.isInStateTrue()?n.enter(n):n.leave(n)):n.tip().hasClass("in")?n.leave(n):n.enter(n)},n.prototype.destroy=function(){var e=this;clearTimeout(this.timeout),this.hide(function(){e.$element.off("."+e.type).removeData("bs."+e.type),e.$tip&&e.$tip.detach(),e.$tip=null,e.$arrow=null,e.$viewport=null})};var r=e.fn.tooltip;e.fn.tooltip=t,e.fn.tooltip.Constructor=n,e.fn.tooltip.noConflict=function(){return e.fn.tooltip=r,this}}(jQuery);