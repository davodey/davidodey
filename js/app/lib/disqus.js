define([
	//libs
	'disqus'
], function() {
		var d = document, s = d.createElement('script');
		s.src = '//davidodey.disqus.com/embed.js';
		s.setAttribute('data-timestamp', +new Date());
		(d.head || d.body).appendChild(s);
	
});