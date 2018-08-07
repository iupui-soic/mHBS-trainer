var $$ = Dom7;
// Framework7 App main instance
var app = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.testapp', // App bundle ID
  name: 'Framework7', // App name
  theme: 'auto',
  init: false,
  // Automatic theme detection
  // App root data
  data: function () {
    return {
      user: {
        username: 'DemoUser',
        pin: ''
      },
      intentReceived: false,
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
        //setHeaders();
      }
    },
    initialize: function () {
      return this.data
    }
  },
  // App routes
  routes: routes,
});

// initialize app manually, ensures app.data attributes are instantiated from the start
app.init();

// local declarations
var secureParamsStored = 0;
var myPhotoBrowserPopupDark;
var logCount = 0;
var videoCaption = "";
var appServer = 'https://mhbs.info/api/';
var documentList = [];
var downloadAble = false;
var secureStorageInactive = true;
var currentID;
var appLaunches = 0;
var metaDataLoaded = 0;
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

// swiper for images
var swiper = app.swiper.create('.swiper-container', {
  speed: 400,
  spaceBetween: 100
});

// show login screen
var ls = app.loginScreen.create({el: '#login-screen'});
ls.open(false);


function onLoad(){
  console.log("onLoad");

  // if we don't have credentials in secure storage, send a broadcast, store them, and log the user in
  if (secureStorageInactive) {
    // todo: remove
    console.log("firing APP");
    $$("#updateFavorites").hide();
    // intent callback received from tracker-capture
    window.plugins.intentShim.onIntent(onIntent);
    // show the preloader while we wait for credentials from tracker-capture
    // set up secure storage, in the callback, broadcast to tracker
    app.data.storage = ss();
  }
}

// login
$$('.login-button').on('click', function () {
  app.preloader.show('blue');
  setupPageVisits();
  setupCheckBoxValues();
  setUpCheckBoxListeners();
  setUpPageEvents();
  var pinPlaceholder = $$('#inputPin input');
  /*
  if(app.data.user.pin!==''){
     // can be used to fill in the value of the pin placeholder
    // pinPlaceholder.html("<input type=\"text\" name=\"selectPin\" placeholder="+app.data.user.pin+">");
    // can be used to fill in the value of the pin input box
    pinPlaceholder.val(app.data.user.pin);
  }
  */

  // when we are logged in, create our home view and close the login
  if(!app.data.intentReceived){
    app.preloader.show('blue');
    // try to send another broadcast
    sendBroadcastToTracker();
    // simulate login click
  }else {
    console.log("Intent received " + app.data.intentReceived);
    app.views.create('#view-home', {url: '/'});
    app.data.intentReceived = false;
    ls.close();
  }
  if(downloadAble){
    app.preloader.hide();
  }
});

//todo: change to correct org unit, fill in eventDate, coordinates, storedBy
// Event Payload with params relating to mHBS training app posted to the program events on DHIS2
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

// Local storage setup ------------------

// checkboxes pertaining to the mHBS guide
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

// gets all the pages defined in pages/ and adds to page visits when we first initialize
function setupPageVisits() {
  // "pageVisits" is a pseudo storage item to check if we initialized all the pages
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

// sets the storage item which holds time we have been without internet on app initialize
function setupTimeOffline() {
  if (storage.getItem("timeOffline") === null) {
    storage.setItem("timeOffline", JSON.stringify(0));
  }
}

// set up checkbox values pertaining to mHBS guide on app initialize
function setupCheckBoxValues() {
  if (localStorage.getItem("checkboxVals") === null) {
    for (var checkBoxName in checkboxVals) {
      storage.setItem(checkBoxName, JSON.stringify(checkboxVals[checkBoxName]));
    }
  }
}

// Events ------------------

// event where all three credentials were correctly read, so we can set the download access token
app.on('credentialsRead', function () {
  // we still have tempCredentials, which means we haven't logged in yet
  if (tempCredentials != null) {
    // clear the temp credentials, since we stored them in secure storage
    clearTempCredentials();
    // login
    getPasswordFromSecure(logIn);
  }
  if (downloadAble) {
    app.preloader.hide();
    // todo: optimize
    download = true;
  }
});

// event triggered when network goes online, calculates time between offline and online and sets to storage
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
  // reset start and end times for next round where we go offline/online
  app.data.timeOffline.startTime = null;
  app.data.timeOffline.endTime = null;
});

