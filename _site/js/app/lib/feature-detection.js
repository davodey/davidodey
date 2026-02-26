require([], function() {
/// Load Placeholder
  if (!Modernizr.input.placeholder) {
       require(['placeholder', 'app/ie-placeholder']);   
 }
/// Loads Media Query Support
   if (!Modernizr.mq('only all')) {
        require(['respond']);
    }
/// Loads Pseudo Selector Support
    if (!Modernizr.lastchild) {
        require(['selectivzr']);
    }
/// Adds test for picture element and srcset   
    Modernizr.addTest('picture', 'HTMLPictureElement' in window );
});
