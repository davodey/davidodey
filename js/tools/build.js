{
    appDir: '../app',
    mainConfigFile: '../app/common.js',
    dir: '../app-built',
    modules: [ 
        //First set up the common build layer.
        {
            //module names are relative to baseUrl
            name: '../common',
            //List common dependencies here. Only need to list
            //top level dependencies, "include" will find
            //nested dependencies.
            include: [
            'feature-detection',
            'jquery',
            'app/mobile-snap',
            'app/ga',
                
            ]
        },
        //Now set up a build layer for each main layer, but exclude
        //the common one. "exclude" will exclude nested
        //the nested, built dependencies from "common". Any
        //"exclude" that includes built modules should be
        //listed before the build layer that wants to exclude it.
        //The "page1" and "page2" modules are **not** the targets of
        //the optimization, because shim config is in play, and
        //shimmed dependencies need to maintain their load order.
        //In this example, common.js will hold jquery, so backbone
        //needs to be delayed from loading until common.js finishes.
        //That loading sequence is controlled in page1.html.
        {
            name: 'app/pages/main',
            include:[],
            exclude: ['../common']
        },
    {
        name: 'app/pages/contact',
        include:[],
        exclude: ['../common']
    },
    {
        name: 'app/pages/blog',
        include:[],
        exclude: ['../common']
    },
    {
        name: 'app/pages/portfolio',
        include:[],
        exclude: ['../common']
    },
    {
        name: 'app/pages/post',
        include:[],
        exclude: ['../common']
    },
    {
        name: 'app/pages/resources',
        include:[],
        exclude: ['../common']
    },
    {
        name: 'app/pages/share',
        include:[],
        exclude: ['../common']
    }

    ],
    preserveLicenseComments: false
    
}
