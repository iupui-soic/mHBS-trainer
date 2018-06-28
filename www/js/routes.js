routes = [
  {
    path: '/',
    url: './index.html',
  },
  {
    path: '/page1/',
    url: './pages/page1.html',
  },
    {
    path: '/page2/',
    url: './pages/page2.html',
  },
      {
    path: '/section1/',
    url: './pages/section1.html',
  },
        {
    path: '/section1a/',
    url: './pages/section1a.html',
  },
 {
    path: '/section1b/',
    url: './pages/section1b.html',
  },
 {
    path: '/section1c/',
    url: './pages/section1c.html',
  },
       {
    path: '/section2/',
    url: './pages/section2.html',
  },
  {
    path: '/section2a/',
    url: './pages/section2a.html',
  },
  {
    path: '/section2b/',
    url: './pages/section2b.html',
  },
   {
    path: '/section2c/',
    url: './pages/section2c.html',
  },
   {
    path: '/section2d/',
    url: './pages/section2d.html',
  },
   {
    path: '/section2e/',
    url: './pages/section2e.html',
  },
 {
    path: '/section3/',
    url: './pages/section3.html',
  },
  {
    path: '/section3a/',
    url: './pages/section3a.html',
  },
  {
    path: '/section3b/',
    url: './pages/section3b.html',
  },
   {
    path: '/section3c/',
    url: './pages/section3c.html',
  },
   {
    path: '/section3d/',
    url: './pages/section3d.html',
  },
   {
    path: '/section3e/',
    url: './pages/section3e.html',
  },
   {
    path: '/section3f/',
    url: './pages/section3f.html',
  },
  {
    path: '/section3g/',
    url: './pages/section3g.html',
  },
        {
    path: '/section4/',
    url: './pages/section4.html',
  },
          {
    path: '/section4a/',
    url: './pages/section4a.html',
  },
          {
    path: '/section4b/',
    url: './pages/section4b.html',
  },
          {
    path: '/section4c/',
    url: './pages/section4c.html',
  },
          {
    path: '/section4d/',
    url: './pages/section4d.html',
  },
          {
    path: '/section4e/',
    url: './pages/section4e.html',
  },
          {
    path: '/section5/',
    url: './pages/section5.html',
  },
          {
    path: '/section5a/',
    url: './pages/section5a.html',
  },
           {
    path: '/section5b',
    url: './pages/section5b.html',
  },

           {
    path: '/section6/',
    url: './pages/section6.html',
  },
             {
    path: '/section6a/',
    url: './pages/section6a.html',
  },
             {
    path: '/section6b/',
    url: './pages/section6b.html',
  },
             {
    path: '/section6c/',
    url: './pages/section6c.html',
  },
             {
    path: '/section6d/',
    url: './pages/section6d.html',
  },
             {
    path: '/section6e/',
    url: './pages/section6e.html',
  },
            {
    path: '/section7/',
    url: './pages/section7.html',
  },
  {
    path: '/catalog/',
    componentUrl: './pages/catalog.html',
  },
  {
    path: '/product/:id/',
    componentUrl: './pages/product.html',
  },
  {
    path: '/settings/',
    url: './pages/settings.html',
  },
  {
    path: '/mhbsmain/',
    url: './pages/mhbsmain.html',
  },
  {
    path: '/videoList/',
    componentUrl: './pages/videoList.html'
  },
  {
    path: '/mediaPlayer/:id/',
    componentUrl: './pages/mediaPlayer.html'
  },
  {
    path: '/mediaplayer/',
    url: './pages/mediaplayer.html',
  },
  {
    path: '/mhbsvideos/',
	url: './pages/mhbsvideos.html',},
   {
    path: '/testvideo/',
    url: './pages/testvideo.html',
  },
  // Page Loaders & Router
  {
    path: '/page-loader-template7/:user/:userId/:posts/:postId/',
    templateUrl: './pages/page-loader-template7.html',
  },
  {
    path: '/page-loader-component/:user/:userId/:posts/:postId/',
    componentUrl: './pages/page-loader-component.html',
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = routeTo.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            componentUrl: './pages/request-and-load.html',
          },
          {
            context: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },


];
