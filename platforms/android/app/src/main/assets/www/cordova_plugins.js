cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "com.moust.cordova.videoplayer.VideoPlayer",
    "file": "plugins/com.moust.cordova.videoplayer/www/videoplayer.js",
    "pluginId": "com.moust.cordova.videoplayer",
    "clobbers": [
      "VideoPlayer"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.3",
  "com.moust.cordova.videoplayer": "1.0.1"
};
// BOTTOM OF METADATA
});