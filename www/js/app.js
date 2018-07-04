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
  on: {
    pageAfterIn: function (e, page) {
      // do something after page gets into the view
    },
    pageInit: function (e, page) {
      // do something when page initialized
    },
  }
});

// local declarations
var secureParamsStored = 0;
var myPhotoBrowserStandalone;
var myPhotoBrowserPopupDark;
var logCount = 0;
var appServer = 'https://mhbs.info/api/documents';
var documentList = [];
var downloadAble = false;
var ssInactive = true;
var currentID;
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
var videoView = app.views.create('#view-video', {
  url: '/mhbsvideos/'
});
var guideView = app.views.create('#view-guide', {
  url: '/mhbsmain/'
});

var videoListView = app.views.create('#view-videoList', {
  url: '/videoList/'
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
  secureParamsStored = 0;
  app.emit("credentialsRead");
}


// Events
app.on('credentialsRead', function () {
  if (downloadAble) {
    accessOnlineContent();
  } else {
    // reset flag since we are done reading
    downloadAble = true;
    getXMLRequestHeader();
  }
});

app.on('setHeader', function () {
  downloadContent();
});


function getXMLRequestHeader() {
  setHeaders();
  app.emit('setHeader');
}

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
});


app.on("fileStatus", function (status) {
  if (status === null) {
    console.log("File did not exist, downloading file");
    downloadContent();
  } else {
    //display on video player

    /*  console.log(page.context + " IMPORTANT TEST PAGE ");

      var videoPath = "file:///data/user/0/com.example.mHBS/files/files" + status;
      console.log("Our Video Path is " + videoPath);

    // "file:///data/user/0/com.example.mHBS/files/files/AWCswwP6kNl.webm"
      // console.log(JSON.stringify(videoFile));
  /*
  thoughts: issue with 404 not related to xml header request
  first try to get media plkayer just do play blob data
   */
    //console.log(myPhotoBrowserPopupDark + "TEst");
    /*
        mainView.router.load({
          content: myPhotoBrowserPopupDark.open(),
          animatePages: false
        });*/
  }

});


function setXMLRequestHeaders(id) {
  if (downloadAble) {
    // set this access token to false while we are accessing user information to log them into server
    downloadAble = false;
    getCredentials();
  } else {
    console.log("something went wrong");
  }
}

function checkFile() {
  console.log("Checking if File Exists");
  var path = '/' + currentID + ".webm";
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
    console.log("Path to check " + JSON.stringify(fileSystem.root));
    fileSystem.root.getFile(path, {create: false}, fileExists, fileDoesNotExist);
  }, getFSFail); //of requestFileSystem

}

$$(document).on('click', ".pb-standalone-video", function () {
  console.log("in video photoBrowser function");
  currentID = this.id;
  checkFile();
  setXMLRequestHeaders();
});

function fileExists(fileEntry) {
  /*
  var page = $$('.page[data-name="mediaPlayer"]')[0].f7Page;
  console.log("THE FILE ENTRY EXISTS------------" + fileEntry.fullPath);
  console.log(page.$el.find("myVideo").toString() + " IMPORTANT TEST PAGE ");
*/
  var photos = [
    {
      html: '<video controls autoplay><source id="myVideo" src="/data/data/com.example.mHBS/files/files'+fileEntry.fullPath+'" type=\'video/webm;codecs="vp8, vorbis"\'></video>',
      caption: 'test',
    }
  ];

  myPhotoBrowserPopupDark = app.photoBrowser.create({
    photos,
    theme: 'dark',
    type: 'standalone',
    navbar: true,
    toolbar: false,
  });
  myPhotoBrowserPopupDark.open();

  //app.emit("fileStatus", fileEntry.fullPath);
}

function fileDoesNotExist() {
  app.emit("fileStatus", null);
}

function getFSFail(evt) {
  console.log("ERROR COULD NOT GET FILE" + evt.target.error.code);
}

function downloadContent() {
  var id = currentID;

  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

    console.log('file system open: ' + fs.name);

    fs.root.getFile('bot.png', {create: true, exclusive: false}, function (fileEntry) {
      console.log('fileEntry is file? ' + fileEntry.isFile.toString());
      var oReq = new XMLHttpRequest();


      var server = appServer + "/" + id + "/data";
      // Make sure you add the domain name to the Content-Security-Policy <meta> element.
      oReq.open("GET", server, true);
      oReq.setRequestHeader('Authorization', 'Basic ' + btoa(tempCredentials.username + ":" + tempCredentials.password));

      // Define how you want the XHR data to come back
      oReq.responseType = "blob";
      oReq.onload = function (oEvent) {
        var blob = oReq.response; // Note: not oReq.responseText
        if (blob) {

          var reader = new FileReader();
          reader.onloadend = function (evt) {
            // writing the file
            fileToWrite(blob, id);
          };
          reader.readAsDataURL(blob);
        }
        else {
          console.error('we didnt get an XHR response!');
        }
      };
      oReq.send(null);
    }, function (err) {
      console.error('error getting file! ' + err);
    });
  }, function (err) {
    console.error('error getting persistent fs! ' + err);
  });
  //});
};

