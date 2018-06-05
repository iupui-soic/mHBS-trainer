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
      // video and PDF content
      pdfList: [],
      videoList: [],
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

// local declarations
var secureParamsStored = 0;
var logCount = 0;
var appServer = 'https://mhbs.info/api/documents';
var documentList = [];
var downloadAble = false;
var tempCredentials = {
  username: '',
  password: '',
  serverURL: '',
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

/* synchronize write and read to secure storage,
   makes sure if username, password, serverURL set,
   then we can get the credentials/download content
*/
function wroteToSecure() {
  secureParamsStored += 1;
  if (secureParamsStored < 3) {
    return;
  }
  console.log("stored 3 secured params, access content");
  secureParamsStored = 0;
  downloadAble = true;
  app.emit("downloadOk");
}

function readFromSecure() {
  secureParamsStored += 1;
  if (secureParamsStored < 3) {
    return;
  }
  console.log("got 3 secured params");
  accessOnlineContent();
  secureParamsStored = 0;
}

// Events

// track writing credentials from secure storage
app.on('storedCredential', function (key) {
  console.log("We triggered storedCredential Event");
  if (key === "username") {
    console.log("We are incrementing secureParams in stored credential based on username");
    wroteToSecure();
  } else if (key === "password") {
    console.log("We are incrementing secureParams in stored credential based on password");
    wroteToSecure();
  }
  else if (key === "serverURL") {
    console.log("We are incrementing secureParams in stored credential based on serverURL");
    wroteToSecure();
  }
});

// track reading credentials from secure storage
app.on('gotCredential', function (key, value) {
  console.log("We triggered gotCredential Event");
  if (key === "username") {
    console.log("incrementing secure params in got credential by username");
    readFromSecure();
    tempCredentials.username = value;
  } else if (key === "password") {
    console.log("incrementing secure params in got credential by password");
    readFromSecure();
    tempCredentials.password = value;
  }
  else if (key === "serverURL") {
    console.log("incrementing secure params in got credential by serverURL");
    readFromSecure();
    tempCredentials.serverURL = value;
  }
});

// can also trigger to download new video/pdf content
app.on('downloadOk', function () {
  if (downloadAble) {
    console.log("download Ok");
    getCredentials();
  }
});

app.on('login', function () {
  logCount += 1;
  if (logCount === 2) {
    clearCredentials();
  }
});

/* triggered when document id, title and content type
   are finished being gathered from server, then
   parse to separate arrays by content type.
*/
app.on('contentType', function () {
  console.log("got content types");
  // hide pre-loader once we downloaded content
  app.preloader.hide();
  for (var i in documentList) {
    console.log(documentList[i]);
    if (documentList[i].contentType === "video/webm") {
      app.data.videoList.push(documentList[i]);
    } else if (documentList[i].contentType === "application/pdf") {
      app.data.pdfList.push(documentList[i]);
    }
  }
  console.log(app.data.videoList);
  console.log(app.data.pdfList);
  // testing
 // downloadContent(app.data.videoList[0].id);
});


// In page events:
$$(document).on('page:init', '.page[data-name="mediaPlayer"]', function (e) {

  // Do something here when page with data-name="about" attribute loaded and initialized
});

$$(document).on("click", ".videoClick", function(){

  var name  = $$(this).attr("data-name");
  var id = $$(this).attr("data-id");
  console.log(name + "  " + id);
  app.router.navigate('/mediaPlayer/');
});


// show the spinner while we are logging the user in and downloading content.
app.preloader.show('blue');

function downloadContent(id){

  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
    console.log('file system open: ' + fs.name);
    fs.root.getFile('bot.png', { create: true, exclusive: false }, function (fileEntry) {
      console.log('fileEntry is file? ' + fileEntry.isFile.toString());
      var oReq = new XMLHttpRequest();
      var server = appServer + "/" + id + ".xml";
      // Make sure you add the domain name to the Content-Security-Policy <meta> element.
      oReq.open("GET", server, true);
      // Define how you want the XHR data to come back
      oReq.responseType = "blob";
      oReq.onload = function (oEvent) {
        var blob = oReq.response; // Note: not oReq.responseText
        if (blob) {
          // Create a URL based on the blob, and set an <img> tag's src to it.
          var url = window.URL.createObjectURL(blob);
          document.getElementById('bot-img').src = url;
          // Or read the data with a FileReader
          var reader = new FileReader();
          reader.addEventListener("loadend", function() {
            // reader.result contains the contents of blob as text
          });
          reader.readAsText(blob);
        } else console.error('we didnt get an XHR response!');
      };
      oReq.send(null);
    }, function (err) { console.error('error getting file! ' + err); });
  }, function (err) { console.error('error getting persistent fs! ' + err); });
}
// log in to the server to get xml data
function accessOnlineContent() {

  var rawDocuments = {
    rawXML: {}
  };

  var server = appServer + ".xml";
  // send request
  app.request.get(server, {
      username: tempCredentials.username,
      password: tempCredentials.password
    }, function (data) {
      app.emit("login");
      console.log("setting rawData");
      rawDocuments.rawXML = data;
      // ready to download content
      accessOnlineDocuments(rawDocuments.rawXML);
    },
    function (error) {
      alert(error + "The content is not retrievable");
    })
}

