# mHBS - Mobile Helping Babies Breathe
The mobile Helping Babies Survive (mHBS) app is a digital health tool, developed by collaborators at Indiana University (School of Medicine and School of Informatics and Computing), which consists of 3 separate apps, serving functions related to data collection and reporting, access to educational resources, including other apps and data visualization. The mHBS apps are powered by the District Health Information Software ([DHIS 2](https://dhis2.org)) in the back-end for data storage and tracking of health workers.

# mHBS Training App
The mHBS Training App is a community health worker training app focused on training for neonatal resuscitation, through videos, guide and other kinds of training material. As part of the [mHBS suite of apps](https://www.iu.edu/~neoinfo/services/), after community health workers have been trained, then can test and their follow-up scores are tracked through the [mHBS tracker](https://github.com/iupui-soic/dhis2-android-trackercapture), a fork of the DHIS2 tracker app. 

## Tech Stack
* Framework 7
* Cordova

## Usage
### 1. Clone the Repository
```
git clone https://github.com/iupui-soic/mHBS_tracker
```
### 2. Add OS specific platforms

For Android:
Go to the downloaded repository folder and run:
```
cordova add platform android
```

### 3. Build the app
(plugins will be automatically built)
```
cordova build
```

### 4. Run or emulate the app
To run the app on android (... assuming that an Android device is connected)
```
cordova run android
```

OR to emulate on the Android emulator (... assuming that the Android SDK/Android Emulator has been installed)
```
cordova emulate android
```
