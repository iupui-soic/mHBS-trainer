var $$ = Dom7;
// Framework7 App main instance
var app = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.testapp', // App bundle ID
  name: 'Framework7', // App name
  theme: 'auto',
  // Automatic theme detection
  // App root data
  data: function(){
    return {
      user: {
        username: 'DemoUser',
        pin: null
      },
      // secure local storage to hold credentials
      storage: {},
      // video and PDF content
      pdfList: [],
      videoList: [],
      offlineMode: false,
      timeOffline: {
        startTime: Date,
        endTime: Date,
        date: "",
      }
    };
  },
  // App root methods
  methods: {
    triggerOnlineContent: function () {
      console.log("trigger downloading content");
      if (download) {
        app.preloader.show();
        console.log("We can download");
        accessOnlineContent();
        download = false;
      }
      else {
        console.log("Other credentials Read");
        // reset flag since we are done reading
        downloadAble = true;
        setHeaders();
      }
    },
    initialize: function(){
      return this.data
    }
  },
  // App routes
  routes: routes,
});

// local declarations
var secureParamsStored = 0;
var myPhotoBrowserPopupDark;
var logCount = 0;
var videoCaption = "";
var appServer = 'https://mhbs.info/api/';
var documentList = [];
var downloadAble = false;
var ssInactive = true;
var currentID;
var appLaunches = 0;
var networkUsage = 1;
var paused = 0;
var tempCredentials = {
  username: '',
  password: '',
  serverURL: '',
};
var download = false;
var storage = window.localStorage;


// Init/Create views
var homeView = app.views.create('#view-home', {
  url: '/'
});
var viewFavorites = app.views.create('#view-favorites', {
  url: '/favorites/'
});
var guideView = app.views.create('#view-guide', {
  url: '/mhbsmain/'
});
var view = app.views.create('#view-videoList', {
  url: '/videoList/'
});

//todo: change to tei org unit
var eventPayload = {
  "program": "dbEHq0V0V5j",
  "orgUnit": "Hm0rRRXqFi5",
  "eventDate": "",
  "status": "COMPLETED",
  "storedBy": "admin",
  "coordinate": {
    "latitude": 59.8,
    "longitude": 10.9
  },
  "dataValues": [
    // Number of abrupt exits or incomplete workflow for mHBS training app
    {"dataElement": "ZYQJ87n45ye", "value": ""},
    // Number of mHBS training app logins by pin
    {"dataElement": "getqONgfDtE", "value": ""},
    // Number of minutes mHBS training app was used offline
    {"dataElement": "qOyP28eirAx", "value": ""},
    // Number of screens used in mHBS training app
    {"dataElement": "RrIe9CA11n6", "value": ""},
    // Number of times mHBS training app was started
    {"dataElement": "BgzISR1GmP8", "value": ""},
    // Number of times mHBS training app was with network usage
    {"dataElement": "qbT1F1k8cD7", "value": ""},
  ]
};

