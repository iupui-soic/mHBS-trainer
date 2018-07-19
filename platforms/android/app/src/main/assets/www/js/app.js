var $$ = Dom7;
var storage = window.localStorage;
var username = "premchand";
var pageVisits = {
  'mhbsmain':0,
  'mhbsvideos':0,
  'page1':0,
  'section1':0,
  'section1a':0,
  'section1b':0,
  'section1c':0,
  'section2':0,
  'section2a':0,
  'section2b':0,
  'section2c':0,
  'section2d':0,
  'section2e':0,
  'section3':0,
  'section3a':0,
  'section3b':0,
  'section3c':0,
  'section3d':0,
  'section3e':0,
  'section3f':0,
  'section3g':0,
  'section4':0,
  'section4a':0,
  'section4b':0,
  'section4c':0,
  'section4d':0,
  'section4e':0,
  'section5':0,
  'section5a':0,
  'section5b':0,
  'section6':0,
  'section6a':0,
  'section6b':0,
  'section6c':0,
  'section6d':0,
  'section6e':0,
  'section7':0,
}
var checkboxVals = {
  'sec1a1':false,'sec1a2':false,'sec1a3':false,'sec1a4':false,
  'sec1b1':false,'sec1b2':false,'sec1b3':false,'sec1b4':false,
  'sec1c1':false,'sec1c2':false,'sec1c3':false,'sec1c4':false,'sec1c5':false,'sec1c6':false,'sec1c7':false,
  'sec2a1':false,'sec2a2':false,'sec2a3':false,'sec2a4':false,
  'sec2b1':false,'sec2b2':false,'sec2b3':false,'sec2b4':false,
  'sec2c1':false,'sec2c2':false,'sec2c3':false,'sec2c4':false,
  'sec2d1':false,'sec2d2':false,'sec2d3':false,'sec2d4':false,
  'sec2e1':false,'sec2e2':false,'sec2e3':false,'sec2e4':false,'sec2e5':false,'sec2e6':false,'sec2e7':false,'sec2e8':false,
  'sec3a1':false,'sec3a2':false,'sec3a3':false,'sec3a4':false,
  'sec3b1':false,'sec3b2':false,'sec3b3':false,'sec3b4':false,
  'sec3c1':false,'sec3c2':false,'sec3c3':false,'sec3c4':false,'sec3c5':false,'sec3c6':false,'sec3c7':false,'sec3c8':false,'sec3c9':false,'sec3c10':false,
  'sec3d1':false,'sec3d2':false,'sec3d3':false,'sec3d4':false,
  'sec3e1':false,'sec3e2':false,'sec3e3':false,'sec3e4':false,
  'sec3f1':false,'sec3f2':false,'sec3f3':false,'sec3f4':false,
  'sec3g1':false,'sec3g2':false,'sec3g3':false,'sec3g4':false,'sec3g5':false,'sec3g6':false,'sec3g7':false,'sec3g8':false,'sec3g9':false,'sec3g10':false,'sec3g11':false,'sec3g12':false,
  'sec4a1':false,'sec4a2':false,'sec4a3':false,'sec4a4':false,
  'sec4b1':false,'sec4b2':false,'sec4b3':false,'sec4b4':false,
  'sec4c1':false,'sec4c2':false,'sec4c3':false,'sec4c4':false,
  'sec4d1':false,'sec4d2':false,'sec4d3':false,'sec4d4':false,
  'sec4e1':false,'sec4e2':false,'sec4e3':false,'sec4e4':false,'sec4e5':false,'sec4e6':false,'sec4e7':false,'sec4e8':false,'sec4e9':false,'sec4e10':false,
}
storage.setItem("pageVisits",JSON.stringify(pageVisits));
storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
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
var videoView = app.views.create('#view-video', {
  url: '/mhbsvideos/'
});
var guideView = app.views.create('#view-guide', {
  url: '/mhbsmain/'
});
//for every page
$$(document).on('page:init', function (e) {

});
//fabric
//guide main page
$$(document).on('page:beforein', '.page[data-name="mhbsmain"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" mhbsmain "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.mhbsmain = pageVisits.mhbsmain+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));
});
$$(document).on('page:beforeout', '.page[data-name="mhbsmain"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" mhbsmain "+dateTime});
});
//fabric page1
$$(document).on('page:beforein', '.page[data-name="page1"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" page1 "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.page1 = pageVisits.page1+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));
  console.log(pageVisits);
});
$$(document).on('page:afterout', '.page[data-name="page1"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" page1 "+dateTime});
});
//fabric section1
$$(document).on('page:beforein', '.page[data-name="section1"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section1 "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section1 = pageVisits.section1+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));
});
$$(document).on('page:afterout', '.page[data-name="section1"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section1 "+dateTime});
});
//section1a
$$(document).on('page:beforein', '.page[data-name="section1a"]', function (e) {
  //initialize checkbox values from local storage
  var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
  if(checkboxVals.sec1a1===true){
    document.getElementById("check1a1").checked = true;
  }else {
    document.getElementById("check1a1").checked = false;
  }
  //second checkbox
  if(checkboxVals.sec1a2===true){
    document.getElementById("check1a2").checked = true;
  }else {
    document.getElementById("check1a2").checked = false;
  }
  //third checkbox
  if(checkboxVals.sec1a3===true){
    document.getElementById("check1a3").checked = true;
  }else {
    document.getElementById("check1a3").checked = false;
  }
  //forth checkbox
  if(checkboxVals.sec1a4===true){
    document.getElementById("check1a4").checked = true;
  }else {
    document.getElementById("check1a4").checked = false;
  }
  //fabric
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section1a "+dateTime});
  //local storage no of visits
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section1a = pageVisits.section1a+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));
  //store checkbox values
  $$(document).on('change','#check1a1',function(){
    if(this.checked){
      checkboxVals.sec1a1 = true;
      storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
    }
    else{
      checkboxVals.sec1a1 = false;
      storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
    }
  });
  //second checkbox
  $$(document).on('change','#check1a2',function(){
    if(this.checked){
      checkboxVals.sec1a2 = true;
      storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
    }
    else{
      checkboxVals.sec1a2 = false;
      storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
    }
  });
  //thrid checkbox
  $$(document).on('change','#check1a3',function(){
    if(this.checked){
      checkboxVals.sec1a3 = true;
      storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
    }
    else{
      checkboxVals.sec1a3 = false;
      storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
    }
  });
  //fourth checkbox
  $$(document).on('change','#check1a4',function(){
    if(this.checked){
      checkboxVals.sec1a4 = true;
      storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
    }
    else{
      checkboxVals.sec1a4 = false;
      storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
    }
  });
  //zoom
  $$(document).on('click',".zoomImage", function () {
    console.log("click image");
    hammerIt(document.getElementById("sampleImage"));
  });
});
$$(document).on('page:afterout', '.page[data-name="section1a"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section1a "+dateTime});
});
//fabric section1b
$$(document).on('page:beforein', '.page[data-name="section1b"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section1b "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section1b = pageVisits.section1b+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));
});
$$(document).on('page:afterout', '.page[data-name="section1b"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section1b "+dateTime});
});
//fabric section1c
$$(document).on('page:beforein', '.page[data-name="section1c"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section1c "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section1c = pageVisits.section1c+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));
});
$$(document).on('page:afterout', '.page[data-name="section1c"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section1c "+dateTime});
});
//fabric section2
$$(document).on('page:beforein', '.page[data-name="section2"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section2 "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section2 = pageVisits.section2+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));
});
$$(document).on('page:afterout', '.page[data-name="section2"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section2 "+dateTime});
});
//section2a
$$(document).on('page:beforein', '.page[data-name="section2a"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section2a "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section2a = pageVisits.section2a+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));
});
$$(document).on('page:afterout', '.page[data-name="section2a"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section2a "+dateTime});
});
//section2b
$$(document).on('page:beforein', '.page[data-name="section2b"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section2b "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section2b = pageVisits.section2b+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));
});
$$(document).on('page:afterout', '.page[data-name="section2b"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section2b "+dateTime});
});
//section2c
$$(document).on('page:beforein', '.page[data-name="section2c"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section2c "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section2c = pageVisits.section2c+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));
});
$$(document).on('page:afterout', '.page[data-name="section2c"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section2c "+dateTime});
});
//section2d
$$(document).on('page:beforein', '.page[data-name="section2d"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section2d "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section2d = pageVisits.section2d+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));
});
$$(document).on('page:afterout', '.page[data-name="section2d"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section2d "+dateTime});
});
//section2e
$$(document).on('page:beforein', '.page[data-name="section2e"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section2e "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section2e = pageVisits.section2e+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));
});
$$(document).on('page:afterout', '.page[data-name="section2e"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section2e "+dateTime});
});
//section3
$$(document).on('page:beforein', '.page[data-name="section3"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section3 "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section3 = pageVisits.section3+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));
});
$$(document).on('page:afterout', '.page[data-name="section3"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section3 "+dateTime});
});
//section3a
$$(document).on('page:beforein', '.page[data-name="section3a"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section3a "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section3a = pageVisits.section3a+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));
});
$$(document).on('page:afterout', '.page[data-name="section3a"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section3a "+dateTime});
});
//section3b
$$(document).on('page:beforein', '.page[data-name="section3b"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section3b "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section3b = pageVisits.section3b+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));
});
$$(document).on('page:afterout', '.page[data-name="section3b"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section3b "+dateTime});
});
//section3c
$$(document).on('page:beforein', '.page[data-name="section3c"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section3c "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section3c = pageVisits.section3c+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));
});
$$(document).on('page:afterout', '.page[data-name="section3c"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section3c "+dateTime});
});
//section3d
$$(document).on('page:beforein', '.page[data-name="section3d"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section3d "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section3d = pageVisits.section3d+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));
});
$$(document).on('page:afterout', '.page[data-name="section3d"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section3d "+dateTime});
});
//section3e
$$(document).on('page:beforein', '.page[data-name="section3e"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section3e "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section3e = pageVisits.section3e+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));
});
$$(document).on('page:afterout', '.page[data-name="section3e"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section3e "+dateTime});
});
//section3f
$$(document).on('page:beforein', '.page[data-name="section3f"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section3f "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section3f = pageVisits.section3f+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));
});
$$(document).on('page:afterout', '.page[data-name="section3f"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section3f "+dateTime});
});
//section3g
$$(document).on('page:beforein', '.page[data-name="section3g"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section3g "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section3g = pageVisits.section3g+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));
});
$$(document).on('page:afterout', '.page[data-name="section3g"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section3g "+dateTime});
});
//section4
$$(document).on('page:beforein', '.page[data-name="section4"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section4 "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section4 = pageVisits.section4+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));
});
$$(document).on('page:afterout', '.page[data-name="section4"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section4 "+dateTime});
});
//section4a
$$(document).on('page:beforein', '.page[data-name="section4a"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section4a "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section4a = pageVisits.section4a+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));
});
$$(document).on('page:afterout', '.page[data-name="section4a"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section4a "+dateTime});
});
//section4b
$$(document).on('page:beforein', '.page[data-name="section4b"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section4b "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section4b = pageVisits.section4b+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));
});
$$(document).on('page:afterout', '.page[data-name="section4b"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section4b "+dateTime});
});
//section4c
$$(document).on('page:beforein', '.page[data-name="section4c"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section4c "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section4c = pageVisits.section4c+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));
});
$$(document).on('page:afterout', '.page[data-name="section4c"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section4c "+dateTime});
});
//section4d
$$(document).on('page:beforein', '.page[data-name="section4d"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section4d "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section4d = pageVisits.section4d+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));
});
$$(document).on('page:afterout', '.page[data-name="section4d"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section4d "+dateTime});
});
//section4e
$$(document).on('page:beforein', '.page[data-name="section4e"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section4e "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section4e = pageVisits.section4e+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));
});
$$(document).on('page:afterout', '.page[data-name="section4e"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section4e "+dateTime});
});
//section5
$$(document).on('page:beforein', '.page[data-name="section5"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section5 "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section5 = pageVisits.section5+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));
});
$$(document).on('page:afterout', '.page[data-name="section5"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section5 "+dateTime});
});
//section5a
$$(document).on('page:beforein', '.page[data-name="section5a"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section5a "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section5a = pageVisits.section5a+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));
});
$$(document).on('page:afterout', '.page[data-name="section5a"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section5a "+dateTime});
});
//section5b
$$(document).on('page:beforein', '.page[data-name="section5b"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section5b "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section5b = pageVisits.section5b+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));
});
$$(document).on('page:afterout', '.page[data-name="section5b"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section5b "+dateTime});
});
//section6
$$(document).on('page:beforein', '.page[data-name="section6"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section6 "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section6 = pageVisits.section6+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));
});
$$(document).on('page:afterout', '.page[data-name="section6"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section6 "+dateTime});
});
//section6a
$$(document).on('page:beforein', '.page[data-name="section6a"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section6a "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section6a = pageVisits.section6a+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));
});
$$(document).on('page:afterout', '.page[data-name="section6a"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section6a "+dateTime});
});
//section6b
$$(document).on('page:beforein', '.page[data-name="section6b"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section6b "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section6b = pageVisits.section6b+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));
});
$$(document).on('page:afterout', '.page[data-name="section6b"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section6b "+dateTime});
});
//section6c
$$(document).on('page:beforein', '.page[data-name="section6c"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section6c "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section6c = pageVisits.section6c+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));
});
$$(document).on('page:afterout', '.page[data-name="section6c"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section6a "+dateTime});
});
//section6d
$$(document).on('page:beforein', '.page[data-name="section6d"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section6d "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section6d = pageVisits.section6d+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));
});
$$(document).on('page:afterout', '.page[data-name="section6d"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section6d "+dateTime});
});
//section6e
$$(document).on('page:beforein', '.page[data-name="section6e"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section6e "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section6e = pageVisits.section6e+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));
});
$$(document).on('page:afterout', '.page[data-name="section6e"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section6e "+dateTime});
});
//section7
$$(document).on('page:beforein', '.page[data-name="section7"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section7 "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section7 = pageVisits.section7+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));
});
$$(document).on('page:afterout', '.page[data-name="section7"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section7 "+dateTime});
});
//video main page
$$(document).on('page:beforein', '.page[data-name="mhbsvideos"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" mHBSvideos "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.mhbsvideos = pageVisits.mhbsvideos+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));
});
$$(document).on('page:beforeout', '.page[data-name="mhbsvideos"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" mHBSvideos "+dateTime});
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
