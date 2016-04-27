//The build will inline common dependencies into this file.

//For any third party dependencies, like jQuery, place them in the lib folder.

//Configure loading modules from the lib directory,
//except for 'app' ones, which are in a sibling
//directory.

requirejs.config({
    baseUrl: 'lib',
    paths: {
        'app': '../components',
        
    },
    shim: {
        'bootstrap/affix': ['jquery'],
        'bootstrap/alert': ['jquery'],
        'bootstrap/button': ['jquery'],
        'bootstrap/carousel': ['jquery', 'bootstrap/transition'],
        'bootstrap/collapse': ['jquery'],
        'bootstrap/dropdown': ['jquery'],
        'bootstrap/modal': ['jquery'],
        'bootstrap/popover': ['jquery', 'bootstrap/tooltip'],
        'bootstrap/scrollspy': ['jquery'],
        'bootstrap/tab': ['jquery'],
        'bootstrap/tooltip': ['jquery'],
        'bootstrap/transition': ['jquery'],
        'lib/selectivizr': ['jquery'],
        'respond':['jquery'],
        'checkbox/icheck': ['jquery'],
        'share/jquery.sharrre': ['jquery'],
        'share/platform/platform': ['jquery','share/jquery.sharrre'],
    },


});