// todo: automate
var checkboxVals = {
  'check1a1': false,
  'check1a2': false,
  'check1a3': false,
  'check1a4': false,
  'check1b1': false,
  'check1b2': false,
  'check1b3': false,
  'check1b4': false,
  'check1c1': false,
  'check1c2': false,
  'check1c3': false,
  'check1c4': false,
  'check1c5': false,
  'check1c6': false,
  'check1c7': false,
  'check2a1': false,
  'check2a2': false,
  'check2a3': false,
  'check2a4': false,
  'check2b1': false,
  'check2b2': false,
  'check2b3': false,
  'check2b4': false,
  'check2c1': false,
  'check2c2': false,
  'check2c3': false,
  'check2c4': false,
  'check2d1': false,
  'check2d2': false,
  'check2d3': false,
  'check2d4': false,
  'check2e1': false,
  'check2e2': false,
  'check2e3': false,
  'check2e4': false,
  'check2e5': false,
  'check2e6': false,
  'check2e7': false,
  'check2e8': false,
  'check3a1': false,
  'check3a2': false,
  'check3a3': false,
  'check3a4': false,
  'check3b1': false,
  'check3b2': false,
  'check3b3': false,
  'check3b4': false,
  'check3c1': false,
  'check3c2': false,
  'check3c3': false,
  'check3c4': false,
  'check3c5': false,
  'check3c6': false,
  'check3c7': false,
  'check3c8': false,
  'check3c9': false,
  'check3c10': false,
  'check3d1': false,
  'check3d2': false,
  'check3d3': false,
  'check3d4': false,
  'check3e1': false,
  'check3e2': false,
  'check3e3': false,
  'check3e4': false,
  'check3f1': false,
  'check3f2': false,
  'check3f3': false,
  'check3f4': false,
  'check3g1': false,
  'check3g2': false,
  'check3g3': false,
  'check3g4': false,
  'check3g5': false,
  'check3g6': false,
  'check3g7': false,
  'check3g8': false,
  'check3g9': false,
  'check3g10': false,
  'check3g11': false,
  'check3g12': false,
  'check4a1': false,
  'check4a2': false,
  'check4a3': false,
  'check4a4': false,
  'check4b1': false,
  'check4b2': false,
  'check4b3': false,
  'check4b4': false,
  'check4c1': false,
  'check4c2': false,
  'check4c3': false,
  'check4c4': false,
  'check4d1': false,
  'check4d2': false,
  'check4d3': false,
  'check4d4': false,
  'check4e1': false,
  'check4e2': false,
  'check4e3': false,
  'check4e4': false,
  'check4e5': false,
  'check4e6': false,
  'check4e7': false,
  'check4e8': false,
  'check4e9': false,
  'check4e10': false,
};

// gets all the pages defined in pages/ and adds to page visits
function setupPageVisits() {
  if (storage.getItem("pageVisits") === null) {
    for (var i in this.app.routes) {
      var pageName;
      var route = this.app.routes[i];
      if (route.url != null) {
        if (route.url.includes("pages")) {
          pageName = route.url.split("/").pop();
          pageName = pageName.substring(0, pageName.indexOf(".html"));
          storage.setItem(pageName, JSON.stringify(0));
        }
      }
    }
    storage.setItem("pageVisits", "true");
  }

}

// set up checkbox values and pages to collect metrics
function setupCheckBoxValues() {
  if (localStorage.getItem("checkboxVals") === null) {
    for (var checkBoxName in checkboxVals) {
      storage.setItem(checkBoxName, JSON.stringify(checkboxVals[checkBoxName]));
    }
  }
}

//*swiper
var swiper = app.swiper.create('.swiper-container', {
  speed: 400,
  spaceBetween: 100
});

// Events
app.on('credentialsRead', function () {
  if (downloadAble) {
    app.preloader.hide();
    download = true;
  }
});

// Events
app.on('wentOnline', function () {
  var timeElapsed = calculateElapsedTime(app.data.timeOffline.startTime, app.data.timeOffline.endTime);
  var storedOfflineTime = storage.getItem("timeOffline");
  if (storedOfflineTime === null) {
    storage.setItem("timeOffline", timeElapsed);
  }
  else {
    storedOfflineTime = storedOfflineTime + "," + timeElapsed;
    console.log("stored offline time: " + storedOfflineTime);
    storage.setItem("timeOffline", storedOfflineTime);
  }
  app.data.timeOffline.startTime = null;
  app.data.timeOffline.endTime = null;
});

// Events
app.on('launch', function () {
  storage.setItem("appLaunches", JSON.stringify(appLaunches++));
  // always post when app launches if the app pin is set
  console.log("We launched the app");
  //todo: figure out null error
  if(app.data.user.pin!=null) {
    postEventData();
  }
});

// set basic auth request header
function setHeaders() {
  console.log("Setting Headers");
  app.request.setup({
    headers: {
      'Authorization': 'Basic ' + btoa(tempCredentials.username + ":" + tempCredentials.password)
    }
  });
//  app.emit('setHeader');
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
    if (documentList[i].contentType === "video/webm") {
      app.data.videoList.push(documentList[i]);
    } else if (documentList[i].contentType === "application/pdf") {
      app.data.pdfList.push(documentList[i]);
    }
  }
  if (app.data.videoList.length > 0) {
    $$("#updateFavorites").show();
  }
  console.log(app.data.videoList);
  console.log(app.data.pdfList);

  homeView.router.navigate('/videoList/');
});


