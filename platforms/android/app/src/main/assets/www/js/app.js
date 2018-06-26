// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.testapp', // App bundle ID
  name: 'Framework7', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
      // Demo products for Catalog section
      products: [
        {
          id: '1',
          title: 'Apple iPhone 8',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.'
        },
        {
          id: '2',
          title: 'Apple iPhone 8 Plus',
          description: 'Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!'
        },
        {
          id: '3',
          title: 'Apple iPhone X',
          description: 'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.'
        },
      ]
    };
  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  // App routes
  routes: routes,
});

// Init/Create views
var homeView = app.views.create('#view-home', {
  url: '/'
});
var catalogView = app.views.create('#view-catalog', {
  url: '/catalog/'
});
var settingsView = app.views.create('#view-settings', {
  url: '/settings/'
});
var videoView = app.views.create('#view-video', {
  url: '/mhbsvideos/'
});
var guideView = app.views.create('#view-guide', {
  url: '/mhbsmain/'
});



// Login Screen Demo
$$('#my-login-screen .login-button').on('click', function () {
  var username = $$('#my-login-screen [name="username"]').val();
  var password = $$('#my-login-screen [name="password"]').val();

  // Close login screen
  app.loginScreen.close('#my-login-screen');

  // Alert username and password
  app.dialog.alert('Username: ' + username + '<br>Password: ' + password);
});

var myPhotoBrowserStandalone;
var myPhotoBrowserPopupDark;

$$(document).on('page:init', '.page[data-name="testvideo"]', function (e) {
  	console.log("testvideo page loaded");
myPhotoBrowserStandalone = app.photoBrowser.create({
  photos: [
  "file:///android_asset/www/img/image1.jpg",
  "file:///android_asset/www/img/image2.jpg",
  ],
  theme: 'dark'
});
console.log("photo loaded");
myPhotoBrowserPopupDark = app.photoBrowser.create({
    photos : [
        {
            html: '<iframe src="file:///android_asset/www/img/vid/test.mp4" frameborder="0" allowfullscreen></iframe>',
            caption: 'mHBS sample video (Official HD Video)'
        },
    ],
    theme: 'dark',
    type: 'standalone',
	navbar: true,
	toolbar: false,
});
console.log("video loaded");
});

$$(document).on('click',".pb-standalone-video", function () {
	console.log("in video photoBrowser function");
    myPhotoBrowserPopupDark.open();
});

$$(document).on('click',".pb-videoplayer1", function () {
	console.log("in videoplayer1");
	videoView.router.navigate('/mediaplayer/');
	console.log("page navigated");


});
$$(document).on('page:init', '.page[data-name="mediaplayer"]', function (e) {

	console.log("media player init");
$$(".videoAdd").css(
{
	'position':'absolute',
    'right': '0',
    'bottom': '0',
    'min-width': '100%',
    'min-height': '100%',
    'width': '100%',
    'height': 'auto',
    'z-index': '-100',
    'background-size': 'cover',
    'overflow': 'hidden'
}
);

$$("#myBtn").css(
{
    'font-size': '17px'
}
);

$$("#progress-bar").css(
{
	//'left':'16.5%',
	'top':'84%',
    'font-size': '6px',
	'padding':'6px'
}
);
$$("#seek").css(
{
	//'left':'74.3%',
    'font-size': '16px',
	'width':'90%'
}
);
$$("#seekButton1").css(
{
    'font-size': '35px'
}
);
$$("#seekButton2").css(
{
    'font-size': '35px'
}
);

$$("#bar1").css(
{
	'position':'fixed',
    'top':'70%',
	'width':'100%'
}
);



var video = document.getElementById("myVideo");
var btn = document.getElementById("myBtn");

$$('#myBtn').on('click', function () {
	console.log("In function");
     	if (video.paused) {
			video.play();
			btn.innerHTML = "Pause";
			btn.className="col button button-small button-round button-fill color-red";
		} else {
			video.pause();
			btn.innerHTML = "Play";
			btn.className="col button button-small button-round button-fill color-green";
		}
    });

$$('#vol-filter').on('range:change', function (e, range) {
	video.volume=range.value;
});


$$('#seekButton2').on('click', function (e) {
	console.log("+");
	video.currentTime=video.currentTime+2.5;
});
$$('#seekButton1').on('click', function (e) {
	console.log("-");
	video.currentTime=video.currentTime-2.5;
});

$$('#myVideo').on('timeupdate', function (e) {
	var pos=video.currentTime * (100/video.duration);
	app.progressbar.set('#progress-bar',pos);
});

$$('#myVideo').on('timeupdate', function (e) {
	var curmin = Math.floor(video.currentTime/60);
	var cursec = Math.floor(video.currentTime - curmin * 60);
	var durmin = Math.floor(video.duration/60);
	var dursec = Math.floor(video.duration - durmin * 60);
	var cutime = document.getElementById("currenttime");
	var dutime = document.getElementById("durationtime");
	if(dursec <10){
		dursec = "0"+dursec;
	}
	if(durmin <10){
		durmin = "0"+durmin;
	}

	if(cursec < 10){
		cursec = "0"+cursec;
	}
	if(curmin < 10){
		curmin = "0"+curmin;
	}
	cutime.innerHTML = curmin + ":"+cursec;
	dutime.innerHTML = durmin + ":"+dursec;
});
});

