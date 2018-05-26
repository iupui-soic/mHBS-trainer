// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.testapp', // App bundle ID
  name: 'Framework7', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
      user: {
        username: 'DemoUser',
      },
      // secure local storage to hold credentials
      storage: {},
      credentials: {},
      documents: {
        contentURL: 'https://mhbs.info/api/documents.xml'
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
    }
  },
  // App routes
  routes: routes,
});
var secureParamsStored = 0;

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


// Events
app.on('storedCredential', function (key, value) {

  if (key === "username") {
    app.data.credentials.username = value;
    secureParamsStored++;
  } else if (key === "password") {
    app.data.credentials.password = value;
    secureParamsStored++;
  }
  else if (key === "serverURL") {
    app.data.credentials.serverURL = value;
    secureParamsStored++;
  }
  if (secureParamsStored === 3) {
    app.emit('downloadOk');
    secureParamsStored = 0;
  }
});


app.on('downloadOk', function () {
  accessOnlineContent();
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

function accessOnlineContent() {
  var server = app.data.documents.contentURL;
  // send request
  app.request.get(server, {
      username: app.data.credentials.username,
      password: app.data.credentials.password
    }, function (data) {
      console.log(data);
      // ready to download content
      // clear
      delete app.data.credentials.password;
      delete app.data.credentials.username;
      delete app.data.credentials.serverURL;
    },
    function (error) {
      alert(error + "The content is not retrievable");
    })
}

// set intent listener, send broadcast
function onLoad() {
  // if we don't have credentials, send a broadcast, store them, and log the user in
  if (app.storage == null) {
    window.plugins.intent.setNewIntentHandler(onIntent);
    app.storage = ss();
    sendBroadcastToTracker();
  }
}

// send broadcast to tracker capture
function sendBroadcastToTracker() {
  window.plugins.intentShim.sendBroadcast({
      action: 'com.example.mHBS.MainActivity'
    },
    function () {
      console.log('sent broadcast');
    },
    function () {
      alert('Please install and launch this app through mHBS tracker-capture')
    }
  );
}

// secure storage plugin requires android users to have pin lock on device
var securityFunction = function () {
  navigator.notification.alert(
    'Please enable the screen lock on your device. This app cannot operate securely without it.',
    function () {
      app.storage.secureDevice(
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
};

// create secure storage
var ss = function () {
  return new cordova.plugins.SecureStorage(
    function () {
      console.log("Storage Created")
    },
    securityFunction,
    'mHBS_Hybridapp');
};

// set user name for our app
function setAppUsername() {
  app.storage.get(function (value) {
    app.data.user.userName = value;
  }, function (error) {
    console.log(error);
  }, 'username');
}

// handle any incoming intent
function onIntent(intent) {
  //todo: error handling, check if null
  if (intent != null) {
    var credentialsArr = parseCredentials(intent);
    var credentials = {
      username: credentialsArr[0],
      password: credentialsArr[1],
      serverURL: credentialsArr[2]
    };
    // clear out the intent handler
    window.plugins.intent.setNewIntentHandler(null);
    // store into secure storage
    storeCredentials(credentials);
    // login
    logIn(credentials);
  }
}

// set credentials
function storeCredentials(credentials) {
  app.storage.set(function () {
    console.log('set username');
    // set username for our app
    setAppUsername();
  }, function () {
  }, 'username', credentials.username);
  app.storage.set(function () {
    console.log('set password');
  }, function () {
  }, 'password', credentials.password);
  app.storage.set(function () {
    console.log('set serverURL');
  }, function () {
  }, 'serverURL', credentials.serverURL);
}

function getCredentials() {
  app.storage.get(function (value) {
    console.log('get username');
    app.emit('storedCredential', "username", value);
  }, function (error) {
    console.log("username" + error);
  }, 'username');
  app.storage.get(function (value) {
    console.log('get password');
    app.emit('storedCredential', "password", value);
  }, function (error) {
    console.log("password" + error);
  }, 'password');
  app.storage.get(function (value) {
    console.log('get serverURL');
    app.emit('storedCredential', "serverURL", value);
  }, function () {
    console.log("serverURL" + error);
  }, 'serverURL');
}


// get the credentials from the JSON
function parseCredentials(intent) {
  return intent.extras['key:loginRequest'];
}


// login
function logIn(credentials) {
  var server = credentials.serverURL + "api/26/me/";

  // set basic auth request header
  app.request.setup({
    headers: {
      'Authorization': 'Basic ' + btoa(credentials.username + ":" + credentials.password)
    }
  });

  // send request
  app.request.get(server, {
      username: credentials.username,
      password: credentials.password
    }, function (data) {
      app.preloader.hide();
      console.log(data);
      getCredentials();
      // ready to download content
      // clear
      delete credentials.password;
      delete credentials.username;
      delete credentials.serverURL;
    },
    function (error) {
      alert("The login information is not correct, please log in from Tracker-capture again.");
    });
}