app.on("fileStatus", function (filePath) {
  console.log("FULL FILE PATH TO ACCESS:" + "/data/data/com.example.mHBS/files/files" + filePath);

  var photos = [
    {
      html: '<video controls autoplay><source id="myVideo" src="/data/data/com.example.mHBS/files/files' + filePath + '" type=\'video/webm;codecs="vp8, vorbis"\'></video>',
      captions: '',
    }
  ];

  myPhotoBrowserPopupDark = app.photoBrowser.create({
    photos,
    theme: 'dark',
    type: 'popup',
    navbar: true,
    navbarOfText: "/",
    toolbar: false,
  });
  app.preloader.hide();
  myPhotoBrowserPopupDark.open();
});


function setXMLRequestHeaders() {
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

/* synchronize write and read to secure storage,
   makes sure if username, password, serverURL set,
   then we can get the credentials/download content
*/
function wroteToSecure() {
  secureParamsStored += 1;
  if (secureParamsStored < 3) {
    return;
  }
  console.log("stored 3 secured params, set downloadable = True");
  secureParamsStored = 0;
  downloadAble = true;
  // if we wrote three credentials, proceed to download
  app.emit("downloadOk");
}

// read values from secure storage
function readFromSecure() {
  secureParamsStored += 1;
  if (secureParamsStored < 3) {
    return;
  }
  console.log("got 3 secured params");
  secureParamsStored = 0;
  // three credentials read
  app.emit("credentialsRead");
}


$$(document).on('click', ".pb-standalone-video", function () {
  console.log(this);
  currentID = this.id;
  videoCaption = this.innerText;
  checkFile();
  setXMLRequestHeaders();
});

$$(document).on('click', ".mHBSTracker", function () {
  window.plugins.intentShim.startActivity(
    {
      component:
        {
          "package": "org.hisp.dhis.android.trackercapture",
          "class": "org.hisp.dhis.android.sdk.ui.activities.SplashActivity"
        }
    },
    function (intent) {
      console.log("success" + intent);
    },
    function () {
      console.log("fail");
    }
  );
});

// toasts to alert when user has added to favorites
var favoriteToastSuccess = app.toast.create({
  icon: app.theme === 'ios' ? '<i class="f7-icons">star</i>' : '<i class="material-icons">star</i>',
  text: 'Successfully added to favorites',
  position: 'center',
  closeTimeout: 2000,
});

var favoriteToastErr = app.toast.create({
  icon: app.theme === 'ios' ? '<i class="f7-icons">star</i>' : '<i class="material-icons">star</i>',
  text: 'Item is already added to favorites',
  position: 'center',
  closeTimeout: 2000,
});


// add to favorites when we click favorites button
function addToFavorites(id) {
  // grab the id of the item to add
  var id = id.slice(1, -1);
  // get local storage
  var storage = window.localStorage;
  // get favorites list of user
  var storedFavorites = storage.getItem(app.data.user.username + "favorites");
  // item to append
  var appendToFavorites;
  var favoritesArray = [];
  // if this is the first favorite for the user, create a key/value pair
  if (storedFavorites === null) {
    appendToFavorites = id;
  } else {
    appendToFavorites = storedFavorites + "," + id;
    // turn to array
    favoritesArray = storedFavorites.split(',');
  }
  // check if the id passed in is already in the favorites list
  if (favoritesArray.includes(id)) {
    favoriteToastErr.open();
  } else {
    storage.setItem(app.data.user.username + "favorites", appendToFavorites);
    favoriteToastSuccess.open();
  }
}

// triggered when we open favorites
$$(document).on('click', "#updateFavorites", function () {
  // get storage
  var storage = window.localStorage;

  var favorites = storage.getItem(app.data.user.username + "favorites");
  if (favorites != null) {
    var favoritesToArr = favorites.split(',');

    for (var i in app.data.videoList) {
      for (var j in favoritesToArr) {
        if (app.data.videoList[i].id === favoritesToArr[j]) {
          if (!app.data.videoList[i].isFavorite) {
            app.data.videoList[i].isFavorite = true;
          }
        }
      }
    }
  }
});

// remove from favorites
function removeFromFavorites(param) {
  // holds the index and id of element
  var arr = param.split(",");
  var id = arr[0];
  var index = arr[1];

  // un-mark this element from favorites
  app.data.videoList[index].isFavorite = false;

  // updating storage
  var favorites = storage.getItem(app.data.user.username + "favorites");
  if (favorites != null) {
    var favoritesToArr = favorites.split(',');
    var newValue = "";
    favoritesToArr = favoritesToArr.filter(item => item !== id);
    console.log("favorites arr length" + favoritesToArr.length);
    for (var i in favoritesToArr) {
      newValue += "," + favoritesToArr[i];
    }
    storage.setItem(app.data.user.username + "favorites", newValue);
  }
}


function fileExists(fileEntry) {
  app.emit("fileStatus", fileEntry.fullPath);
}

//TODO: need to prevent anything other than binary data writing to file
function fileDoesNotExist() {
  console.log("File does not Exist");
  app.preloader.show('blue');
  downloadContent();
}

function getFSFail(evt) {
  console.log("ERROR COULD NOT GET FILE" + evt.target.error.code);
}

function downloadContent() {
  var id = currentID;
  console.log("LOGIN INFO" + tempCredentials.username + " " + id + " " + tempCredentials.password);
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
    console.log('file system open: ' + fs.name);
    fs.root.getFile('bot.png', {create: true, exclusive: false}, function (fileEntry) {
      console.log('fileEntry is file? ' + fileEntry.isFile.toString());
      var oReq = new XMLHttpRequest();
      var server = appServer + "documents/" + id + "/data";
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
}

// write the file
function fileToWrite(obj, id) {
  console.log("Attempting to write file");
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
    console.log('file system open: ' + fs.name);
    fs.root.getFile('/' + id + ".webm", {create: true, exclusive: false}, function (fileEntry) {
      writeFile(fileEntry, obj);
    }, function (fs) {
      // successfully wrote file, display
      //  console.log("Successfully wrote file " + fs.toString());
      //    app.emit("fileStatus",fs);
    });
  }, function (fileError) {
    console.log("error writing to file" + fileError);
  });
}


function writeFile(fileEntry, dataObj) {
  // Create a FileWriter object for our FileEntry (log.txt).
  fileEntry.createWriter(function (fileWriter) {
    fileWriter.onwriteend = function () {
      app.emit("fileStatus", fileEntry.fullPath);
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
  var server = appServer + "documents.xml";
  console.log("Access Online Content");
  // send request
  app.request.get(server, {
      username: tempCredentials.username,
      password: tempCredentials.password
    }, function (data) {
      app.emit("login");
      rawDocuments.rawXML = data;
      // ready to download content
      console.log("Getting list of elements");
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
    // artificially make it so only one video shows
    var semaphoreCount = 0;
    var semaphore = function () {
      // semaphoreCount += 1;
      // if (semaphoreCount < documents.length) {
      //   return;
      // }
      // app.emit('contentType');
    };
    // get a list of ID's and titles
    //for (var i in documents) {
    for (var i = 0; i < 1; i++) {
      console.log(i);
      var doc = {
        title: '',
        id: '',
        contentType: '',
        duration: '',
        isFavorite: false
      };
      tempID = documents[i].id;
      console.log(tempID);
      if (tempID != null) {
        doc.id = tempID;
        // grabs video durations, but too time consuming currently
        parseMetaData(doc);
        doc.title = documents[i].textContent;
        console.log(doc.title);

        getContentTypes(parser, doc, tempID, semaphore);
        documentList.push(doc);
      }
    }
  }
}

function parseMetaData(doc) {
  console.log("Parsing Meta Data");
  var video = document.createElement("video");
  var server = appServer + "documents/" + doc.id + "/data";
  var req = new XMLHttpRequest();
  req.open('GET', server, true);
  req.responseType = 'blob';
  req.onload = function () {

    if (this.status === 200) {
      var videoBlob = this.response;
      console.log(this.response);
      video.src = window.URL.createObjectURL(videoBlob);

      video.addEventListener("loadedmetadata", function () {
        var minutes = Math.floor(video.duration / 60);
        var seconds = (video.duration % 60).toFixed(0);
        if (seconds.toString().length === 1) {
          seconds = seconds.toString().concat("0");
        }
        doc.duration = minutes + ":" + seconds;
        app.emit('contentType');

      });

    }
  };
  req.onerror = function (e) {
    console.log(e);
  };
  req.send();
}

function getContentTypes(parser, doc, id, callback) {
  var server = appServer + "documents/" + id + ".xml";
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


// check offline/online mode
document.addEventListener("deviceready", function (e) {
  document.addEventListener("offline", wentOffline, false);
  document.addEventListener("online", wentOnline, false);
  document.addEventListener("pause", onPause, false);
});

onPause = function(){
  console.log("app was paused");
  paused++;
};


wentOffline = function (e) {
  // if we started the app and have never been online, networkUsage = 0,
  // otherwise it starts at 1.
  //todo: test
  if((parseInt(storage.getItem("appLaunches"))===0)){
    networkUsage = 0;
  }
  app.preloader.show('blue');
  console.log(e + "Went offline");
  app.data.timeOffline.startTime = new Date();
  alert("Please connect to the internet to use the mHBS training app");
  app.data.offlineMode = true;
};

wentOnline = function (e) {
  networkUsage++;
  app.preloader.hide();
  app.data.timeOffline.endTime = new Date();
  console.log(e + "Went online");
  app.data.offlineMode = false;
  //trigger
  app.emit("wentOnline");
};


function calculateElapsedTime(startTime, endTime) {
  console.log("start and end: " + startTime + " " + endTime);
  if (startTime <= endTime) {
    var seconds = Math.round((endTime - startTime) / 1000);
    console.log("seconds in calculation: " + seconds);
    if(seconds<=60){
      return seconds + "s";
    }else {
      var minutes = Math.round(seconds / 60);
      console.log("minutes in calculation: " + minutes);
      return minutes;
    }
  } else {
    return 0;
  }
}


// set intent listener, send broadcast
function onLoad() {
  console.log("loading app ");
  setupPageVisits();
  setupCheckBoxValues();
  setUpCheckBoxListeners();
  setUpPageEvents();

/*
  // shows data property but
  console.log(app);
  // undefined
  console.log(app.data);

    /* does not show data property
  for(var propName in this.app) {
    var propValue = this.app[propName];
    console.log("app: " + propName,propValue);
  }
  */



  // if we don't have tempCredentials, send a broadcast, store them, and log the user in
  if (ssInactive) {
    console.log("firing APP");
    $$("#updateFavorites").hide();

    window.plugins.intentShim.onIntent(onIntent);

    app.preloader.show('blue');
    // set up secure storage
    this.app.storage = ss();
    sendBroadcastToTracker();
  }
}


// send broadcast to tracker capture
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

// login
function logIn() {
  var server = tempCredentials.serverURL + "api/26/me/";
  console.log(tempCredentials.username);
  console.log(tempCredentials.password);
  console.log(tempCredentials.serverURL);
  // send request
  app.request.get(server, {
      username: tempCredentials.username,
      password: tempCredentials.password
    }, function (data) {
      app.emit("login");
      if (!data.includes(tempCredentials.username)) {
        credentialsFailAlert();
      } else {
        ssInactive = false;
      }
    },
    function (error) {
      // if we have internet and reached here display error
      if (!app.data.offlineMode) {
        credentialsFailAlert();
      }
    });

}

function credentialsFailAlert() {
  alert('Login was not successful, please login mHBS tracker-capture ');
}

// clear tempCredentials
function clearCredentials() {
  console.log("Clearing Credentials");
  tempCredentials.username = '';
  tempCredentials.password = '';
  tempCredentials.serverURL = '';
}

// set user name for our app
function setAppUsername() {
  console.log("setAppUsername");
  app.storage.get(function (value) {
    app.data.user.username = value;
    trackNumLoginsByPin();
  }, function (error) {
    console.log(error);
  }, 'username');
}

function trackNumLoginsByPin(){
  console.log("TRACKING PINS");
  // todo: pass over from tracker
  app.data.user.pin = "M5zQapPyTZI";
  var numLogins = storage.getItem(app.data.user.pin);
  console.log("stored logins "  + numLogins);
  if(isNaN(parseInt(numLogins)) || parseInt(numLogins)===0)  {
    numLogins = 1;
  }else{
   numLogins = parseInt(numLogins) + 1;
  }
  storage.setItem(app.data.user.pin, JSON.stringify(numLogins));
}

// handle any incoming intent
function onIntent(intent) {

  //` clear out the intent handler
  var credentialsArr = parseCredentials(intent);
  if (credentialsArr != null) {
    if (credentialsArr.length === 3) {
      console.log("length of tempCredentials " + credentialsArr.length);
      tempCredentials.username = credentialsArr[0];
      tempCredentials.password = credentialsArr[1];
      tempCredentials.serverURL = credentialsArr[2];
      // set app headers
      setHeaders();
      if (!isEmpty(tempCredentials.username) && !isEmpty(tempCredentials.password) && !isEmpty(tempCredentials.serverURL)) {
        //todo: errors out if attempting to use app.data.tempCredentials
        // storeCredentials
        storeCredentials();
        // login
        logIn();
      }
    } else {
      loginAlert();
    }
  }
  app.emit("launch");
}

function loginAlert() {
  alert("Please login tracker-capture");
}

function isEmpty(str) {
  return (!str || 0 === str.length);
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
  if (intent != null) {
    console.log(intent);
    if (intent.extras != null) {
      return intent.extras['key:loginRequest'];
    }
  } else {
    loginAlert();
  }
}

// Helpers ----------

function getDateStamp() {
  var currentDate = new Date();
  return currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();
}

function getDateTimeStamp() {
  var currentDate = new Date();
  return getDateStamp() + "  " + getTimeStamp();
}

function getTimeStamp() {
  var currentDate = new Date();
  return currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
}

// send to fabric
function sendAnswerToFabric(pageName) {
  window.fabric.Answers.sendContentView("mHBSguide", "timestamps", 1234, {"username page startTime": app.data.user.username + pageName + getDateTimeStamp()});
}

// log page visits
function logPageVisit(pageName) {
  var numberOfPageVisits = localStorage.getItem(pageName);
  console.log("Page Name: " + pageName);
  console.log("Number of Page Visits: " + numberOfPageVisits);
  numberOfPageVisits = parseInt(numberOfPageVisits) + 1;
  storage.setItem(pageName, numberOfPageVisits);
}

// used to initialize checkboxes to false
function initCheckboxesToFalse() {
  $$('input[type="checkbox"]').prop('checked', false);
}

// initializes checkboxes to stored values
function initCheckboxesToStoredVal(checkBoxes) {
  for (var i = 0; i < checkBoxes.length; i++) {
    var checkBoxVal = storage.getItem(checkBoxes[i].id);
    if (checkBoxVal === true) {
      document.getElementById(checkBoxes[i].id).checked = true;
    } else {
      document.getElementById(checkBoxes[i].id).checked = false;
    }
  }
}

// set up checkbox listeners for whole app
function setUpCheckBoxListeners() {
  for (var key in checkboxVals) {
    var checkboxDomID = "#" + key;
    $$(document).on('change', checkboxDomID, function () {
      var checkboxVal = storage.getItem(key);
      if (this.checked) {
        checkboxVal = true;
      } else {
        checkboxVal = false;
      }
      storage.setItem(key, JSON.stringify(checkboxVal));
    })
  }
}

// set up page events for all pages in app
function setUpPageEvents() {
  for (var i in this.app.routes) {
    var pageName;
    var route = this.app.routes[i];
    if (route.url != null) {
      if (route.url.includes("pages")) {
        pageName = route.url.split("/").pop();
        pageName = pageName.substring(0, pageName.indexOf(".html"));
        setUpPageBeforeInEvent(pageName);
        setUpPageBeforeOutEvent(pageName);
        setUpAfterOutEvent(pageName);
      }
    }
  }
}

// set up page before in events
function setUpPageBeforeInEvent(pageName) {
  $$(document).on('page:beforein', '.page[data-name="' + pageName + '"]', function (e, page) {
    // sendAnswerToFabric(page.name);
    logPageVisit(page.name);
    // if the page has checkboxes, init checkboxes to stored value
    var checkBoxes = $$('input[type="checkbox"]');
    if (checkBoxes.length > 0) {
      console.log("this page has checkboxes");
      initCheckboxesToStoredVal(checkBoxes);
    } else {
      console.log("this page does not have checkboxes");
    }
  });
}

// set up page before out events
function setUpPageBeforeOutEvent(pageName) {
  $$(document).on('page:beforeout', '.page[data-name="' + pageName + '"]', function (e, page) {
    // sendAnswerToFabric(page.name);
  });
}

// set up page after out events
function setUpAfterOutEvent(pageName) {
  $$(document).on('page:afterout', '.page[data-name="' + pageName + '"]', function (e, page) {
    // sendAnswerToFabric(page.name);
  });
}


function postEventData() {

  console.log("PIN " + app.data.user.pin);


  eventPayload['eventDate'] = getDateStamp();
  console.log("sending Payload: " + JSON.stringify(eventPayload));

  for (var i in eventPayload['dataValues']) {
    // todo: check this val
    // Number of abrupt exits or incomplete workflow for mHBS training app
    if(eventPayload['dataValues'][i].dataElement === 'ZYQJ87n45ye'){
      eventPayload['dataValues'][i].value = paused;
    }
    // send time offline in minutes
    else if (eventPayload['dataValues'][i].dataElement === 'qOyP28eirAx') {
        eventPayload['dataValues'][i].value = getStoredTimeOffline();
    }
    // send logins by pin
    else if(eventPayload['dataValues'][i].dataElement === 'getqONgfDtE'){
       eventPayload['dataValues'][i].value = storage.getItem(app.data.user.pin);
    }
    // get number of screens
    else if(eventPayload['dataValues'][i].dataElement === 'RrIe9CA11n6'){
      eventPayload['dataValues'][i].value = getNumberOfScreens();
    }
    // number of times app was started
    else if(eventPayload['dataValues'][i].dataElement === 'BgzISR1GmP8'){
      eventPayload['dataValues'][i].value = storage.getItem("appLaunches");
    }
    // number of times there was network usage
    else if(eventPayload['dataValues'][i].dataElement === 'qbT1F1k8cD7'){
      eventPayload['dataValues'][i].value = networkUsage;

    }
    console.log("EVENT PAY: " + eventPayload['dataValues'][i].value);
    console.log("-----------------");
  }

  postPayload();
  // clearPayloadValues();
}

function clearPayloadValues(){
  // resetting values
  networkUsage = 1;
  storage.setItem("appLaunches", JSON.stringify(0));
  setupPageVisits();
  storage.setItem(app.data.user.pin,JSON.stringify(0));
  storage.setItem("timeOffline",null);
}

function postPayload(){
  var eventServer = appServer + "26/events/";
  app.storage.get(function (value) {
    console.log(app.data.user.username + value);
    app.request.post(eventServer, { username:app.data.user.username, password: value, data: eventPayload}, function (data) {
      console.log('data was posted');
    });
  }, function (error) {
    console.log("Could not post data " + error);
  }, 'password');
}

function getNumberOfScreens(){
  var numberOfScreens = 0;
    for (var i in this.app.routes) {
      var pageName;
      var route = this.app.routes[i];
      if (route.url != null) {
        if (route.url.includes("pages")) {
          pageName = route.url.split("/").pop();
          pageName = pageName.substring(0, pageName.indexOf(".html"));
          if(storage.getItem(pageName)!=0) {
            numberOfScreens++;
          }
        }
      }
  }
  return numberOfScreens;
}

function convertSecondsToMinutes(seconds){
  return Math.round(seconds/60);
}

function clearStorage(){
  storage.setItem("elapsedTime",null);
}

// combine stored seconds and minutes offline
function getStoredTimeOffline() {
  var elapsedTimes = storage.getItem('timeOffline');
  var elapsedTimeArr = elapsedTimes.split(",");
  var minutes = 0;
  var seconds = 0;

  for (var t in elapsedTimeArr) {
    if (elapsedTimeArr[t].includes("s")) {
      // accumulate seconds
      seconds += parseInt(elapsedTimeArr[t].substring(0, elapsedTimeArr[t].length - 1));
    }
    else {
      // accumulate minutes
      if (!isNaN(parseInt(elapsedTimeArr[t]))) {
        minutes += parseInt(elapsedTimeArr[t]);
      }
    }
  }

// if the seconds make up more than a minute, add it to minutes offline
  if (seconds > 60) {
    minutes += convertSecondsToMinutes(seconds);
  }

  return minutes;
}
