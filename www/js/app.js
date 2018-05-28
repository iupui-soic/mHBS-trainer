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
      documents: {
        rawData: {}
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

// declarations
var secureParamsStored = 0;
var loginCounter = 0;
var tempCredentials = {
  username : '',
  password : '',
  serverURL : '',
  stored: false
};

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
app.on('storedCredential', function (key) {
  console.log("We triggered storedCredential Event");
  if (key === "username") {
    console.log("We are incrementing secureParams in stored credential based on username");
    secureParamsStored++;
  } else if (key === "password") {
    console.log("We are incrementing secureParams in stored credential based on password");
    secureParamsStored++;
  }
  else if (key === "serverURL") {
    console.log("We are incrementing secureParams in stored credential based on serverURL");
    secureParamsStored++;
  }
  if (secureParamsStored === 3) {
    console.log("we had 3 secureParams in stored credential, trigger downloadOk");
    // can use to directly get tempCredentials if needed
    tempCredentials.stored = true;
    secureParamsStored = 0;
    app.emit('downloadOk');
  }
});

app.on('gotCredential', function (key, value) {
  console.log("We triggered gotCredential Event");
  if (key === "username") {
    console.log("incrementing secure params in got credential by username");
    secureParamsStored++;
    tempCredentials.username = value;
  } else if (key === "password") {
    console.log("incrementing secure params in got credential by password");
    secureParamsStored++;
    tempCredentials.password = value;
  }
  else if (key === "serverURL") {
    console.log("incrementing secure params in got credential by serverURL");
    secureParamsStored++;
    tempCredentials.serverURL = value;
  }
  if (secureParamsStored === 3) {
    console.log("got 3 secured params, access content");
    accessOnlineContent();
    secureParamsStored = 0;
  }
});

app.on('downloadOk', function () {
  console.log("in downloadOK trigger getCredentials");
  getCredentials();
});

app.on('onLogin', function(value){
  loginCounter += value;
  console.log("Login Counter " + loginCounter);
  if(loginCounter===2){
    clearCredentials();
    loginCounter = 0;
  }
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
  console.log("access online content");

  var server = 'https://mhbs.info/api/documents.xml';
  // send request
  app.request.get(server, {
      username: tempCredentials.username,
      password: tempCredentials.password
    }, function (data) {
      console.log("setting rawData");
      app.data.documents.rawData = data;
      // ready to download content
      app.emit('onLogin',1);
      downloadContent();
    },
    function (error) {
      alert(error + "The content is not retrievable");
    })
}

// use to re-download media content
function syncOnlineContent() {
  if (tempCredentials.stored) {
    app.emit('downloadOk');
  }
}

function downloadContent() {
  console.log("in download content");
  console.log(app.data.documents.rawData);
  // update DB

}

// set intent listener, send broadcast
function onLoad() {
  window.plugins.intent.setNewIntentHandler(onIntent);

  // if we don't have tempCredentials, send a broadcast, store them, and log the user in
  if (app.storage == null) {
    this.app.storage = ss();
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


// set basic auth request header
function setHeaders() {
  app.request.setup({
    headers: {
      'Authorization': 'Basic ' + btoa(tempCredentials.username + ":" + tempCredentials.password)
    }
  });
}

// login
function logIn() {
  var server = tempCredentials.serverURL + "api/26/me/";

  // send request
  app.request.get(server, {
      username: tempCredentials.username,
      password: tempCredentials.password
    }, function (data) {
      app.preloader.hide();
      console.log(data);
      app.emit('onLogin',1);
    },
    function (error) {
      alert("The login information is not correct, please log in from Tracker-capture again.");
    });
}

// clear tempCredentials
function clearCredentials() {
  console.log("CLEARING CREDENTIALS");
  delete tempCredentials.username;
  delete tempCredentials.password;
  delete tempCredentials.serverURL;
}

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
  console.log("got intent");
  // clear out the intent handler
  window.plugins.intent.setNewIntentHandler(null);

  //todo: error handling, check if null
  if (intent != null) {
    var credentialsArr = parseCredentials(intent);
    if (credentialsArr.length === 3) {
      console.log("length of tempCredentials " + credentialsArr.length);
      tempCredentials.username = credentialsArr[0];
      tempCredentials.password = credentialsArr[1];
      tempCredentials.serverURL = credentialsArr[2];
      // set app headers
      setHeaders();
      if (tempCredentials.username != null && tempCredentials.password != null && tempCredentials.serverURL != null) {
        //todo: errors out if attempting to use app.data.tempCredentials
        // storeCredentials
        storeCredentials();
        // login
        logIn();
      }
    } else {
      alert("Please login tracker-capture");
    }
  }
}

// set tempCredentials
function storeCredentials() {
  console.log("in store Credentials");
  app.storage.set(function () {
    console.log('set username');
    // set username for our app
    setAppUsername();
    app.emit('storedCredential', "username");
  }, function (error) {
    console.log("username store creds error");
  }, 'username', tempCredentials.username);
  app.storage.set(function () {
    console.log('set password');
    app.emit('storedCredential', "password");
  }, function (error) {
    console.log("pass store creds error");
  }, 'password', tempCredentials.password);
  app.storage.set(function () {
    console.log('set serverURL');
    app.emit('storedCredential', "serverURL");
  }, function (error) {
    console.log("serverurl store creds error");
    console.log(error);
  }, 'serverURL', tempCredentials.serverURL);
}


function getCredentials() {
  console.log("in getCredentials");
  app.storage.get(function (value) {
    console.log('get username');
    app.emit('gotCredential', "username", value);
  }, function (error) {
    console.log("username" + error);
  }, 'username');

  app.storage.get(function (value) {
    console.log('get password');
    app.emit('gotCredential', "password", value);
  }, function (error) {
    console.log("password" + error);
  }, 'password');

  app.storage.get(function (value) {
    console.log('get serverURL');
    app.emit('gotCredential', "serverURL", value);
  }, function (error) {
    console.log("serverURL" + error);
  }, 'serverURL');
}


// get the tempCredentials from the JSON
function parseCredentials(intent) {
  return intent.extras['key:loginRequest'];
}

