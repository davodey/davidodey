(function(t,n,r,i){function u(e,n){this.element=e,this.options=t.extend(!0,{},o,n),this.options.share=n.share,this._defaults=o,this._name=s,this.platforms={},this.init()}var s="sharrre",o={className:"sharrre",share:{},shareTotal:0,template:"",title:"",url:r.location.href,text:r.title,urlCurl:"sharrre.php",count:{},total:0,shorterTotal:!0,enableHover:!0,enableCounter:!0,enableTracking:!1,defaultUrl:"javascript:void(0);",popup:{width:900,height:500},hover:function(){},hide:function(){},click:function(){},render:function(){}};u.prototype.init=function(){var e=this;t.each(e.options.share,function(t,n){n===!0&&(e.platforms[t]=SharrrePlatform.get(t,e.options.buttons[t]))}),t(this.element).addClass(this.options.className),typeof t(this.element).data("title")!="undefined"&&(this.options.title=t(this.element).attr("data-title")),typeof t(this.element).data("url")!="undefined"&&(this.options.url=t(this.element).data("url")),typeof t(this.element).data("text")!="undefined"&&(this.options.text=t(this.element).data("text")),t.each(this.options.share,function(t,n){n===!0&&e.options.shareTotal++}),e.options.enableCounter===!0?t.each(this.options.share,function(t,n){if(n===!0)try{e.getSocialJson(t)}catch(r){}}):e.options.template!==""&&(e.renderer(),e.options.count[name]=0,e.rendererPerso()),e.options.template!==""?this.options.render(this,this.options):this.loadButtons(),t(this.element).on("mouseenter",function(){t(this).find(".buttons").length===0&&e.options.enableHover===!0&&e.loadButtons(),e.options.hover(e,e.options)}).on("mouseleave",function(){e.options.hide(e,e.options)}),t(this.element).click(function(t){return t.preventDefault(),e.options.click(e,e.options),!1})},u.prototype.loadButtons=function(){var e=this;t(this.element).append('<div class="buttons"></div>'),t.each(e.options.share,function(t,n){n==1&&(e.platforms[t].load(e),e.options.enableTracking===!0&&e.platforms[t].tracking())})},u.prototype.getSocialJson=function(e){var n=this,r=0,i=n.platforms[e].settings,s=n.platforms[e].url(this.options.urlCurl),o=encodeURIComponent(this.options.url);i.url.length&&(s=i.url),i.urlCount===!0&&s!==""&&(o=s),i.count===!1&&(s=""),url=s.replace("{url}",o),url!=""?t.getJSON(url,function(t){if(typeof t.count!="undefined"){var i=t.count+"";i=i.replace("Â ",""),r+=parseInt(i,10)}else t.data&&t.data.length>0&&typeof t.data[0].total_count!="undefined"?r+=parseInt(t.data[0].total_count,10):typeof t[0]!="undefined"?r+=parseInt(t[0].total_posts,10):typeof t[0]!="undefined";n.options.count[e]=r,n.options.total+=r,n.renderer(),n.rendererPerso()}).error(function(){n.options.count[e]=0,n.rendererPerso()}):(n.renderer(),n.options.count[e]=0,n.rendererPerso())},u.prototype.rendererPerso=function(){var t=0;for(e in this.options.count)t++;t===this.options.shareTotal&&this.options.render(this,this.options)},u.prototype.renderer=function(){var e=this.options.total,n=this.options.template;this.options.shorterTotal===!0&&(e=this.shorterTotal(e)),n!==""?(n=n.replace("{total}",e),t(this.element).html(n)):t(this.element).html('<div class="box"><a class="count" href="'+this.options.defaultUrl+'">'+e+"</a>"+(this.options.title!==""?'<a class="share" href="'+this.options.defaultUrl+'">'+this.options.title+"</a>":"")+"</div>")},u.prototype.shorterTotal=function(e){return e>=1e6?e=(e/1e6).toFixed(2)+"M":e>=1e3&&(e=(e/1e3).toFixed(1)+"k"),e},u.prototype.openPopup=function(e){this.platforms[e].popup(this.options),this.options.enableTracking===!0&&(infos=this.platforms[e].trackingAction,_gaq.push(["_trackSocial",infos.site,infos.action]))},u.prototype.simulateClick=function(){var e=t(this.element).html();t(this.element).html(e.replace(this.options.total,this.options.total+1))},u.prototype.update=function(e,t){e!==""&&(this.options.url=e),t!==""&&(this.options.text=t)},t.fn[s]=function(e){var n=arguments;if(e===i||typeof e=="object")return this.each(function(){t(this).data("plugin_"+s)||t(this).data("plugin_"+s,new u(this,e))});if(typeof e=="string"&&e[0]!=="_"&&e!=="init")return this.each(function(){var r=t(this).data("plugin_"+s);r instanceof u&&typeof r[e]=="function"&&r[e].apply(r,Array.prototype.slice.call(n,1))})}})(window.jQuery||window.Zepto,window,document);