routes = [
  {
    path: '/',
    id: 'home',
    url: './pages/homepage.html',
    pushState: true
  },
  {
    path: '/about/',
    url: './pages/about.html',
    pushState: true
  },
  //<editor-fold desc="mHBS Guide Routes" defaultstate="collapsed">
  {
    path: '/testvideo/',
    url: './pages/testvideo.html'
  },
  {
    path: '/page1/',
    url: './pages/page1.html',
    pushState: true
  },
  {
    path: '/section1/',
    url: './pages/section1.html',
    pushState: true
  },
  {
    path: '/section1a/',
    url: './pages/section1a.html',
    pushState: true
  },
  {
    path: '/section1b/',
    url: './pages/section1b.html',
    pushState: true
  },
  {
    path: '/section1c/',
    url: './pages/section1c.html',
    pushState: true
  },
  {
    path: '/section2/',
    url: './pages/section2.html',
    pushState: true
  },
  {
    path: '/section2a/',
    url: './pages/section2a.html',
    pushState: true
  },
  {
    path: '/section2b/',
    url: './pages/section2b.html',
    pushState: true
  },
  {
    path: '/section2c/',
    url: './pages/section2c.html',
    pushState: true
  },
  {
    path: '/section2d/',
    url: './pages/section2d.html',
    pushState: true
  },
  {
    path: '/section2e/',
    url: './pages/section2e.html',
    pushState: true
  },
  {
    path: '/section3/',
    url: './pages/section3.html',
    pushState: true
  },
  {
    path: '/section3a/',
    url: './pages/section3a.html',
    pushState: true
  },
  {
    path: '/section3b/',
    url: './pages/section3b.html',
    pushState: true
  },
  {
    path: '/section3c/',
    url: './pages/section3c.html',
    pushState: true
  },
  {
    path: '/section3d/',
    url: './pages/section3d.html',
    pushState: true
  },
  {
    path: '/section3e/',
    url: './pages/section3e.html',
    pushState: true
  },
  {
    path: '/section3f/',
    url: './pages/section3f.html',
    pushState: true
  },
  {
    path: '/section3g/',
    url: './pages/section3g.html',
    pushState: true
  },
  {
    path: '/section4/',
    url: './pages/section4.html',
    pushState: true
  },
  {
    path: '/section4a/',
    url: './pages/section4a.html',
    pushState: true
  },
  {
    path: '/section4b/',
    url: './pages/section4b.html',
    pushState: true
  },
  {
    path: '/section4c/',
    url: './pages/section4c.html',
    pushState: true
  },
  {
    path: '/section4d/',
    url: './pages/section4d.html',
    pushState: true
  },
  {
    path: '/section4e/',
    url: './pages/section4e.html',
    pushState: true
  },
  {
    path: '/section5/',
    url: './pages/section5.html',
    pushState: true
  },
  {
    path: '/section5a/',
    url: './pages/section5a.html',
    pushState: true
  },
  {
    path: '/section5b',
    url: './pages/section5b.html',
    pushState: true
  },
  {
    path: '/section6/',
    url: './pages/section6.html',
    pushState: true
  },
  {
    path: '/section6a/',
    url: './pages/section6a.html',
    pushState: true
  },
  {
    path: '/section6b/',
    url: './pages/section6b.html',
    pushState: true
  },
  {
    path: '/section6c/',
    url: './pages/section6c.html',
    pushState: true
  },
  {
    path: '/section6d/',
    url: './pages/section6d.html',
    pushState: true
  },
  {
    path: '/section6e/',
    url: './pages/section6e.html',
    pushState: true
  },
  {
    path: '/section7/',
    url: './pages/section7.html',
    pushState: true
  },
  //</editor-fold>
  {
    path: '/mhbsmain/',
    id: 'mhbsmain',
    url: './pages/mhbsmain.html',
    pushState: true
  },
  {
    path: '/videoList/',
    id: 'videoList',
    pushState: true,
    on: {
      pageBeforeIn: function (event, page) {
        /*
        console.log(event);
        // Router instance
        var router = this;
        // App instance
        var app = router.app;
        console.log(event + page);
        app.triggerOnlineContent();
        */
      }
    },
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      if (app.data.videoList.length > 0) {
        resolve({
          componentUrl: './pages/videoList.html'
        });
      }
      else {
        if (app.data.offlineMode) {
          alert("Please activate wifi to download content");
        } else {
          app.methods.triggerOnlineContent();
        }
        reject({
          url: routeFrom
        })
      }
    }
  },
  // privacy policy route
  {
    path: '/privacypolicy',
    url: './pages/privacypolicy.html',
    pushState: true
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
    pushState: true
  },
];
