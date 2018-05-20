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


// Login Screen Demo
$$('#my-login-screen .login-button').on('click', function () {
  var username = $$('#my-login-screen [name="username"]').val();
  var password = $$('#my-login-screen [name="password"]').val();

  // Close login screen
  app.loginScreen.close('#my-login-screen');

  // Alert username and password
  app.dialog.alert('Username: ' + username + '<br>Password: ' + password);
});

// show the spinner
app.preloader.show('blue');

// set intent listener, send broadcast and wait for device ready
function onLoad() {
  window.plugins.intent.setNewIntentHandler(onIntent);
  sendBroadcastToTracker();

}

// handle any incoming intent
function onIntent(intent) {
  app.preloader.hide();
  //todo: error handling, check if null
  if(intent!=null) {
   var credentialsArr = parseCredentials(intent);
   var credentials = {
     username: credentialsArr[0],
     password: credentialsArr[1],
     serverURL: credentialsArr[3]
   };
   storeCredentials(credentials);
  }
}

function parseCredentials(intent){
  return intent.extras['key:loginRequest'];
}


function storeCredentials(credentials){

  var ss = new cordova.plugins.SecureStorage(
    function () { console.log('Success')},
    function () {
      navigator.notification.alert(
        'Please enable the screen lock on your device. This app cannot operate securely without it.',
        function () {
          ss.secureDevice(
            function () {
              _init();
            },
            function () {
              _init();
            }
          );
        },
        'Screen lock is disabled'
      );
    },
    'mHBS_Hybridapp');

  ss.set(function(){console.log('set username')},function(){},'username', credentials.username);
  ss.set(function(){console.log('set password')},function(){},'password', credentials.password);
  ss.set(function(){console.log('set serverURL')},function(){},'serverURL', credentials.serverURL);
}

// send broadcast to tracker capture
function sendBroadcastToTracker()
{
  window.plugins.intentShim.sendBroadcast({
      action: 'com.example.mHBS.MainActivity'
    },
    function() {alert('sent broadcast')},
    function () {alert('Please log in and install tracker-capture')}
  );
}


