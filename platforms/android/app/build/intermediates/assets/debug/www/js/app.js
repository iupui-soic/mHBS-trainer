var $$ = Dom7;
var storage = window.localStorage;
var username = "premchand"; // chnage the username to dynamic after code integration
if (localStorage.getItem("pageVisits") === null) {
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
storage.setItem("pageVisits",JSON.stringify(pageVisits));
}
if (localStorage.getItem("checkboxVals") === null) {
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
storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
}

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
//swiper
var swiper = app.swiper.create('.swiper-container', {
    speed: 400,
    spaceBetween: 100
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
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec1a1 = true;
    }
    else{
      checkboxVals.sec1a1 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //second checkbox
  $$(document).on('change','#check1a2',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec1a2 = true;
    }
    else{
      checkboxVals.sec1a2 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //thrid checkbox
  $$(document).on('change','#check1a3',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec1a3 = true;
    }
    else{
      checkboxVals.sec1a3 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //fourth checkbox
  $$(document).on('change','#check1a4',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec1a4 = true;
    }
    else{
      checkboxVals.sec1a4 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
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
  //initialize checkbox values from local storage
  var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
  if(checkboxVals.sec1b1===true){
    document.getElementById("check1b1").checked = true;
  }else {
    document.getElementById("check1b1").checked = false;
  }
  //second checkbox
  if(checkboxVals.sec1b2===true){
    document.getElementById("check1b2").checked = true;
  }else {
    document.getElementById("check1b2").checked = false;
  }
  //third checkbox
  if(checkboxVals.sec1b3===true){
    document.getElementById("check1b3").checked = true;
  }else {
    document.getElementById("check1b3").checked = false;
  }
  //forth checkbox
  if(checkboxVals.sec1b4===true){
    document.getElementById("check1b4").checked = true;
  }else {
    document.getElementById("check1b4").checked = false;
  }
  //fabric
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section1b "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section1b = pageVisits.section1b+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));
  //store checkbox values
  $$(document).on('change','#check1b1',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec1b1 = true;
    }
    else{
      checkboxVals.sec1b1 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //second checkbox
  $$(document).on('change','#check1b2',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec1b2 = true;
    }
    else{
      checkboxVals.sec1b2 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //thrid checkbox
  $$(document).on('change','#check1b3',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec1b3 = true;
    }
    else{
      checkboxVals.sec1b3 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //fourth checkbox
  $$(document).on('change','#check1b4',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec1b4 = true;
    }
    else{
      checkboxVals.sec1b4 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
});
$$(document).on('page:afterout', '.page[data-name="section1b"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section1b "+dateTime});
});
//fabric section1c
$$(document).on('page:beforein', '.page[data-name="section1c"]', function (e) {
  //initialize checkbox values from local storage
  var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
  if(checkboxVals.sec1c1===true){
    document.getElementById("check1c1").checked = true;
  }else {
    document.getElementById("check1c1").checked = false;
  }
  //second checkbox
  if(checkboxVals.sec1c2===true){
    document.getElementById("check1c2").checked = true;
  }else {
    document.getElementById("check1c2").checked = false;
  }
  //third checkbox
  if(checkboxVals.sec1c3===true){
    document.getElementById("check1c3").checked = true;
  }else {
    document.getElementById("check1c3").checked = false;
  }
  //forth checkbox
  if(checkboxVals.sec1c4===true){
    document.getElementById("check1c4").checked = true;
  }else {
    document.getElementById("check1c4").checked = false;
  }
  //5th
  if(checkboxVals.sec1c5===true){
    document.getElementById("check1c5").checked = true;
  }else {
    document.getElementById("check1c5").checked = false;
  }
  //6th
  if(checkboxVals.sec1c6===true){
    document.getElementById("check1c6").checked = true;
  }else {
    document.getElementById("check1c6").checked = false;
  }
  //7th checkbox
  if(checkboxVals.sec1c7===true){
    document.getElementById("check1c7").checked = true;
  }else {
    document.getElementById("check1c7").checked = false;
  }
  //fabric
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section1c "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section1c = pageVisits.section1c+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));

  //store checkbox values
  $$(document).on('change','#check1c1',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec1c1 = true;
    }
    else{
      checkboxVals.sec1c1 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //second checkbox
  $$(document).on('change','#check1c2',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec1c2 = true;
    }
    else{
      checkboxVals.sec1c2 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //thrid checkbox
  $$(document).on('change','#check1c3',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec1c3 = true;
    }
    else{
      checkboxVals.sec1c3 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //fourth checkbox
  $$(document).on('change','#check1c4',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec1c4 = true;
    }
    else{
      checkboxVals.sec1c4 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //5 checkbox
  $$(document).on('change','#check1c5',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec1c5 = true;
    }
    else{
      checkboxVals.sec1c5 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //6 checkbox
  $$(document).on('change','#check1c6',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec1c6 = true;
    }
    else{
      checkboxVals.sec1c6 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //7 checkbox
  $$(document).on('change','#check1c7',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec1c7 = true;
    }
    else{
      checkboxVals.sec1c7 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
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
  //initialize checkbox values from local storage
  var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
  if(checkboxVals.sec2a1===true){
    document.getElementById("check2a1").checked = true;
  }else {
    document.getElementById("check2a1").checked = false;
  }
  //second checkbox
  if(checkboxVals.sec2a2===true){
    document.getElementById("check2a2").checked = true;
  }else {
    document.getElementById("check2a2").checked = false;
  }
  //third checkbox
  if(checkboxVals.sec2a3===true){
    document.getElementById("check2a3").checked = true;
  }else {
    document.getElementById("check2a3").checked = false;
  }
  //forth checkbox
  if(checkboxVals.sec2a4===true){
    document.getElementById("check2a4").checked = true;
  }else {
    document.getElementById("check2a4").checked = false;
  }

  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section2a "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section2a = pageVisits.section2a+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));

  //store checkbox values
  $$(document).on('change','#check2a1',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec2a1 = true;
    }
    else{
      checkboxVals.sec2a1 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //second checkbox
  $$(document).on('change','#check2a2',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec2a2 = true;
    }
    else{
      checkboxVals.sec2a2 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //thrid checkbox
  $$(document).on('change','#check2a3',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec2a3 = true;
    }
    else{
      checkboxVals.sec2a3 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //fourth checkbox
  $$(document).on('change','#check2a4',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec2a4 = true;
    }
    else{
      checkboxVals.sec2a4 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
});
$$(document).on('page:afterout', '.page[data-name="section2a"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section2a "+dateTime});
});
//section2b
$$(document).on('page:beforein', '.page[data-name="section2b"]', function (e) {

  //initialize checkbox values from local storage
  var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
  if(checkboxVals.sec2b1===true){
    document.getElementById("check2b1").checked = true;
  }else {
    document.getElementById("check2b1").checked = false;
  }
  //second checkbox
  if(checkboxVals.sec2b2===true){
    document.getElementById("check2b2").checked = true;
  }else {
    document.getElementById("check2b2").checked = false;
  }
  //third checkbox
  if(checkboxVals.sec2b3===true){
    document.getElementById("check2b3").checked = true;
  }else {
    document.getElementById("check2b3").checked = false;
  }
  //forth checkbox
  if(checkboxVals.sec2b4===true){
    document.getElementById("check2b4").checked = true;
  }else {
    document.getElementById("check2b4").checked = false;
  }

  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section2b "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section2b = pageVisits.section2b+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));

  //store checkbox values
  $$(document).on('change','#check2b1',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec2b1 = true;
    }
    else{
      checkboxVals.sec2b1 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //second checkbox
  $$(document).on('change','#check2b2',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec2b2 = true;
    }
    else{
      checkboxVals.sec2b2 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //thrid checkbox
  $$(document).on('change','#check2b3',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec2b3 = true;
    }
    else{
      checkboxVals.sec2b3 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //fourth checkbox
  $$(document).on('change','#check2b4',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec2b4 = true;
    }
    else{
      checkboxVals.sec2b4 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
});
$$(document).on('page:afterout', '.page[data-name="section2b"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section2b "+dateTime});
});
//section2c
$$(document).on('page:beforein', '.page[data-name="section2c"]', function (e) {

  //initialize checkbox values from local storage
  var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
  if(checkboxVals.sec2c1===true){
    document.getElementById("check2c1").checked = true;
  }else {
    document.getElementById("check2c1").checked = false;
  }
  //second checkbox
  if(checkboxVals.sec2c2===true){
    document.getElementById("check2c2").checked = true;
  }else {
    document.getElementById("check2c2").checked = false;
  }
  //third checkbox
  if(checkboxVals.sec2c3===true){
    document.getElementById("check2c3").checked = true;
  }else {
    document.getElementById("check2c3").checked = false;
  }
  //forth checkbox
  if(checkboxVals.sec2c4===true){
    document.getElementById("check2c4").checked = true;
  }else {
    document.getElementById("check2c4").checked = false;
  }

  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section2c "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section2c = pageVisits.section2c+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));

  //store checkbox values
  $$(document).on('change','#check2c1',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec2c1 = true;
    }
    else{
      checkboxVals.sec2c1 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //second checkbox
  $$(document).on('change','#check2c2',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec2c2 = true;
    }
    else{
      checkboxVals.sec2c2 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //thrid checkbox
  $$(document).on('change','#check2c3',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec2c3 = true;
    }
    else{
      checkboxVals.sec2c3 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //fourth checkbox
  $$(document).on('change','#check2c4',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec2c4 = true;
    }
    else{
      checkboxVals.sec2c4 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });

});
$$(document).on('page:afterout', '.page[data-name="section2c"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section2c "+dateTime});
});
//section2d
$$(document).on('page:beforein', '.page[data-name="section2d"]', function (e) {

  //initialize checkbox values from local storage
  var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
  if(checkboxVals.sec2d1===true){
    document.getElementById("check2d1").checked = true;
  }else {
    document.getElementById("check2d1").checked = false;
  }
  //second checkbox
  if(checkboxVals.sec2d2===true){
    document.getElementById("check2d2").checked = true;
  }else {
    document.getElementById("check2d2").checked = false;
  }
  //third checkbox
  if(checkboxVals.sec2d3===true){
    document.getElementById("check2d3").checked = true;
  }else {
    document.getElementById("check2d3").checked = false;
  }
  //forth checkbox
  if(checkboxVals.sec2d4===true){
    document.getElementById("check2d4").checked = true;
  }else {
    document.getElementById("check2d4").checked = false;
  }

  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section2d "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section2d = pageVisits.section2d+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));

  //store checkbox values
  $$(document).on('change','#check2d1',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec2d1 = true;
    }
    else{
      checkboxVals.sec2d1 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //second checkbox
  $$(document).on('change','#check2d2',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec2d2 = true;
    }
    else{
      checkboxVals.sec2d2 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //thrid checkbox
  $$(document).on('change','#check2d3',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec2d3 = true;
    }
    else{
      checkboxVals.sec2d3 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //fourth checkbox
  $$(document).on('change','#check2d4',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec2d4 = true;
    }
    else{
      checkboxVals.sec2d4 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
});
$$(document).on('page:afterout', '.page[data-name="section2d"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section2d "+dateTime});
});
//section2e
$$(document).on('page:beforein', '.page[data-name="section2e"]', function (e) {

  //initialize checkbox values from local storage
  var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
  if(checkboxVals.sec2e1===true){
    document.getElementById("check2e1").checked = true;
  }else {
    document.getElementById("check2e1").checked = false;
  }
  //second checkbox
  if(checkboxVals.sec2e2===true){
    document.getElementById("check2e2").checked = true;
  }else {
    document.getElementById("check2e2").checked = false;
  }
  //third checkbox
  if(checkboxVals.sec2e3===true){
    document.getElementById("check2e3").checked = true;
  }else {
    document.getElementById("check2e3").checked = false;
  }
  //forth checkbox
  if(checkboxVals.sec2e4===true){
    document.getElementById("check2e4").checked = true;
  }else {
    document.getElementById("check2e4").checked = false;
  }
  //5th
  if(checkboxVals.sec2e5===true){
    document.getElementById("check2e5").checked = true;
  }else {
    document.getElementById("check2e5").checked = false;
  }
  //6th
  if(checkboxVals.sec2e6===true){
    document.getElementById("check2e6").checked = true;
  }else {
    document.getElementById("check2e6").checked = false;
  }
  //7th checkbox
  if(checkboxVals.sec2e7===true){
    document.getElementById("check2e7").checked = true;
  }else {
    document.getElementById("check2e7").checked = false;
  }
  //8th checkbox
  if(checkboxVals.sec2e8===true){
    document.getElementById("check2e8").checked = true;
  }else {
    document.getElementById("check2e8").checked = false;
  }

  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section2e "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section2e = pageVisits.section2e+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));

  //store checkbox values
  $$(document).on('change','#check2e1',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec2e1 = true;
    }
    else{
      checkboxVals.sec2e1 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //second checkbox
  $$(document).on('change','#check2e2',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec2e2 = true;
    }
    else{
      checkboxVals.sec2e2 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //thrid checkbox
  $$(document).on('change','#check2e3',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec2e3 = true;
    }
    else{
      checkboxVals.sec2e3 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //fourth checkbox
  $$(document).on('change','#check2e4',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec2e4 = true;
    }
    else{
      checkboxVals.sec2e4 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //5 checkbox
  $$(document).on('change','#check2e5',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec2e5 = true;
    }
    else{
      checkboxVals.sec2e5 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //6 checkbox
  $$(document).on('change','#check2e6',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec2e6 = true;
    }
    else{
      checkboxVals.sec2e6 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //7 checkbox
  $$(document).on('change','#check2e7',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec2e7 = true;
    }
    else{
      checkboxVals.sec2e7 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //8 checkbox
  $$(document).on('change','#check2e8',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec2e8 = true;
    }
    else{
      checkboxVals.sec2e8 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
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

  //initialize checkbox values from local storage
  var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
  if(checkboxVals.sec3a1===true){
    document.getElementById("check3a1").checked = true;
  }else {
    document.getElementById("check3a1").checked = false;
  }
  //second checkbox
  if(checkboxVals.sec3a2===true){
    document.getElementById("check3a2").checked = true;
  }else {
    document.getElementById("check3a2").checked = false;
  }
  //third checkbox
  if(checkboxVals.sec3a3===true){
    document.getElementById("check3a3").checked = true;
  }else {
    document.getElementById("check3a3").checked = false;
  }
  //forth checkbox
  if(checkboxVals.sec3a4===true){
    document.getElementById("check3a4").checked = true;
  }else {
    document.getElementById("check3a4").checked = false;
  }

  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section3a "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section3a = pageVisits.section3a+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));

  //store checkbox values
  $$(document).on('change','#check3a1',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3a1 = true;
    }
    else{
      checkboxVals.sec3a1 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //second checkbox
  $$(document).on('change','#check3a2',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3a2 = true;
    }
    else{
      checkboxVals.sec3a2 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //thrid checkbox
  $$(document).on('change','#check3a3',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3a3 = true;
    }
    else{
      checkboxVals.sec3a3 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //fourth checkbox
  $$(document).on('change','#check3a4',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3a4 = true;
    }
    else{
      checkboxVals.sec3a4 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
});
$$(document).on('page:afterout', '.page[data-name="section3a"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section3a "+dateTime});
});
//section3b
$$(document).on('page:beforein', '.page[data-name="section3b"]', function (e) {

  //initialize checkbox values from local storage
  var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
  if(checkboxVals.sec3b1===true){
    document.getElementById("check3b1").checked = true;
  }else {
    document.getElementById("check3b1").checked = false;
  }
  //second checkbox
  if(checkboxVals.sec3b2===true){
    document.getElementById("check3b2").checked = true;
  }else {
    document.getElementById("check3b2").checked = false;
  }
  //third checkbox
  if(checkboxVals.sec3b3===true){
    document.getElementById("check3b3").checked = true;
  }else {
    document.getElementById("check3b3").checked = false;
  }
  //forth checkbox
  if(checkboxVals.sec3b4===true){
    document.getElementById("check3b4").checked = true;
  }else {
    document.getElementById("check3b4").checked = false;
  }

  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section3b "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section3b = pageVisits.section3b+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));

  //store checkbox values
  $$(document).on('change','#check3b1',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3b1 = true;
    }
    else{
      checkboxVals.sec3b1 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //second checkbox
  $$(document).on('change','#check3b2',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3b2 = true;
    }
    else{
      checkboxVals.sec3b2 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //thrid checkbox
  $$(document).on('change','#check3b3',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3b3 = true;
    }
    else{
      checkboxVals.sec3b3 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //fourth checkbox
  $$(document).on('change','#check3b4',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3b4 = true;
    }
    else{
      checkboxVals.sec3b4 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
});
$$(document).on('page:afterout', '.page[data-name="section3b"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section3b "+dateTime});
});
//section3c
$$(document).on('page:beforein', '.page[data-name="section3c"]', function (e) {

  //initialize checkbox values from local storage
  var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
  if(checkboxVals.sec3c1===true){
    document.getElementById("check3c1").checked = true;
  }else {
    document.getElementById("check3c1").checked = false;
  }
  //second checkbox
  if(checkboxVals.sec3c2===true){
    document.getElementById("check3c2").checked = true;
  }else {
    document.getElementById("check3c2").checked = false;
  }
  //third checkbox
  if(checkboxVals.sec3c3===true){
    document.getElementById("check3c3").checked = true;
  }else {
    document.getElementById("check3c3").checked = false;
  }
  //forth checkbox
  if(checkboxVals.sec3c4===true){
    document.getElementById("check3c4").checked = true;
  }else {
    document.getElementById("check3c4").checked = false;
  }
  //5th
  if(checkboxVals.sec3c5===true){
    document.getElementById("check3c5").checked = true;
  }else {
    document.getElementById("check3c5").checked = false;
  }
  //6th
  if(checkboxVals.sec3c6===true){
    document.getElementById("check3c6").checked = true;
  }else {
    document.getElementById("check3c6").checked = false;
  }
  //7th checkbox
  if(checkboxVals.sec3c7===true){
    document.getElementById("check3c7").checked = true;
  }else {
    document.getElementById("check3c7").checked = false;
  }
  //8th checkbox
  if(checkboxVals.sec3c8===true){
    document.getElementById("check3c8").checked = true;
  }else {
    document.getElementById("check3c8").checked = false;
  }
  //9th checkbox
  if(checkboxVals.sec3c9===true){
    document.getElementById("check3c9").checked = true;
  }else {
    document.getElementById("check3c9").checked = false;
  }
  //10th checkbox
  if(checkboxVals.sec3c10===true){
    document.getElementById("check3c10").checked = true;
  }else {
    document.getElementById("check3c10").checked = false;
  }

  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section3c "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section3c = pageVisits.section3c+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));

  //store checkbox values
  $$(document).on('change','#check3c1',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3c1 = true;
    }
    else{
      checkboxVals.sec3c1 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //second checkbox
  $$(document).on('change','#check3c2',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3c2 = true;
    }
    else{
      checkboxVals.sec3c2 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //thrid checkbox
  $$(document).on('change','#check3c3',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3c3 = true;
    }
    else{
      checkboxVals.sec3c3 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //fourth checkbox
  $$(document).on('change','#check3c4',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3c4 = true;
    }
    else{
      checkboxVals.sec3c4 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //5 checkbox
  $$(document).on('change','#check3c5',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3c5 = true;
    }
    else{
      checkboxVals.sec3c5 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //6 checkbox
  $$(document).on('change','#check3c6',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3c6 = true;
    }
    else{
      checkboxVals.sec3c6 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //7 checkbox
  $$(document).on('change','#check3c7',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3c7 = true;
    }
    else{
      checkboxVals.sec3c7 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //8 checkbox
  $$(document).on('change','#check3c8',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3c8 = true;
    }
    else{
      checkboxVals.sec3c8 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //9 checkbox
  $$(document).on('change','#check3c9',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3c9 = true;
    }
    else{
      checkboxVals.sec3c9 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //10 checkbox
  $$(document).on('change','#check3c10',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3c10 = true;
    }
    else{
      checkboxVals.sec3c10 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
});
$$(document).on('page:afterout', '.page[data-name="section3c"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section3c "+dateTime});
});
//section3d
$$(document).on('page:beforein', '.page[data-name="section3d"]', function (e) {

  //initialize checkbox values from local storage
  var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
  if(checkboxVals.sec3d1===true){
    document.getElementById("check3d1").checked = true;
  }else {
    document.getElementById("check3d1").checked = false;
  }
  //second checkbox
  if(checkboxVals.sec3d2===true){
    document.getElementById("check3d2").checked = true;
  }else {
    document.getElementById("check3d2").checked = false;
  }
  //third checkbox
  if(checkboxVals.sec3d3===true){
    document.getElementById("check3d3").checked = true;
  }else {
    document.getElementById("check3d3").checked = false;
  }
  //forth checkbox
  if(checkboxVals.sec3d4===true){
    document.getElementById("check3d4").checked = true;
  }else {
    document.getElementById("check3d4").checked = false;
  }

  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section3d "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section3d = pageVisits.section3d+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));

  //store checkbox values
  $$(document).on('change','#check3d1',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3d1 = true;
    }
    else{
      checkboxVals.sec3d1 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //second checkbox
  $$(document).on('change','#check3d2',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3d2 = true;
    }
    else{
      checkboxVals.sec3d2 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //thrid checkbox
  $$(document).on('change','#check3d3',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3d3 = true;
    }
    else{
      checkboxVals.sec3d3 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //fourth checkbox
  $$(document).on('change','#check3d4',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3d4 = true;
    }
    else{
      checkboxVals.sec3d4 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
});
$$(document).on('page:afterout', '.page[data-name="section3d"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section3d "+dateTime});
});
//section3e
$$(document).on('page:beforein', '.page[data-name="section3e"]', function (e) {

  //initialize checkbox values from local storage
  var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
  if(checkboxVals.sec3e1===true){
    document.getElementById("check3e1").checked = true;
  }else {
    document.getElementById("check3e1").checked = false;
  }
  //second checkbox
  if(checkboxVals.sec3e2===true){
    document.getElementById("check3e2").checked = true;
  }else {
    document.getElementById("check3e2").checked = false;
  }
  //third checkbox
  if(checkboxVals.sec3e3===true){
    document.getElementById("check3e3").checked = true;
  }else {
    document.getElementById("check3e3").checked = false;
  }
  //forth checkbox
  if(checkboxVals.sec3e4===true){
    document.getElementById("check3e4").checked = true;
  }else {
    document.getElementById("check3e4").checked = false;
  }
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section3e "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section3e = pageVisits.section3e+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));

  //store checkbox values
  $$(document).on('change','#check3e1',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3e1 = true;
    }
    else{
      checkboxVals.sec3e1 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //second checkbox
  $$(document).on('change','#check3e2',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3e2 = true;
    }
    else{
      checkboxVals.sec3e2 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //thrid checkbox
  $$(document).on('change','#check3e3',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3e3 = true;
    }
    else{
      checkboxVals.sec3e3 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //fourth checkbox
  $$(document).on('change','#check3e4',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3e4 = true;
    }
    else{
      checkboxVals.sec3e4 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
});
$$(document).on('page:afterout', '.page[data-name="section3e"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section3e "+dateTime});
});
//section3f
$$(document).on('page:beforein', '.page[data-name="section3f"]', function (e) {

  //initialize checkbox values from local storage
  var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
  if(checkboxVals.sec3f1===true){
    document.getElementById("check3f1").checked = true;
  }else {
    document.getElementById("check3f1").checked = false;
  }
  //second checkbox
  if(checkboxVals.sec3f2===true){
    document.getElementById("check3f2").checked = true;
  }else {
    document.getElementById("check3f2").checked = false;
  }
  //third checkbox
  if(checkboxVals.sec3f3===true){
    document.getElementById("check3f3").checked = true;
  }else {
    document.getElementById("check3f3").checked = false;
  }
  //forth checkbox
  if(checkboxVals.sec3f4===true){
    document.getElementById("check3f4").checked = true;
  }else {
    document.getElementById("check3f4").checked = false;
  }

  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section3f "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section3f = pageVisits.section3f+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));

  //store checkbox values
  $$(document).on('change','#check3f1',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3f1 = true;
    }
    else{
      checkboxVals.sec3f1 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //second checkbox
  $$(document).on('change','#check3f2',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3f2 = true;
    }
    else{
      checkboxVals.sec3f2 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //thrid checkbox
  $$(document).on('change','#check3f3',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3f3 = true;
    }
    else{
      checkboxVals.sec3f3 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //fourth checkbox
  $$(document).on('change','#check3f4',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3f4 = true;
    }
    else{
      checkboxVals.sec3f4 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
});
$$(document).on('page:afterout', '.page[data-name="section3f"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section3f "+dateTime});
});
//section3g
$$(document).on('page:beforein', '.page[data-name="section3g"]', function (e) {

  //initialize checkbox values from local storage
  var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
  if(checkboxVals.sec3g1===true){
    document.getElementById("check3g1").checked = true;
  }else {
    document.getElementById("check3g1").checked = false;
  }
  //second checkbox
  if(checkboxVals.sec3g2===true){
    document.getElementById("check3g2").checked = true;
  }else {
    document.getElementById("check3g2").checked = false;
  }
  //third checkbox
  if(checkboxVals.sec3g3===true){
    document.getElementById("check3g3").checked = true;
  }else {
    document.getElementById("check3g3").checked = false;
  }
  //forth checkbox
  if(checkboxVals.sec3g4===true){
    document.getElementById("check3g4").checked = true;
  }else {
    document.getElementById("check3g4").checked = false;
  }
  //5th
  if(checkboxVals.sec3g5===true){
    document.getElementById("check3g5").checked = true;
  }else {
    document.getElementById("check3g5").checked = false;
  }
  //6th
  if(checkboxVals.sec3g6===true){
    document.getElementById("check3g6").checked = true;
  }else {
    document.getElementById("check3g6").checked = false;
  }
  //7th checkbox
  if(checkboxVals.sec3g7===true){
    document.getElementById("check3g7").checked = true;
  }else {
    document.getElementById("check3g7").checked = false;
  }
  //8th checkbox
  if(checkboxVals.sec3g8===true){
    document.getElementById("check3g8").checked = true;
  }else {
    document.getElementById("check3g8").checked = false;
  }
  //9th checkbox
  if(checkboxVals.sec3g9===true){
    document.getElementById("check3g9").checked = true;
  }else {
    document.getElementById("check3g9").checked = false;
  }
  //10th checkbox
  if(checkboxVals.sec3g10===true){
    document.getElementById("check3g10").checked = true;
  }else {
    document.getElementById("check3g10").checked = false;
  }
  //11th checkbox
  if(checkboxVals.sec3g11===true){
    document.getElementById("check3g11").checked = true;
  }else {
    document.getElementById("check3g11").checked = false;
  }
   //12th checkbox
    if(checkboxVals.sec3g12===true){
      document.getElementById("check3g12").checked = true;
    }else {
      document.getElementById("check3g12").checked = false;
    }

  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section3g "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section3g = pageVisits.section3g+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));
  //store checkbox values
  $$(document).on('change','#check3g1',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3g1 = true;
    }
    else{
      checkboxVals.sec3g1 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //second checkbox
  $$(document).on('change','#check3g2',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3g2 = true;
    }
    else{
      checkboxVals.sec3g2 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //thrid checkbox
  $$(document).on('change','#check3g3',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3g3 = true;
    }
    else{
      checkboxVals.sec3g3 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //fourth checkbox
  $$(document).on('change','#check3g4',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3g4 = true;
    }
    else{
      checkboxVals.sec3g4 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //5 checkbox
  $$(document).on('change','#check3g5',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3g5 = true;
    }
    else{
      checkboxVals.sec3g5 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //6 checkbox
  $$(document).on('change','#check3g6',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3g6 = true;
    }
    else{
      checkboxVals.sec3g6 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //7 checkbox
  $$(document).on('change','#check3g7',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3g7 = true;
    }
    else{
      checkboxVals.sec3g7 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //8 checkbox
  $$(document).on('change','#check3g8',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3g8 = true;
    }
    else{
      checkboxVals.sec3g8 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //9 checkbox
  $$(document).on('change','#check3g9',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3g9 = true;
    }
    else{
      checkboxVals.sec3g9 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //10 checkbox
  $$(document).on('change','#check3g10',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3g10 = true;
    }
    else{
      checkboxVals.sec3g10 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //11 checkbox
  $$(document).on('change','#check3g11',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3g11 = true;
    }
    else{
      checkboxVals.sec3g11 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //12 checkbox
  $$(document).on('change','#check3g12',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec3g12 = true;
    }
    else{
      checkboxVals.sec3g12 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
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

  //initialize checkbox values from local storage
  var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
  if(checkboxVals.sec4a1===true){
    document.getElementById("check4a1").checked = true;
  }else {
    document.getElementById("check4a1").checked = false;
  }
  //second checkbox
  if(checkboxVals.sec4a2===true){
    document.getElementById("check4a2").checked = true;
  }else {
    document.getElementById("check4a2").checked = false;
  }
  //third checkbox
  if(checkboxVals.sec4a3===true){
    document.getElementById("check4a3").checked = true;
  }else {
    document.getElementById("check4a3").checked = false;
  }
  //forth checkbox
  if(checkboxVals.sec4a4===true){
    document.getElementById("check4a4").checked = true;
  }else {
    document.getElementById("check4a4").checked = false;
  }

  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section4a "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section4a = pageVisits.section4a+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));

  //store checkbox values
  $$(document).on('change','#check4a1',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec4a1 = true;
    }
    else{
      checkboxVals.sec4a1 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //second checkbox
  $$(document).on('change','#check4a2',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec4a2 = true;
    }
    else{
      checkboxVals.sec4a2 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //thrid checkbox
  $$(document).on('change','#check4a3',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec4a3 = true;
    }
    else{
      checkboxVals.sec4a3 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //fourth checkbox
  $$(document).on('change','#check4a4',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec4a4 = true;
    }
    else{
      checkboxVals.sec4a4 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
});
$$(document).on('page:afterout', '.page[data-name="section4a"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section4a "+dateTime});
});
//section4b
$$(document).on('page:beforein', '.page[data-name="section4b"]', function (e) {

  //initialize checkbox values from local storage
  var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
  if(checkboxVals.sec4b1===true){
    document.getElementById("check4b1").checked = true;
  }else {
    document.getElementById("check4b1").checked = false;
  }
  //second checkbox
  if(checkboxVals.sec4b2===true){
    document.getElementById("check4b2").checked = true;
  }else {
    document.getElementById("check4b2").checked = false;
  }
  //third checkbox
  if(checkboxVals.sec4b3===true){
    document.getElementById("check4b3").checked = true;
  }else {
    document.getElementById("check4b3").checked = false;
  }
  //forth checkbox
  if(checkboxVals.sec4b4===true){
    document.getElementById("check4b4").checked = true;
  }else {
    document.getElementById("check4b4").checked = false;
  }

  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section4b "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section4b = pageVisits.section4b+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));

  //store checkbox values
  $$(document).on('change','#check4b1',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec4b1 = true;
    }
    else{
      checkboxVals.sec4b1 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //second checkbox
  $$(document).on('change','#check4b2',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec4b2 = true;
    }
    else{
      checkboxVals.sec4b2 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //thrid checkbox
  $$(document).on('change','#check4b3',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec4b3 = true;
    }
    else{
      checkboxVals.sec4b3 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //fourth checkbox
  $$(document).on('change','#check4b4',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec4b4 = true;
    }
    else{
      checkboxVals.sec4b4 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
});
$$(document).on('page:afterout', '.page[data-name="section4b"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section4b "+dateTime});
});
//section4c
$$(document).on('page:beforein', '.page[data-name="section4c"]', function (e) {

  //initialize checkbox values from local storage
  var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
  if(checkboxVals.sec4c1===true){
    document.getElementById("check4c1").checked = true;
  }else {
    document.getElementById("check4c1").checked = false;
  }
  //second checkbox
  if(checkboxVals.sec4c2===true){
    document.getElementById("check4c2").checked = true;
  }else {
    document.getElementById("check4c2").checked = false;
  }
  //third checkbox
  if(checkboxVals.sec4c3===true){
    document.getElementById("check4c3").checked = true;
  }else {
    document.getElementById("check4c3").checked = false;
  }
  //forth checkbox
  if(checkboxVals.sec4c4===true){
    document.getElementById("check4c4").checked = true;
  }else {
    document.getElementById("check4c4").checked = false;
  }

  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section4c "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section4c = pageVisits.section4c+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));

  //store checkbox values
  $$(document).on('change','#check4c1',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec4c1 = true;
    }
    else{
      checkboxVals.sec4c1 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //second checkbox
  $$(document).on('change','#check4c2',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec4c2 = true;
    }
    else{
      checkboxVals.sec4c2 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //thrid checkbox
  $$(document).on('change','#check4c3',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec4c3 = true;
    }
    else{
      checkboxVals.sec4c3 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //fourth checkbox
  $$(document).on('change','#check4c4',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec4c4 = true;
    }
    else{
      checkboxVals.sec4c4 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
});
$$(document).on('page:afterout', '.page[data-name="section4c"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section4c "+dateTime});
});
//section4d
$$(document).on('page:beforein', '.page[data-name="section4d"]', function (e) {

  //initialize checkbox values from local storage
  var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
  if(checkboxVals.sec4d1===true){
    document.getElementById("check4d1").checked = true;
  }else {
    document.getElementById("check4d1").checked = false;
  }
  //second checkbox
  if(checkboxVals.sec4d2===true){
    document.getElementById("check4d2").checked = true;
  }else {
    document.getElementById("check4d2").checked = false;
  }
  //third checkbox
  if(checkboxVals.sec4d3===true){
    document.getElementById("check4d3").checked = true;
  }else {
    document.getElementById("check4d3").checked = false;
  }
  //forth checkbox
  if(checkboxVals.sec4d4===true){
    document.getElementById("check4d4").checked = true;
  }else {
    document.getElementById("check4d4").checked = false;
  }

  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section4d "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section4d = pageVisits.section4d+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));

  //store checkbox values
  $$(document).on('change','#check4d1',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec4d1 = true;
    }
    else{
      checkboxVals.sec4d1 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //second checkbox
  $$(document).on('change','#check4d2',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec4d2 = true;
    }
    else{
      checkboxVals.sec4d2 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //thrid checkbox
  $$(document).on('change','#check4d3',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec4d3 = true;
    }
    else{
      checkboxVals.sec4d3 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //fourth checkbox
  $$(document).on('change','#check4d4',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec4d4 = true;
    }
    else{
      checkboxVals.sec4d4 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
});
$$(document).on('page:afterout', '.page[data-name="section4d"]', function (e) {
  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page endTime":username+" section4d "+dateTime});
});
//section4e
$$(document).on('page:beforein', '.page[data-name="section4e"]', function (e) {

  //initialize checkbox values from local storage
  var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
  if(checkboxVals.sec4e1===true){
    document.getElementById("check4e1").checked = true;
  }else {
    document.getElementById("check4e1").checked = false;
  }
  //second checkbox
  if(checkboxVals.sec4e2===true){
    document.getElementById("check4e2").checked = true;
  }else {
    document.getElementById("check4e2").checked = false;
  }
  //third checkbox
  if(checkboxVals.sec4e3===true){
    document.getElementById("check4e3").checked = true;
  }else {
    document.getElementById("check4e3").checked = false;
  }
  //forth checkbox
  if(checkboxVals.sec4e4===true){
    document.getElementById("check4e4").checked = true;
  }else {
    document.getElementById("check4e4").checked = false;
  }
  //five
  var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
  if(checkboxVals.sec4e5===true){
    document.getElementById("check4e5").checked = true;
  }else {
    document.getElementById("check4e5").checked = false;
  }
  //6 checkbox
  if(checkboxVals.sec4e6===true){
    document.getElementById("check4e6").checked = true;
  }else {
    document.getElementById("check4e6").checked = false;
  }
  //7 checkbox
  if(checkboxVals.sec4e7===true){
    document.getElementById("check4e7").checked = true;
  }else {
    document.getElementById("check4e7").checked = false;
  }
  //8 checkbox
  if(checkboxVals.sec4e8===true){
    document.getElementById("check4e8").checked = true;
  }else {
    document.getElementById("check4e8").checked = false;
  }
  //9
  var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
  if(checkboxVals.sec4e9===true){
    document.getElementById("check4e9").checked = true;
  }else {
    document.getElementById("check4e9").checked = false;
  }
  //10 checkbox
  if(checkboxVals.sec4e10===true){
    document.getElementById("check4e10").checked = true;
  }else {
    document.getElementById("check4e10").checked = false;
  }

  var currentDate = new Date();
  var dateTime = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + "  " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  window.fabric.Answers.sendContentView("mHBSguide","timestamps",1234,{"username page startTime":username+" section4e "+dateTime});
  //local storage
  var retrievedObject = localStorage.getItem('pageVisits');
  var pageVisits = JSON.parse(retrievedObject);
  pageVisits.section4e = pageVisits.section4e+1;
  storage.setItem("pageVisits",JSON.stringify(pageVisits));

  //store checkbox values
  $$(document).on('change','#check4e1',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec4e1 = true;
    }
    else{
      checkboxVals.sec4e1 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //second checkbox
  $$(document).on('change','#check4e2',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec4e2 = true;
    }
    else{
      checkboxVals.sec4e2 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //thrid checkbox
  $$(document).on('change','#check4e3',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec4e3 = true;
    }
    else{
      checkboxVals.sec4e3 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //fourth checkbox
  $$(document).on('change','#check4e4',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec4e4 = true;
    }
    else{
      checkboxVals.sec4e4 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //5 checkbox
  $$(document).on('change','#check4e5',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec4e5 = true;
    }
    else{
      checkboxVals.sec4e5 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //6 checkbox
  $$(document).on('change','#check4e6',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec4e6 = true;
    }
    else{
      checkboxVals.sec4e6 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //7 checkbox
  $$(document).on('change','#check4e7',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec4e7 = true;
    }
    else{
      checkboxVals.sec4e7 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //8 checkbox
  $$(document).on('change','#check4e8',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec4e8 = true;
    }
    else{
      checkboxVals.sec4e8 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //9 checkbox
  $$(document).on('change','#check4e9',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec4e9 = true;
    }
    else{
      checkboxVals.sec4e9 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });
  //10 checkbox
  $$(document).on('change','#check4e10',function(){
    var checkboxVals = JSON.parse(localStorage.getItem('checkboxVals'));
    if(this.checked){
      checkboxVals.sec4e10 = true;
    }
    else{
      checkboxVals.sec4e10 = false;
    }
    storage.setItem("checkboxVals",JSON.stringify(checkboxVals));
  });

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