// set basic auth request header
function setHeaders() {
  // todo: remove
  console.log("Setting Headers");
  app.request.setup({
    headers: {
      'Authorization': 'Basic ' + btoa(tempCredentials.username + ":" + tempCredentials.password)
    }
  });
}

// track writing credentials to secure storage, only continue with three calls, which emits to 'downloadOk'
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

// track reading credentials from secure storage, only continue with three calls, which emits to 'credentials read'
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


// we are positive credentials were written, so we can get them and login
app.on('wroteCredentials', function () {
  getCredentials();
});

/* triggered when document id, title and content type
   are finished being gathered from server, then
   parse to separate arrays by content type.
*/
app.on('contentType', function () {
  metaDataLoaded = metaDataLoaded + 1;
  if(metaDataLoaded<2){
    return;
  }else{
    metaDataLoaded = 0;
  }
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
  /* currently have it set so the favorites tab shows only if there are lists of videos downloaded,
  // todo: suggest to improve this functionality to something more user friendly
   */
  if (app.data.videoList.length > 0) {
    $$("#updateFavorites").show();
  }
  // todo: remove
  console.log(app.data.videoList);
  console.log(app.data.pdfList);
  // routes user to video list once lists of content are loaded
  homeView.router.navigate('/videoList/');
});

// takes the file name of the path to access if we found the file on device or wrote the file to device
app.on("fileOnDevice", function (filePath) {
  // todo: remove
  console.log("FULL FILE PATH TO ACCESS:" + "/data/data/com.example.mHBS/files/files" + filePath);
  /* this variable must be named photos, if the name is changed, this will not work.
   That is because it is defined in photo browser in framework7
  */
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
  // ready to show video
  app.preloader.hide();
  myPhotoBrowserPopupDark.open();
});


// Click Events ------------

/* triggered when we click on a video item in the list in /videoList/
// get the id of the video, check if it exists already, get permission to download
 */
$$(document).on('click', ".pb-standalone-video", function () {
  // todo: remove
  console.log(this);
  currentID = this.id;
  videoCaption = this.innerText;
  checkFile();
  getDownloadAccessToken();
});

/* triggered when we click on mhbs tracker in the left panel sidebar of index.html
   ues darryncampbell intent plugin
*/
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