// use to re-download media content
function syncOnlineContent() {
  app.preloader.show('blue');
  if (downloadAble) {
    app.emit('gotCredential');
  }else{
    alert('cannot synchronize data');
  }
}

// get XML content from dhis2 web API
function accessOnlineDocuments(rawXML) {
  if (window.DOMParser) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(rawXML.toString(), "text/xml");
    var documents = xmlDoc.getElementsByTagName("documents")[0].childNodes;
    var tempID;
    var semaphoreCount = 0;
    var semaphore = function () {
      semaphoreCount += 1;
      if (semaphoreCount < documents.length) {
        return;
      }
      app.emit('contentType');
    };
    // get a list of ID's and titles
    for (var i in documents) {
      var doc = {
        title: '',
        id: '',
        contentType: ''
      };
      tempID = documents[i].id;
      if (tempID != null) {
        doc.id = tempID;
        doc.title = documents[i].textContent;
        getContentTypes(parser, doc, tempID, semaphore);
        documentList.push(doc);
      }
    }
  }
}

function getContentTypes(parser, doc, id, callback) {
  var server = appServer + "/" + id + ".xml";
  // send request
  app.request.get(server, {}, function (data) {
      var xmlDoc = parser.parseFromString(data, "text/xml");
      var nodeList = xmlDoc.childNodes[0];
      var node = nodeList.childNodes;

      for (var key of node.values()) {
        if (key.nodeName === "contentType") {
          doc.contentType = key.childNodes[0].data;
        }
      }
      callback();
    },
    function (error) {
      alert(error + "The content is not retrievable");
    });
}

// set intent listener, send broadcast
function onLoad() {
  console.log("firing APP");
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
      app.emit("login");
      if (!data.includes(tempCredentials.username)) {
        alert('Login was not successful, please long mHBS tracker-capture');
      }
    },
    function (error) {
      alert('Login was not successful, please long mHBS tracker-capture');
    });
}

// clear tempCredentials
function clearCredentials() {
  tempCredentials.username = '';
  tempCredentials.password = '';
  tempCredentials.serverURL = '';
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
  app.storage.set(function () {
    // set username for our app
    setAppUsername();
    app.emit('storedCredential', "username");
  }, function (error) {
    console.log(error);
  }, 'username', tempCredentials.username);

  app.storage.set(function () {
    app.emit('storedCredential', "password");
  }, function (error) {
    console.log(error);
  }, 'password', tempCredentials.password);

  app.storage.set(function () {
    app.emit('storedCredential', "serverURL");
  }, function (error) {
    console.log(error);
  }, 'serverURL', tempCredentials.serverURL);
}


function getCredentials() {
  app.storage.get(function (value) {
    app.emit('gotCredential', "username", value);
  }, function (error) {
    console.log("username" + error);
  }, 'username');

  app.storage.get(function (value) {
    app.emit('gotCredential', "password", value);
  }, function (error) {
    console.log("password" + error);
  }, 'password');

  app.storage.get(function (value) {
    app.emit('gotCredential', "serverURL", value);
  }, function (error) {
    console.log("serverURL" + error);
  }, 'serverURL');
}


// get the tempCredentials from the JSON
function parseCredentials(intent) {
  return intent.extras['key:loginRequest'];
}

