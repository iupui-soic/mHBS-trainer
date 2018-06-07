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
    path: '/mhbsvideos/', /*
	   component: {
		   template:`<div class="wrapper">
<video class="videoAdd" id="myVideo" ontimeupdate="positionBar()" autoplay>
  <source src="img/vid/test.mp4" type="video/mp4" poster="img/logo.png">
  Your browser does not support HTML5 video.
</video>
<input type="range" id="mySlider" onchange="volume()" min="0" max="1" step="0.1" value="1">
</div>
<button id="myBtn" onclick="myFunction()">Pause</button>

<input id='progress-bar' onchange="updateProgressBar()" min='0' max='100' value='0' step="1" type="range">
<div id="con">
<span id="currenttime">00:00</span>/<span id="durationtime">00:00</span>
</div>`,
style:`* {
    box-sizing: border-box;
}

body {

	background: rgba(1, 1, 1, 1);
}


#mySlider {
    position: fixed;
	top:5%;

}
input[type='range']{
-webkit-appearance:none ! important;
background:#666;
border:#666 1px solid;
height:4px;
}
input[type='range']::-webkit-slider-thumb{
-webkit-appearance:none ! important;
background:#FFF;
height:15px;
width:15px;
border-radius:100%;
cursor:pointer;

}
#myBtn {
position: fixed;
    width:15%;
    font-size: 8px;
    padding: 10px;
	bottom:3%;
}
#progress-bar{
position: fixed;
    width:60%;
    font-size: 15px;
    padding:20%px;
	left:20%;
	bottom:4%;
}
#con{
position: fixed;
left:85%;
bottom:3%;
    background: rgba(0, 0, 0, 0);
    color: #f1f1f1;
	font-size: 15px;
}

.videoAdd {
position:absolute;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
    width: 100%;
    height: auto;
    z-index: -100;
    background-size: cover;
    overflow: hidden;
}
`,
    on: {
      pageInit: function () {
   
	
      },
      pageAfterOut: function () {
        // page has left the view
      },
    },
	methods:{
    volume:function() {
		 var btn2 = document.getElementById("mySlider");
		 var video = document.getElementById("myVideo");
 video.volume = btn2.value;
},
},
 }*/
 
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