/* triggered when we open favorites in /favoritesList/ because we need to make sure we
  show the most recently added favorites
*/
$$(document).on('click', "#updateFavorites", function () {
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

/* basically while we are downloading shows the preloader
   //todo @liz soon will probably remove this, but will need to modify
 */
function getDownloadAccessToken() {
  if (downloadAble) {
    // set this access token to false while we are accessing user information to log them into server
    downloadAble = false;
    getCredentials();
  } else {
    console.log("could not get permission to download content");
  }
}

// checks if file exists on device
function checkFile() {
  // todo: remove
  console.log("Checking if File Exists");
  var path = '/' + currentID + ".webm";
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
    // todo: remove
    console.log("Path to check " + JSON.stringify(fileSystem.root));
    fileSystem.root.getFile(path, {create: false},
      // callbacks
      fileExists,
      fileDoesNotExist);
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
  app.emit("wroteCredentials");
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

// Toasts & Alerts -----------

// toasts to alert when user has added to favorites
var favoriteToastSuccess = app.toast.create({
  icon: app.theme === 'ios' ? '<i class="f7-icons">star</i>' : '<i class="material-icons">star</i>',
  text: 'Successfully added to favorites',
  position: 'center',
  closeTimeout: 2000,
});

// toast when item is already added to favorites and user tries to add again
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

// if file exists we can display it
function fileExists(fileEntry) {
  app.emit("fileOnDevice", fileEntry.fullPath);
}

//TODO @liz: need to prevent anything other than binary data writing to file
function fileDoesNotExist() {
  console.log("File does not Exist");
  app.preloader.show('blue');
  downloadContent();
}

// write to file fail event
function getFSFail(evt) {
  console.log("ERROR COULD NOT GET FILE" + evt.target.error.code);
}

// get password with downloadBlob callback
function downloadContent() {
  getPasswordFromSecure(downloadBlob);
}

/* download video/pdf content housed on mhbs.info/api/documents/
this function only gets called if the file does not already exist on the device, and after retrieving
password from secure storage
 */
function downloadBlob(password) {
  // holds the id of the video that was clicked
  var id = currentID;
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
    console.log('file system open: ' + fs.name);
    fs.root.getFile('bot.png', {create: true, exclusive: false}, function (fileEntry) {
      console.log('fileEntry is file? ' + fileEntry.isFile.toString());
      var oReq = new XMLHttpRequest();
      var server = appServer + "documents/" + id + "/data";
      // Make sure you add the domain name to the Content-Security-Policy <meta> element.
      oReq.open("GET", server, true);
      oReq.setRequestHeader('Authorization', 'Basic ' + btoa(app.data.user.username + ":" + password));
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

// request file to write to
function fileToWrite(obj, id) {
  console.log("Attempting to write file");
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
    console.log('file system open: ' + fs.name);
    fs.root.getFile('/' + id + ".webm", {create: true, exclusive: false}, function (fileEntry) {
      writeFile(fileEntry, obj);
    }, function (fs) {
      console.log("Successfully wrote file" + fs);
    });
  }, function (fileError) {
    console.log("error writing to file" + fileError);
  });
}

// write file
function writeFile(fileEntry, dataObj) {
  // Create a FileWriter object for our FileEntry (log.txt).
  fileEntry.createWriter(function (fileWriter) {
    fileWriter.onwriteend = function () {
      app.emit("fileOnDevice", fileEntry.fullPath);
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

// get password from local storage and then get docs from server
function accessOnlineContent() {
  getPasswordFromSecure(getDocsFromServer);
}

// get list of documents from mhbs.info/api/documents triggered when clicking on 'videos'
function getDocsFromServer(password) {
  var rawDocuments = {
    rawXML: {}
  };
  var server = appServer + "documents.xml";
  // todo: remove
  console.log("Access Online Content");
  // send request
  app.request.get(server, {
      username: app.data.user.username,
      password: password
    }, function (data) {
      rawDocuments.rawXML = data;
      // ready to download content
      // todo: remove
      console.log("Getting list of elements");
      accessOnlineDocuments(rawDocuments.rawXML);
    },
    function (error) {
      alert(error + "The content is not retrievable");
    })
}

// get XML content from dhis2 web API
function accessOnlineDocuments(rawXML) {
  if (window.DOMParser) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(rawXML.toString(), "text/xml");
    var documents = xmlDoc.getElementsByTagName("documents")[0].childNodes;
    var tempID;
    /* artificially make it so only one video shows, note: this needs to stay here for the day
    when we need to show more than one video, do not remove, see below as well.
    */
    var semaphoreCount = 0;
    var semaphore = function () {
      // semaphoreCount += 1;
      // if (semaphoreCount < documents.length) {
      //   return;
      // }
      // app.emit('contentType');
    };
    // get a list of ID's and titles
    // swap these lines to change from showing one video to more than one
    //for (var i in documents) {
    for (var i = 0; i < 1; i++) {
      console.log(i);
      var doc = {
        title: '',
        id: '',
        contentType: '',
        duration: '',
        thumbnail: '',
        isFavorite: false
      };
      tempID = documents[i].id;
      console.log(tempID);
      if (tempID != null) {
        doc.id = tempID;
        // grabs video durations, but too time consuming currently
        parseMetaData(doc);
        doc.title = documents[i].textContent;
        // todo: remove
        console.log(doc.title);
        getContentTypes(parser, doc, tempID, semaphore);
        documentList.push(doc);
      }
    }
  }
}

// gets video duration, can also grab other desired data here
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
      // todo: remove
      console.log("RESPONSE " + this.response);
      // preload a video blob
      video.src = window.URL.createObjectURL(videoBlob);
      video.preload = 'metadata';
      // once meta data is loaded can be grabbed, but not before then
      video.addEventListener("loadedmetadata", function () {
        video.currentTime = 5;
        console.log("loaded meta Data");
        var minutes = Math.floor(video.duration / 60);
        var seconds = (video.duration % 60).toFixed(0);
        if (seconds.toString().length === 1) {
          seconds = seconds.toString().concat("0");
        }
        doc.duration = minutes + ":" + seconds;
        app.emit('contentType');
        console.log("Duration " + doc.duration);
      });

      video.addEventListener('loadeddata', function() {
        var myImage = '<img width="80" height="80" src="'+thumbnail(video)+'">';
        console.log(myImage);
        doc.thumbnail = myImage;
        app.emit('contentType');
      }, false);
    }
  };

  req.onerror = function (e) {
    console.log(e);
  };
  req.send();
}



function thumbnail(video){
  var canvas = document.createElement('canvas');
  canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
  var img = document.createElement("img");
  img.src = canvas.toDataURL('image/jpeg');
  return img.src
}

// gets type of document, video/pdf/ etc
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


// add event listeners
document.addEventListener("deviceready", function (e) {
  document.addEventListener("offline", wentOffline, false);
  document.addEventListener("online", wentOnline, false);
  document.addEventListener("pause", onPause, false);
  document.addEventListener("resume", onResume, false);
});

// event callbacks -----------
var onPause = function () {
  console.log("app was paused");
  paused++;
};

var onResume = function () {
  // show the login screen (Pin screen)
  ls.open(true);
  appLaunches = appLaunches + 1;
  // store app launches on resume, how many times we launched gets sent to server
  storage.setItem("appLaunches", JSON.stringify(appLaunches));

  // always post when app launches if the app pin is set
  console.log("We launched the app" + storage.getItem("appLaunches"));
  if (app.data.user.pin !== '') {
    console.log("PIN " + app.data.user.pin);
    setupTimeOffline();
    trackNumLoginsByPin();
  }
};

// for when network is offline
wentOffline = function (e) {
  // if we started the app and have never been online, networkUsage = 0,
  // otherwise it starts at 1.
  if ((parseInt(storage.getItem("appLaunches")) === 0)) {
    networkUsage = 0;
  }
  app.preloader.show('blue');
  console.log(e + "Went offline");
  app.data.timeOffline.startTime = new Date();
  alert("Please connect to the internet to use the mHBS training app");
  app.data.offlineMode = true;
};

// for when network is online
wentOnline = function (e) {
  networkUsage++;
  app.preloader.hide();
  app.data.timeOffline.endTime = new Date();
  console.log(e + "Went online");
  app.data.offlineMode = false;
  //trigger
  app.emit("wentOnline");
};

// calculates elapsed time in minutes
function calculateElapsedTime(startTime, endTime) {
  console.log("start and end: " + startTime + " " + endTime);
  if (startTime <= endTime) {
    var seconds = Math.round((endTime - startTime) / 1000);
    console.log("seconds in calculation: " + seconds);
    if (seconds <= 60) {
      return seconds + "s";
    } else {
      var minutes = Math.round(seconds / 60);
      console.log("minutes in calculation: " + minutes);
      return minutes;
    }
  } else {
    return 0;
  }
}

/* send broadcast to tracker capture, uses darryncampbell plugin */
function sendBroadcastToTracker() {
  window.plugins.intentShim.sendBroadcast({
      action: 'edu.iupui.soic.biohealth.plhi.mhbs.activities.SharedLoginActivity'
    },
    function () {
    console.log("sentBroadcast");
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

// create secure storage, set as app.data.storage
var ss = function () {
  return new cordova.plugins.SecureStorage(
    function () {
      // we have storage so broadcast for login info
      sendBroadcastToTracker();
    },
    securityFunction,
    'mHBS_Hybridapp');
};

// get password from secure storage and login
function logIn() {
  getPasswordFromSecure(loginOk);
}

// we got password, we can login
function loginOk(password) {
  var server = appServer + "26/me/";
  // todo: remove
  console.log(app.data.user.username);
  console.log(password);
  console.log(server);
  // send request
  app.request.get(server, {
      username: app.data.user.username,
      password: password
    }, function (data) {
      if (!data.includes(app.data.user.username)) {
        credentialsFailAlert();
      } else {
        secureStorageInactive = false;
      }
    },
    function (error) {
      // if we have internet and reached here display error
      if (!app.data.offlineMode) {
        credentialsFailAlert();
      }
    });
}

// something went wrong, if we are offline, it will display a different message
function credentialsFailAlert() {
  alert('Login was not successful, please login mHBS tracker-capture ');
}

// clear tempCredentials since they are stored in secure storage, which is more secure
function clearTempCredentials() {
  tempCredentials.username = null;
  tempCredentials.password = null;
  tempCredentials.serverURL = '';
  //todo: remove
  console.log("Cleared Temp Credentials")
}

// set user name for our app when we stored credentials upon login
function setAppUsername() {
  console.log("setAppUsername");
  app.data.storage.get(function (value) {
    app.data.user.username = value;
  }, function (error) {
    console.log(error);
  }, 'username');
}

// tracks how many times each person / pin logged in
function trackNumLoginsByPin() {
  console.log("TRACKING PINS");
  var numLogins = storage.getItem(app.data.user.pin);
  if (isNaN(parseInt(numLogins)) || parseInt(numLogins) === 0) {
    numLogins = 1;
  } else {
    numLogins = parseInt(numLogins) + 1;
  }
  console.log("stored logins " + numLogins);

  storage.setItem(app.data.user.pin, JSON.stringify(numLogins));
  setupTimeOffline();
  postEventData();
}

/* handle any incoming intent, uses darryncampbell intent plugin */
function onIntent(intent) {
  app.data.intentReceived = true;
  var credentialsArr = parseCredentials(intent);
  // if the intent had data, need to log in
  if (credentialsArr != null) {
    if (credentialsArr.length === 4) {
      // todo: remove
      console.log("length of tempCredentials " + credentialsArr.length);
      tempCredentials.username = credentialsArr[0];
      tempCredentials.password = credentialsArr[1];
      tempCredentials.serverURL = credentialsArr[2];
      app.data.user.pin = credentialsArr[3];
      // set app headers
      setHeaders();
      if (!isEmpty(tempCredentials.username) && !isEmpty(tempCredentials.password) && !isEmpty(tempCredentials.serverURL)) {
        // storeCredentials
        storeCredentials();
        // login
      }
    } else {
      loginAlert();
    }
  }
}

// we got an intent with credentials but it did not contain all the credentials (most likely)
function loginAlert() {
  alert("Please login tracker-capture");
}

// store tempCredentials received from tracker-capture to local storage
function storeCredentials() {
  app.data.storage.set(function () {
    // set username for our app
    setAppUsername();
    app.emit('storedCredential', "username");
  }, function (error) {
    console.log("storedCredential" + error);
  }, 'username', tempCredentials.username);

  app.data.storage.set(function () {
    app.emit('storedCredential', "password");
  }, function (error) {
    console.log("storedCredential" + error);
  }, 'password', tempCredentials.password);

  app.data.storage.set(function () {
    console.log("here in setting");
    app.emit('storedCredential', "serverURL");
  }, function (error) {
    console.log("storedCredential Error" + error);
  }, 'serverURL', tempCredentials.serverURL);
}

// get credentials from storage, and makes sure all 3 are validly set using gotCredential event tokens
function getCredentials() {
  app.data.storage.get(function (value) {
    app.emit('gotCredential', "username", value);
  }, function (error) {
    console.log("username" + error);
  }, 'username');

  app.data.storage.get(function (value) {
    app.emit('gotCredential', "password", value);
  }, function (error) {
    console.log("password" + error);
  }, 'password');

  app.data.storage.get(function (value) {
    app.emit('gotCredential', "serverURL", value);
  }, function (error) {
    console.log("serverURL" + error);
  }, 'serverURL');
}

// get the credentials from the JSON via tracker-capture
function parseCredentials(intent) {
  console.log("Parsing Credentials");
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

function isEmpty(str) {
  return (!str || 0 === str.length);
}

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

function convertSecondsToMinutes(seconds) {
  return Math.round(seconds / 60);
}

// gets password from secure, pass any function as a success callback
var getPasswordFromSecure = function (callback) {
  app.data.storage.get(
    function (value) {
      callback(value);
      // todo: remove
      console.log("Got password from secure");
    },
    function (error) {
      console.log('Error' + error);
    },
    'password');
};

// Metric capture ------------------
function getNumberOfScreens() {
  var numberOfScreens = 0;
  for (var i in this.app.routes) {
    var pageName;
    var route = this.app.routes[i];
    if (route.url != null) {
      if (route.url.includes("pages")) {
        pageName = route.url.split("/").pop();
        pageName = pageName.substring(0, pageName.indexOf(".html"));
        if (storage.getItem(pageName) != 0) {
          numberOfScreens++;
        }
      }
    }
  }
  return numberOfScreens;
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

// send to fabric
function sendAnswerToFabric(pageName) {
  window.fabric.Answers.sendContentView("mHBSguide", "timestamps", 1234, {"username page startTime": app.data.user.username + pageName + getDateTimeStamp()});
}

// log page visits
function logPageVisit(pageName) {
  var numberOfPageVisits = localStorage.getItem(pageName);
  // console.log("Page Name: " + pageName);
  // console.log("Number of Page Visits: " + numberOfPageVisits);
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
    if(checkBoxVal.toString()==="true"){
      document.getElementById(checkBoxes[i].id).checked = true;
    }else{
      document.getElementById(checkBoxes[i].id).checked = false;
    }
  }
}

// set up checkbox listeners for whole app
function setUpCheckBoxListeners() {
  for (var key in checkboxVals){
    var checkboxDomID = "#" + key;
    $$(document).on('change', checkboxDomID, function () {
      var thisID = this.id;
      var checkboxVal = storage.getItem(thisID);
      if (this.checked) {
        checkboxVal = true;
      } else {
        checkboxVal = false;
      }
      storage.setItem(thisID, JSON.stringify(checkboxVal));
    });
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
  console.log("Setting up Page Before in Event");
  $$(document).on('page:beforein', '.page[data-name="' + pageName + '"]', function (e, page) {
    // sendAnswerToFabric(page.name);
    logPageVisit(page.name);
    // if the page has checkboxes, init checkboxes to stored value
    var checkBoxes = $$('input[type="checkbox"]');
    if (checkBoxes.length > 0) {
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
  eventPayload['eventDate'] = getDateStamp();
  console.log("sending Payload: " + JSON.stringify(eventPayload));
  for (var i in eventPayload['dataValues']) {
    // todo: check this val
    // Number of abrupt exits or incomplete workflow for mHBS training app
    if (eventPayload['dataValues'][i].dataElement === 'ZYQJ87n45ye') {
      eventPayload['dataValues'][i].value = paused;
    }
    // send time offline in minutes
    else if (eventPayload['dataValues'][i].dataElement === 'qOyP28eirAx') {
         eventPayload['dataValues'][i].value = getStoredTimeOffline();
    }
    // send logins by pin
    else if (eventPayload['dataValues'][i].dataElement === 'getqONgfDtE') {
      eventPayload['dataValues'][i].value = storage.getItem(app.data.user.pin);
    }
    // get number of screens
    else if (eventPayload['dataValues'][i].dataElement === 'RrIe9CA11n6') {
      eventPayload['dataValues'][i].value = getNumberOfScreens();
    }
    // number of times app was started
    else if (eventPayload['dataValues'][i].dataElement === 'BgzISR1GmP8') {
      eventPayload['dataValues'][i].value = storage.getItem("appLaunches");
    }
    // number of times there was network usage
    else if (eventPayload['dataValues'][i].dataElement === 'qbT1F1k8cD7') {
      eventPayload['dataValues'][i].value = networkUsage;


    }
    console.log("EVENT PAY: " + eventPayload['dataValues'][i].dataElement + " " + eventPayload['dataValues'][i].value);
    console.log("-----------------");
  }
  postPayload();
  // todo: @liz
  // clearPayloadValues();
}

// get password and then post payload
function postPayload() {
  getPasswordFromSecure(makeEventPostRequest);
}

function makeEventPostRequest(password) {
  var eventServer = appServer + "26/events";
  app.request({
    url: eventServer,
    dataType: 'json',
    data: eventPayload,
    method: 'POST',
    contentType: 'application/json',
    'Content-Type': 'application/json',
    beforeSend: function () {
      //This method will be called before webservice call initiate
    },
    success: function (data, status, xhr) {
      console.log("Success" + data);
      //Post request completed
    },
    error: function (xhr, status) {
      console.log("Failure" + JSON.stringify(xhr));
    }
  });

}

// can use to reset values after we send payload
function clearPayloadValues() {
  networkUsage = 1;
  storage.setItem("appLaunches", JSON.stringify(0));
  setupPageVisits();
  storage.setItem(app.data.user.pin, JSON.stringify(0));
  storage.setItem("timeOffline", null);
}

