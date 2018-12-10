var $$ = Dom7;
// Framework7 App main instance
var app = new Framework7({
  root: '#app', // App root element
  id: 'edu.iupui.soic.biohealth.plhi.mhbs', // App bundle ID - matched to Android package
  name: 'mHBSTraining', // App name
  theme: 'auto',
  init: false,
  // Automatic theme detection
  // App root data
  data: function () {
    return {
      user: {
        username: '',
        pin: '',
        group: ''
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
var userId = '';
var tempCredentials = {
  username: '',
  password: '',
  serverURL: ''
};

var download = false;
var storage = window.localStorage;

// Init/Create views
var homeView = app.views.create('#view-home', {
  url: '/'
});

var videoListView = app.views.create('#view-videoList', {
  //change testvideo to videoList for furtur work.
  //testvideo is for v 2.0
  url: '/testvideo/'
});

$$('#view-videoList').on('tab:show', function () {
  if(app.data.user.group == 'groupA') {
    app.tab.show("#view-home");
    var sApp = startApp.set({
      "application":"uk.ac.ox.tropicalmedicine.eHBB"
    }).start();
  } else if(app.data.user.group == 'groupC') {
    app.tab.show("#view-home");
  }
});

var guideView = app.views.create('#view-guide', {
  url: '/mhbsmain/'
});

// swiper for images
var swiper = app.swiper.create('.swiper-container', {
  speed: 400,
  spaceBetween: 100
});

// show login screen
var ls = app.loginScreen.create({el: '#login-screen'});
ls.open(false);


function onLoad() {
  // if we don't have credentials in secure storage, send a broadcast, store them, and log the user in
  if (secureStorageInactive) {
    // intent callback received from tracker-capture
    window.plugins.intentShim.onIntent(onIntent);
    // show the preloader while we wait for credentials from tracker-capture
    // set up secure storage, in the callback, broadcast to tracker
    app.data.storage = ss();
  }
}

// login
$$('.login-button').on('click', function () {
  //app.preloader.show('blue');
  setupPageVisits();
  setupCheckBoxValues();
  setUpCheckBoxListeners();
  setUpPageEvents();
  var pin = $$('#inputPin input').val();
  var groupA = ["1001","1004","1006","1008","1014","1016","1021","1023","1025","1027","1032","1033","1037","1041","1044"
    ,"1047","1048","1055","1056","1059","1061","1063","1068","1070","1073","1077","1078","1082","1085","1087","1090",
    "1093","1094","1099","1104","1107","1112","1113","1115","1117","1124","1125","1128","1130","1132","1135","1142",
    "1143","1144","1147","1152","1156","1157","1159","1164","1165","1166","1173","1174","1177","1181","1185","1186",
    "1191","1193","1199","1200","1201","1206","1210","1212","1215","1217","1221","1222","1227","1230","1231","1234",
    "1238","1241","1244","1248","1251","1252","1256","1259","1260","1264","1267","1268","1273","1277","1282","1284",
    "1285","1288","1293","1294","1296","1300","1303","1310","1311","1312","1317","1319","1321","1326","1327","1331",
    "1335","1337","1339","1342","1345","1350","1353","1354","1358","1361","1364","1367","1369","1373","1376","1380",
    "1383","1386","1389","1390","1395","1398","1400","1403","1405","1408","1413","1416","1417","1421","1423","1427",
    "1432","1434","1435","1440","1443","1444","1449","1451","1455","1458","1459","1463","1467","1470","1474","1476",
    "1477","1479","1484","1487","1491","1493","1496","1497","1502","1506","1507","1513","1515","1516","1519","1521",
    "1528","1529","1532","1535","1536","1540","1545","1548","1551","1552","1554","1560","1564","1565","1568","1569",
    "1575","1577","1579","1583","1586","1590","1591","1595","1596","1600","1605","1607","1613","1614","1615","1620",
    "1621","1624","1628","1630","1632","1636","1641","1642","1646","1650","1652","1655","1658","1661","1662","1666",
    "1669","1673","1677","1681","1683","1684","1689","1691","1693","1698","1701","1704","1705","1707","1713","1714",
    "1717","1722","1723","1727","1730","1734","1737","1738","1742","1747","1749","1753","1755","1756","1758","1764",
    "1765","1770","1771","1775","1779","1782","1785","1787","1789","1791","1797","1798","1801","1805","1809","1812",
    "1813","1817","1820","1824","1829","1830","1833","1836","1838","1840","1843","1846","1849","1850","1855","1858",
    "1861","1865","1867","1870","1875","1880","1881","1882","1887","1888","1891","1893","1897","1903","1905","1908",
    "1913","1914","1918","1921","1925","1929","1931","1933","1937","1942","1943","1944","1948","1952","1956","1957",
    "1961","1963","1966","1968","1972","1973","1979","1981","1985","1986","1987","1995","1996","1998","2001","2004",
    "2006","2008","2014","2016","2021","2023","2025","2027","2032","2033","2037","2041","2044","2047","2048","2055",
    "2056","2059","2061","2063","2068","2070","2073","2077","2078","2082","2085","2087","2090","2093","2094","2099",
    "2100","2101","2106","2110","2112","2115","2117","2121","2122","2127","2130","2131","2134","2138","2141","2144",
    "2148","2151","2152","2156","2159","2160","2164","2167","2168","2173","2177","2182","2184","2185","2188","2193",
    "2194","2196","2200","2203","2210","2211","2212","2217","2219","2221","2226","2227","2231","2235","2237","2239",
    "2242","2245","2250","2253","2254","2258","2261","2264","2267","2269","2273","2276","2280","2283","2286","2289",
    "2290","2295","2298","2303","2305","2308","2313","2314","2318","2321","2325","2329","2331","2333","2337","2342",
    "2343","2344","2348","2352","2356","2357","2361","2363","2366","2368","2372","2373","2379","2381","2385","2386",
    "2387","2395","2396","2398","2404","2407","2412","2413","2415","2417","2424","2425","2428","2430","2432","2435",
    "2442","2443","2444","2447","2452","2456","2457","2459","2464","2465","2466","2473","2474","2477","2481","2485",
    "2486","2491","2493","2499","2501","2505","2509","2512","2513","2517","2520","2524","2529","2530","2533","2536",
    "2538","2540","2543","2546","2549","2550","2555","2558","2561","2565","2567","2570","2575","2580","2581","2582",
    "2587","2588","2591","2593","2597","2601","2604","2605","2607","2613","2614","2617","2622","2623","2627","2630",
    "2634","2637","2638","2642","2647","2649","2653","2655","2656","2658","2664","2665","2670","2671","2675","2679",
    "2682","2685","2687","2689","2691","2697","2698","2700","2705","2707","2713","2714","2715","2720","2721","2724",
    "2728","2730","2732","2736","2741","2742","2746","2750","2752","2755","2758","2761","2762","2766","2769","2773",
    "2777","2781","2783","2784","2789","2791","2793","2798","2802","2806","2807","2813","2815","2816","2819","2821",
    "2828","2829","2832","2835","2836","2840","2845","2848","2851","2852","2854","2860","2864","2865","2868","2869",
    "2875","2877","2879","2883","2886","2890","2891","2895","2896","2900","2903","2905","2908","2913","2916","2917",
    "2921","2923","2927","2932","2934","2935","2940","2943","2944","2949","2951","2955","2958","2959","2963","2967",
    "2970","2974","2976","2977","2979","2984","2987","2991","2993","2996","2997"];

  var groupB = ["1002","1005","1007","1011","1012","1017","1018","1019","1026","1029","1031","1034","1038","1039","1043",
    "1045","1050","1053","1054","1058","1062","1065","1067","1069","1072","1075","1079","1084","1086","1089","1092",
    "1096","1098","1101","1103","1105","1109","1110","1114","1118","1122","1123","1127","1129","1133","1137","1138",
    "1140","1145","1148","1150","1153","1154","1160","1163","1167","1168","1171","1176","1178","1182","1184","1187",
    "1189","1192","1195","1198","1204","1205","1208","1211","1213","1218","1220","1224","1226","1229","1233","1235",
    "1240","1242","1245","1247","1250","1254","1255","1258","1262","1266","1269","1272","1274","1275","1279","1280",
    "1286","1289","1291","1295","1299","1302","1304","1307","1309","1313","1315","1320","1322","1323","1329","1332",
    "1334","1336","1341","1344","1346","1349","1351","1355","1357","1360","1365","1368","1371","1374","1377","1378",
    "1382","1384","1391","1392","1394","1397","1399","1402","1406","1409","1412","1415","1418","1422","1425","1428",
    "1429","1430","1436","1438","1442","1445","1446","1450","1454","1457","1460","1464","1466","1469","1472","1473",
    "1478","1480","1483","1488","1490","1492","1499","1500","1501","1505","1509","1510","1511","1517","1520","1524",
    "1525","1530","1531","1538","1539","1541","1544","1547","1550","1556","1557","1559","1563","1566","1570","1571",
    "1573","1576","1580","1582","1587","1588","1592","1594","1598","1602","1603","1608","1609","1610","1618","1619",
    "1623","1626","1627","1631","1634","1637","1639","1644","1647","1648","1653","1656","1659","1664","1665","1668",
    "1671","1674","1676","1678","1680","1685","1687","1690","1692","1697","1700","1703","1708","1710","1712","1715",
    "1719","1721","1724","1726","1731","1732","1736","1740","1743","1745","1748","1751","1754","1757","1759","1763",
    "1767","1768","1773","1774","1780","1781","1784","1786","1790","1792","1796","1802","1803","1804","1807","1811",
    "1815","1816","1819","1823","1826","1828","1831","1835","1839","1841","1845","1848","1852","1853","1856","1860",
    "1862","1866","1869","1871","1872","1878","1879","1883","1885","1889","1892","1896","1899","1900","1904","1907",
    "1910","1912","1916","1917","1922","1924","1928","1930","1932","1936","1939","1941","1946","1950","1951","1953",
    "1958","1959","1964","1965","1969","1974","1976","1978","1982","1983","1990","1991","1993","1994","1999","2002",
    "2005","2007","2011","2012","2017","2018","2019","2026","2029","2031","2034","2038","2039","2043","2045","2050",
    "2053","2054","2058","2062","2065","2067","2069","2072","2075","2079","2084","2086","2089","2092","2096","2098",
    "2104","2105","2108","2111","2113","2118","2120","2124","2126","2129","2133","2135","2140","2142","2145","2147",
    "2150","2154","2155","2158","2162","2166","2169","2172","2174","2175","2179","2180","2186","2189","2191","2195",
    "2199","2202","2204","2207","2209","2213","2215","2220","2222","2223","2229","2232","2234","2236","2241","2244",
    "2246","2249","2251","2255","2257","2260","2265","2268","2271","2274","2277","2278","2282","2284","2291","2292",
    "2294","2297","2299","2300","2304","2307","2310","2312","2316","2317","2322","2324","2328","2330","2332","2336",
    "2339","2341","2346","2350","2351","2353","2358","2359","2364","2365","2369","2374","2376","2378","2382","2383",
    "2390","2391","2393","2394","2399","2401","2403","2405","2409","2410","2414","2418","2422","2423","2427","2429",
    "2433","2437","2438","2440","2445","2448","2450","2453","2454","2460","2463","2467","2468","2471","2476","2478",
    "2482","2484","2487","2489","2492","2495","2498","2502","2503","2504","2507","2511","2515","2516","2519","2523",
    "2526","2528","2531","2535","2539","2541","2545","2548","2552","2553","2556","2560","2562","2566","2569","2571",
    "2572","2578","2579","2583","2585","2589","2592","2596","2599","2600","2603","2608","2610","2612","2615","2619",
    "2621","2624","2626","2631","2632","2636","2640","2643","2645","2648","2651","2654","2657","2659","2663","2667",
    "2668","2673","2674","2680","2681","2684","2686","2690","2692","2696","2702","2703","2708","2709","2710","2718",
    "2719","2723","2726","2727","2731","2734","2737","2739","2744","2747","2748","2753","2756","2759","2764","2765",
    "2768","2771","2774","2776","2778","2780","2785","2787","2790","2792","2797","2800","2801","2805","2809","2810",
    "2811","2817","2820","2824","2825","2830","2831","2838","2839","2841","2844","2847","2850","2856","2857","2859",
    "2863","2866","2870","2871","2873","2876","2880","2882","2887","2888","2892","2894","2898","2902","2906","2909",
    "2912","2915","2918","2922","2925","2928","2929","2930","2936","2938","2942","2945","2946","2950","2954","2957",
    "2960","2964","2966","2969","2972","2973","2978","2980","2983","2988","2990","2992","2999"];

  if (pin !== "") {
    var pinFound = false;
    app.data.user.pin.split(',').forEach(function (element) {
      if (pin === element) {
        pinFound = true;
        userId = pin;
      }
    });
    if (pinFound) {
      //if pin is correct , then call trackNumLoginsByPin();
      if(groupA.includes(pin)){
        app.data.user.group = 'groupA'
      } else if (groupB.includes(pin)){
        app.data.user.group = 'groupB'
      } else {
        app.data.user.group = 'groupC'
      }
      trackNumLoginsByPin();
      $$('#inputPin input').val("");
      ls.close();
      if (downloadAble) {
        app.preloader.hide();
      }
    } else {
      alert('Incorrect PIN');
    }
  }
  // can be used to fill in the value of the pin placeholder
  // pinPlaceholder.html("<input type=\"text\" name=\"selectPin\" placeholder="+app.data.user.pin+">");
  // can be used to fill in the value of the pin input box
  app.data.intentReceived = false;

});

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
        if (route.url.indexOf("pages") !== -1) {
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
    storage.setItem("timeOffline", storedOfflineTime);
  }
  // reset start and end times for next round where we go offline/online
  app.data.timeOffline.startTime = null;
  app.data.timeOffline.endTime = null;
});

// set basic auth request header
function setHeaders() {
  // todo: remove
  app.request.setup({
    headers: {
      'Authorization': 'Basic ' + btoa(tempCredentials.username + ":" + tempCredentials.password)
    }
  });
}

// track writing credentials to secure storage, only continue with three calls, which emits to 'downloadOk'
app.on('storedCredential', function (key) {
  if (key === "username") {
    wroteToSecure();
  } else if (key === "password") {
    wroteToSecure();
  }
  else if (key === "serverURL") {
    wroteToSecure();
  }
});

// track reading credentials from secure storage, only continue with three calls, which emits to 'credentials read'
app.on('gotCredential', function (key, value) {
  if (key === "username") {
    readFromSecure();
    tempCredentials.username = value;
  } else if (key === "password") {
    readFromSecure();
    tempCredentials.password = value;
  }
  else if (key === "serverURL") {
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
  /* make sure we got both thumbnail and duration */
  metaDataLoaded = metaDataLoaded + 1;
  if (metaDataLoaded < 2) {
    return;
  } else {
    metaDataLoaded = 0;
  }
  // hide pre-loader once we downloaded content
  app.preloader.hide();
  for (var i in documentList) {
    if (documentList[i].contentType === "video/webm") {
      app.data.videoList.push(documentList[i]);
    } else if (documentList[i].contentType === "application/pdf") {
      app.data.pdfList.push(documentList[i]);
    }
  }

  // routes user to video list once lists of content are loaded
  homeView.router.navigate('/videoList/');
});

// takes the file name of the path to access if we found the file on device or wrote the file to device
app.on("fileOnDevice", function (filePath) {
  /* this variable must be named photos, if the name is changed, this will not work.
   That is because it is defined in photo browser in framework7
  */
  var photos = [
    {
      html: '<video controls autoplay><source id="myVideo" src="/data/data/edu.iupui.soic.biohealth.plhi.mhbs/files/files' + filePath + '" type=\'video/webm;codecs="vp8, vorbis"\'></video>',
      captions: '',
    }
  ];
  myPhotoBrowserPopupDark = app.photoBrowser.create({
    photos: photos,
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

//temporary video for plays
$$(document).on('click', "#videoplay", function () {
  var photos1 = [
    {
	  html: '<iframe src="img/vid/keeping_the_baby_warm.webm" frameborder="0" allowfullscreen></iframe>',
      captions: '',
    }
  ];
  myPhotoBrowserPopupDark1 = app.photoBrowser.create({
    photos: photos1,
    theme: 'dark',
    type: 'popup',
    navbar: true,
    navbarOfText: "/",
    toolbar: false,
  });
  // ready to show video
  myPhotoBrowserPopupDark1.open();
});
// Click Events ------------

/* triggered when we click on a video item in the list in /videoList/
// get the id of the video, check if it exists already, get permission to download
 */
$$(document).on('click', ".pb-standalone-video", function () {
  currentID = this.id;
  videoCaption = this.innerText;
  checkFile();
  getDownloadAccessToken();
});

/* triggered when we click on mhbs tracker in the left panel sidebar of index.html
   ues darryncampbell intent plugin
*/
$$(document).on('click', ".mHBSTracker", function () {
  var sApp = startApp.set({
    "component": ["edu.iupui.soic.bhi.plhi.mhbs.trackercapture", "org.hisp.dhis.android.sdk.ui.activities.SplashActivity"],
    "flags": ["FLAG_ACTIVITY_NEW_TASK"]
  }).start();
});

/* basically while we are downloading shows the preloader
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
  var path = '/' + currentID + ".webm";
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
    // todo: remove
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
  secureParamsStored = 0;
  // three credentials read
  app.emit("credentialsRead");
}

// if file exists we can display it
function fileExists(fileEntry) {
  app.emit("fileOnDevice", fileEntry.fullPath);
}

//TODO: need to prevent anything other than binary data writing to file
function fileDoesNotExist() {
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
    fs.root.getFile('bot.png', {create: true, exclusive: false}, function (fileEntry) {
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
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
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
  // send request
  app.request.get(server, {
      username: app.data.user.username,
      password: password
    }, function (data) {
      rawDocuments.rawXML = data;
      // ready to download content
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
      var doc = {
        title: '',
        id: '',
        contentType: '',
        duration: '',
        thumbnail: ''
      };
      tempID = documents[i].id;
      if (tempID != null) {
        doc.id = tempID;
        // grabs video durations, but too time consuming currently
        parseMetaData(doc);
        doc.title = documents[i].textContent;
        getContentTypes(parser, doc, tempID, semaphore);
        documentList.push(doc);
      }
    }
  }
}

// gets video duration, can also grab other desired data here
function parseMetaData(doc) {
  var video = document.createElement("video");
  var server = appServer + "documents/" + doc.id + "/data";
  var req = new XMLHttpRequest();
  req.open('GET', server, true);
  req.responseType = 'blob';
  req.onload = function () {

    if (this.status === 200) {
      var videoBlob = this.response;
      // preload a video blob
      video.src = window.URL.createObjectURL(videoBlob);
      video.preload = 'metadata';
      // once meta data is loaded can be grabbed, but not before then
      video.addEventListener("loadedmetadata", function () {
        video.currentTime = 5;
        var minutes = Math.floor(video.duration / 60);
        var seconds = (video.duration % 60).toFixed(0);
        if (seconds.toString().length === 1) {
          seconds = seconds.toString().concat("0");
        }
        doc.duration = minutes + ":" + seconds;
        app.emit('contentType');
      });

      video.addEventListener('loadeddata', function () {
        // specify as lazy load so we only proceed when image is ready.
        var myThumbnail = '<img class="lazy" width="80" height="80" data-src="' + thumbnail(video) + '">';
        doc.thumbnail = myThumbnail;
        app.emit('contentType')
      }, false);
    }
  };
  req.onerror = function (e) {
    console.log(e);
  };
  req.send();
}


function thumbnail(video) {
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
  document.addEventListener("backbutton", function (e) {
    homeView.router.back();
  }, false);
});

// event callbacks -----------
var onPause = function () {
  paused++;
};

var onResume = function () {
  console.log("app Resumed");
  // show the login screen (Pin screen)
  ls.open(true);
  appLaunches = appLaunches + 1;
  // store app launches on resume, how many times we launched gets sent to server
  storage.setItem("appLaunches", JSON.stringify(appLaunches));

  // always post when app launches if the app pin is set
  if (app.data.user.pin !== '') {
    setupTimeOffline();
    //trackNumLoginsByPin();
  }
};

// for when network is offline
wentOffline = function (e) {
  // if we started the app and have never been online, networkUsage = 0,
  // otherwise it starts at 1.
  if ((parseInt(storage.getItem("appLaunches")) === 0)) {
    networkUsage = 0;
  }
  //masked below lines app.preloader and alert temporarly
  //app.preloader.show('blue');
  app.data.timeOffline.startTime = new Date();
  //alert("Please connect to the internet to use the mHBS training app");
  app.data.offlineMode = true;
};

// for when network is online
wentOnline = function (e) {
  networkUsage++;
  app.preloader.hide();
  app.data.timeOffline.endTime = new Date();
  app.data.offlineMode = false;
  //trigger
  app.emit("wentOnline");
};

// calculates elapsed time in minutes
function calculateElapsedTime(startTime, endTime) {
  if (startTime <= endTime) {
    var seconds = Math.round((endTime - startTime) / 1000);
    if (seconds <= 60) {
      return seconds + "s";
    } else {
      var minutes = Math.round(seconds / 60);
      return minutes;
    }
  } else {
    return 0;
  }
}

/* send broadcast to tracker capture, uses darryncampbell plugin */
function sendBroadcastToTracker() {
  window.plugins.intentShim.sendBroadcast({
      action: 'edu.iupui.soic.bhi.plhi.mhbs.training.activities.SharedLoginActivity'
    },
    function () {
      console.log("sent Broadcast");
    },
    function () {
      console.log(" failed to send broadcast");
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
  // send request
  app.request.get(server, {
      username: app.data.user.username,
      password: password
    }, function (data) {
      if (data.indexOf(app.data.user.username) === -1) {
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
}

// set user name for our app when we stored credentials upon login
function setAppUsername() {
  app.data.storage.get(function (value) {
    app.data.user.username = value;
  }, function (error) {
    console.log(error);
  }, 'username');
}

// tracks how many times each person / pin logged in
function trackNumLoginsByPin() {
  var numLogins = storage.getItem(app.data.user.pin);
  if (isNaN(parseInt(numLogins)) || parseInt(numLogins) === 0) {
    numLogins = 1;
  } else {
    numLogins = parseInt(numLogins) + 1;
  }
  storage.setItem(app.data.user.pin, JSON.stringify(numLogins));
  setupTimeOffline();
  postEventData();
}

/* handle any incoming intent, uses darryncampbell intent plugin */
function onIntent(intent) {
  var credentialsArr = parseCredentials(intent);
  // if the intent had data, need to log in
  if (credentialsArr != null) {
    if (credentialsArr.length === 6) {
      tempCredentials.username = credentialsArr[0];
      tempCredentials.password = credentialsArr[1];
      tempCredentials.serverURL = credentialsArr[2];
      app.data.user.pin = credentialsArr[3];
      app.data.user.orgUnit = credentialsArr[4];
      app.data.user.trackerIds = credentialsArr[5];
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
  if (intent != null) {
    if (intent.extras != null) {
      app.data.intentReceived = true;
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
function getYesterdayDate(){
  var currentDate = new Date();
  return currentDate.getFullYear()+"-"+(currentDate.getMonth() + 1)+"-"+(currentDate.getDate()-1);
}
function getTodayDate(){
  var currentDate = new Date();
  return currentDate.getFullYear()+"-"+(currentDate.getMonth() + 1)+"-"+(currentDate.getDate());
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
      if (route.url.indexOf("pages") !== -1) {
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
    if (elapsedTimeArr[t].indexOf("s") !== -1) {
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
    if (checkBoxVal.toString() === "true") {
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
      if (route.url.indexOf("pages") !== -1) {
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
      initCheckboxesToStoredVal(checkBoxes);
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
function setOrgUnit(userId){
  var index = app.data.user.pin.split(',').indexOf(userId);
  return app.data.user.orgUnit.split(',')[index];
}
function setTrackerIds(userId){
  var index = app.data.user.pin.split(',').indexOf(userId);
  return app.data.user.trackerIds.split(',')[index];
}

function postEventData() {
  registerInAppUsage();
  eventPayload['eventDate'] = getTodayDate();
  eventPayload['orgUnit'] = setOrgUnit(userId);
  eventPayload['trackedEntityInstance'] = setTrackerIds(userId);
  eventPayload['storedBy'] = app.data.user.username;
  console.log("sending Payload: " + JSON.stringify(eventPayload));
  for (var i in eventPayload['dataValues']) {
    // todo: check this val
    // Number of abrupt exits or incomplete workflow for mHBS training app
    if (eventPayload['dataValues'][i].dataElement === 'ZYQJ87n45ye') {
      eventPayload['dataValues'][i].value = paused.toString();
    }
    // send time offline in minutes
    else if (eventPayload['dataValues'][i].dataElement === 'qOyP28eirAx') {
      eventPayload['dataValues'][i].value = getStoredTimeOffline().toString();
    }
    // send logins by pin
    else if (eventPayload['dataValues'][i].dataElement === 'getqONgfDtE') {
      eventPayload['dataValues'][i].value = storage.getItem(app.data.user.pin).toString();
    }
    // get number of screens
    else if (eventPayload['dataValues'][i].dataElement === 'RrIe9CA11n6') {
      eventPayload['dataValues'][i].value = getNumberOfScreens().toString();
    }
    // number of times app was started
    else if (eventPayload['dataValues'][i].dataElement === 'BgzISR1GmP8') {
      eventPayload['dataValues'][i].value = storage.getItem("appLaunches").toString();
    }
    // number of times there was network usage
    else if (eventPayload['dataValues'][i].dataElement === 'qbT1F1k8cD7') {
      eventPayload['dataValues'][i].value = networkUsage.toString();
    }
    //console.log("EVENT PAY: " + eventPayload['dataValues'][i].dataElement + " " + eventPayload['dataValues'][i].value);
    //console.log("-----------------");

  }
  postPayload();
  clearPayloadValues();
}

// get password and then post payload
function postPayload() {
  getPasswordFromSecure(makeEventPostRequest);
}

// Event Payload with params relating to mHBS training app posted to the program events on DHIS2
var eventPayload = {
  "program": "dbEHqQVQV5j",
  "orgUnit": "",
  "trackedEntityInstance": "",
  "eventDate": "",
  "programStage":"TLukEU2tvvB",
  "status": "COMPLETED",
  //"trackedEntityInstance": "vmhlccEpW4Q",
  "storedBy": "",
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
//this function registers trackedEntityInstance in app usage
function registerInAppUsage(){
  var registerpayload = {
    "program": "dbEHqQVQV5j",
    "orgUnit": setOrgUnit(userId),
    "trackedEntityInstance": setTrackerIds(userId),
    "enrollmentDate": getYesterdayDate(),
    "incidentDate": getYesterdayDate()
  }
  var eventServer = appServer + "27/enrollments";
  app.request({
    url: eventServer,
    dataType: 'json',
    processData: false,
    crossDomain: true,
    data: JSON.stringify(registerpayload),
    method: 'POST',
    contentType: 'application/json',
    beforeSend: function () {
      //do anything before sending payload
    },
    success: function (data, status, xhr) {
      console.log("Success" + data);
      //Post request completed
    },
    error: function (xhr, status) {
      console.log("Failure: " + JSON.stringify(xhr));
    }
  });
}

function makeEventPostRequest(password) {
  var eventServer = appServer + "27/events";
  app.request({
    url: eventServer,
    dataType: 'json',
    processData: false,
    crossDomain: true,
    data: JSON.stringify(eventPayload),
    method: 'POST',
    contentType: 'application/json',
    beforeSend: function () {
      //function that triggers before running
    },
    success: function (data, status, xhr) {
      console.log("Success" + data);
      //Post request completed
    },
    error: function (xhr, status) {
      console.log("Failure: " + JSON.stringify(xhr));
    }
  });
}

// can use to reset values after we send payload
function clearPayloadValues() {
  networkUsage = 1;
  storage.setItem("appLaunches", JSON.stringify(0));
  setupPageVisits();
  storage.setItem(app.data.user.pin, JSON.stringify(0));
  storage.setItem(app.data.user.orgUnit, JSON.stringify(0));
  storage.setItem(app.data.user.trackerIds,JSON.stringify(0));
  storage.setItem("timeOffline", null);
}