// write the file
function fileToWrite(obj, id) {
  console.log("Attempting to write file");
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
    console.log('file system open: ' + fs.name);
    fs.root.getFile('/' + id + ".webm", {create: true, exclusive: false}, function (fileEntry) {

      //console.log("fileEntry is file?" + fileEntry.isFile.toString() + fileEntry.fullPath);
      //   fileEntry.name ==
      //    fileEntry.fullPath ==
      writeFile(fileEntry, obj);

    }, function (fs) {
      console.log("Successfully wrote file " + fs.root);
    });

  }, function (fileError) {
    console.log("error writing to file" + fileError);
  });
}


function writeFile(fileEntry, dataObj) {
  // Create a FileWriter object for our FileEntry (log.txt).
  fileEntry.createWriter(function (fileWriter) {
    fileWriter.onwriteend = function () {
      console.log("Successful file write ... " + "file:///data/data/com.example.mHBS/files/files/" + fileEntry.toString());
      //   readFile(fileEntry);
    };

    fileWriter.onerror = function (e) {
      console.log("Failed file write: " + e.toString());
    };

    // If data object is not passed in,
    // create a new Blob instead.
    if (!dataObj) {
      dataObj = new Blob(['some file data'], {type: 'video/ogg'});
    }

    fileWriter.write(dataObj);
  });
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
    getCredentials();
  } else {
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
  console.log("TEST ONLOAD ");

  // if we don't have tempCredentials, send a broadcast, store them, and log the user in
  if (ssInactive) {
    console.log("firing APP");
    window.plugins.intent.setNewIntentHandler(onIntent);
// show the spinner while we are logging the user in and downloading content.
    app.preloader.show('blue');
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
      console.log("Storage Created");
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
        alert('Login was not successful, please login mHBS tracker-capture');
      } else {
        ssInactive = false;
      }
    },
    function (error) {
      alert('Login was not successful, please login mHBS tracker-capture');
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
    console.log("intent not null 11");
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

  console.log("video loaded");
});

$$(document).on('click', ".pb-videoplayer1", function () {
  console.log("in videoplayer1");
  videoView.router.navigate('/mediaplayer/');
  console.log("page navigated");
});


$$(document).on('page:init', '.page[data-name="mediaplayer"]', function (e) {

  console.log("media player init");

  $$(".videoAdd").css(
    {
      'position': 'absolute',
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
      'top': '84%',
      'font-size': '6px',
      'padding': '6px'
    }
  );
  $$("#seek").css(
    {
      //'left':'74.3%',
      'font-size': '16px',
      'width': '90%'
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
      'position': 'fixed',
      'top': '70%',
      'width': '100%'
    }
  );


  var video = document.getElementById("myVideo");
  var btn = document.getElementById("myBtn");

  $$('#myBtn').on('click', function () {
    console.log("In function");
    if (video.paused) {
      video.play();
      btn.innerHTML = "Pause";
      btn.className = "col button button-small button-round button-fill color-red";
    } else {
      video.pause();
      btn.innerHTML = "Play";
      btn.className = "col button button-small button-round button-fill color-green";
    }
  });

  $$('#vol-filter').on('range:change', function (e, range) {
    video.volume = range.value;
  });


  $$('#seekButton2').on('click', function (e) {
    console.log("+");
    video.currentTime = video.currentTime + 2.5;
  });
  $$('#seekButton1').on('click', function (e) {
    console.log("-");
    video.currentTime = video.currentTime - 2.5;
  });

  $$('#myVideo').on('timeupdate', function (e) {
    var pos = video.currentTime * (100 / video.duration);
    app.progressbar.set('#progress-bar', pos);
  });

  $$('#myVideo').on('timeupdate', function (e) {
    var curmin = Math.floor(video.currentTime / 60);
    var cursec = Math.floor(video.currentTime - curmin * 60);
    var durmin = Math.floor(video.duration / 60);
    var dursec = Math.floor(video.duration - durmin * 60);
    var cutime = document.getElementById("currenttime");
    var dutime = document.getElementById("durationtime");
    if (dursec < 10) {
      dursec = "0" + dursec;
    }
    if (durmin < 10) {
      durmin = "0" + durmin;
    }

    if (cursec < 10) {
      cursec = "0" + cursec;
    }
    if (curmin < 10) {
      curmin = "0" + curmin;
    }
    cutime.innerHTML = curmin + ":" + cursec;
    dutime.innerHTML = durmin + ":" + dursec;
  });
});

