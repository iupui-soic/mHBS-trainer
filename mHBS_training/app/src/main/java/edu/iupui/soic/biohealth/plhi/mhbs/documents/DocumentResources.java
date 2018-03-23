package edu.iupui.soic.biohealth.plhi.mhbs.documents;

import android.content.Context;
import android.graphics.Bitmap;
import android.media.MediaMetadataRetriever;
import android.net.ConnectivityManager;
import android.os.AsyncTask;
import android.os.Process;
import android.support.v7.app.AppCompatActivity;
import android.util.Base64;
import android.util.Log;
import android.util.Xml;

import org.hisp.dhis.android.sdk.controllers.DhisController;
import org.hisp.dhis.android.sdk.network.Credentials;
import org.xmlpull.v1.XmlPullParser;
import org.xmlpull.v1.XmlPullParserException;

import java.io.IOException;
import java.io.InputStream;
import java.net.Authenticator;
import java.net.HttpURLConnection;
import java.net.PasswordAuthentication;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.net.ssl.HttpsURLConnection;

import static android.os.Process.THREAD_PRIORITY_URGENT_DISPLAY;

public class DocumentResources extends AsyncTask<String, String, List<DocumentResources.ResourceItem>> {
    // url for downloading documents from DHIS2 Web API
    private final String URL = "https://mhbs.info/api/documents";
    // List of IDs associated with a resource parsed from /api/documents
    //TODO change to better solution from public static, Currently downloadlistfragment using
    public static List<String> resourcesFound = new ArrayList<>();
    // holders for auth credentials to access API
    private static String password;
    private static String username;
    // To request parsing xml resources instead of individual resources
    private final String XMLRESOURCES = "XmlResources";
    // Holds video resources to populate list in
    private static final List<ResourceItem> VIDEO_RESOURCES = new ArrayList<>();
    private static final List<ResourceItem> PDF_RESOURCES = new ArrayList<>();
    private AsyncResponse delegate = null;
    public static boolean CURRENTLY_DOWNLOADING = false;
    //TODO: Uncomment for thumbnails
    //private List<Bitmap> videoFrame;
    //private static Frame myFrame;
    private Boolean isResources;

    // default constructor
    public DocumentResources(){}

    /**
     * A resource item representing a piece of content.
     */
    public static class ResourceItem {
        private String id;
        private String title;
        private String contentType;
        private Bitmap bitmap;
        private boolean isDownloaded;

        private ResourceItem(String id, String title, String contentType) {
            this.id = id;
            this.title = title;
            this.contentType = contentType;
        }

        // for use in videoDetails fragment
        public void setBitmap(Bitmap bitmap) {
            this.bitmap = bitmap;
        }

        public void setDownloaded(boolean isDownloaded){
            this.isDownloaded = isDownloaded;
        }

        public String getId(){return id;}
        public String getTitle(){return title;}
        public String getContentType(){return contentType;}
        public boolean getDownloadStatus(){return isDownloaded;}

        @Override
        public String toString() {
            return "Resource item details: " + id + title + contentType;
        }
    }

    @Override
    // Starts a new Async task to get XML in background
    protected List<ResourceItem> doInBackground(String... act) {
        Process.setThreadPriority(THREAD_PRIORITY_URGENT_DISPLAY);
        // flag for disabling back buttons while content is downloading.
        CURRENTLY_DOWNLOADING = true;
        // TODO: Uncomment for thumbnails
        //videoFrame = new ArrayList<>();

        // pass in the type of resource we want depending on which button user clicked
        String resourceToParse = act[0];
        // we will use this to see if the caller is pdf resources
        isResources = resourceToParse.equals("Resources");
        // if we already have video items, we don't want to download them again (for the moment)
        if (DocumentResources.VIDEO_RESOURCES.isEmpty() || DocumentResources.PDF_RESOURCES.isEmpty()) {
            authenticateUser();
            // Try to pull in the DHISAPI XML and initialize XmlPullParser
            XmlPullParser xPP = tryDownloadingXMLData(URL + ".xml");
            // Now, try to get a list of data pulled from the XML
            tryParsingXmlData(xPP, XMLRESOURCES);
            if (resourcesFound != null) {
                separateContent(xPP, resourceToParse);
            }
        }
        // return a list of either pdf or video resources
        return (isResources) ? PDF_RESOURCES : VIDEO_RESOURCES;
    }

    // used to separate video and pdf items which were parsed from XML
    private static void addItem(String itemType, ResourceItem item) {
        if (itemType.equals("Video")) {
            VIDEO_RESOURCES.add(item);
        } else {
            PDF_RESOURCES.add(item);
        }
    }

    private void separateContent(XmlPullParser xPP, String resourceToParse) {
        // depending on activity, parse different resources
        List<String> resource = tryParsingXmlData(xPP, resourceToParse);
        String contentType;
        String id;
        String title;
        // each i in resource array maps to a set of ids and titles (2(i), 2(i)+1) in resourcesFound
        for (int i = 0; i < resource.size(); i++) {
            contentType = resource.get(i);
            id = resourcesFound.get(2 * i);
            title = resourcesFound.get(2 * i + 1);
            // if resource element contains a video
            if (contentType.contains("video")) {
                addItem("Video", new ResourceItem(id, title, contentType));
                // check if the resource contains a pdf
            } else if (resource.get(i).contains("pdf")) {
                addItem("PDF", new ResourceItem(id, title, contentType));
            }
        }
    }

    /*
     Tries to grab XML from DHIS2 Web API,  Initializes a pull parser, Sets the XML input stream,
     and returns the new parser
    */
    private XmlPullParser tryDownloadingXMLData(String url) {
        try {
            InputStream in = downloadUrl(url);
            // get a new pull parser and create new pull parser
            XmlPullParser parser = Xml.newPullParser();
            parser.setFeature(XmlPullParser.FEATURE_PROCESS_NAMESPACES, false);
            // set input stream
            parser.setInput(in, null);
            parser.nextTag();
            // return pull parser
            return parser;
        } catch (IOException | XmlPullParserException e) {
            Log.e("XmlPullParserException", e.getMessage());
        }
        return null;
    }


    // Attempt parsing data
    private List<String> tryParsingXmlData(XmlPullParser receivedData, String objective) {
        if (receivedData != null) {
            try {
                if (objective.equals(XMLRESOURCES)) {
                    // processes basic all document XML
                     processReceivedData(receivedData);
                } else {
                    // processes individual resources
                    return processResources(receivedData);
                }
            } catch (XmlPullParserException | IOException e) {
                Log.e("ParsingXmlDataException", e.getMessage());
            }
        }
        return null;
    }

    // Process individual resources (Videos, Pdf, etc...)
    private List<String> processResources(XmlPullParser parser) throws XmlPullParserException, IOException {
        List<String> entries = new ArrayList<>();
        for (int i = 0; i < resourcesFound.size(); i++) {
            if (i % 2 == 0) {
                // for each entry resource already found parse the XML data so we can get their types
                entries.add(tryParsingResources(parser, resourcesFound.get(i)));
            }
        }
        return entries;
    }

    // Try parsing individual resource content from web
    private String tryParsingResources(XmlPullParser parser, String id) throws IOException, XmlPullParserException {
        String url = URL + "/" + id + ".xml";
        // first, make sure we can download the XML
        parser = tryDownloadingXMLData(url);

        String type = tryParsingResourceType(parser);

        //index for videoFrame, some bit maps will be null, we still want to add these at the correct index mapping to video_resources
        //TODO: Uncomment for video thumbnails, currently slow. I believe if this (and the class in general)
        // is improved, we can ge the time down.
        /* int bitMapIndex = -1;

        // if it's a video, get the thumbnails
        if (type.equals("video/webm")) {
            Log.d("Test", "true");
            try {
                bitMapIndex++;
                videoFrame.add(bitMapIndex, myFrame.retrieveFrameFromVideo(URL + "/" + id));
            } catch (java.lang.Throwable e) {
                Log.d("Error", e.getMessage());
            }
        }
*/
        // return type of content
        return type;
    }

    // parses contentTypes from document resources
    private String tryParsingResourceType(XmlPullParser parser) throws IOException, XmlPullParserException {
        String contentType = "";
        parser.require(XmlPullParser.START_TAG, null, "document");
        // while we did not reach the closing tag to START_TAG
        while (parser.next() != XmlPullParser.END_DOCUMENT) {
            if (parser.getEventType() != XmlPullParser.START_TAG) {
                continue;
            }
            // check the name of the current tag
            String name = parser.getName();
            // if contentType, start parsing
            if (name.equals("contentType")) {
                contentType = readContentType(parser);
            } else {
                // otherwise skip
                skip(parser);
            }
        }
        return contentType;
    }

    // checks that we are between contentType tags and reads the content type
    private String readContentType(XmlPullParser parser) throws IOException, XmlPullParserException {
        parser.require(XmlPullParser.START_TAG, null, "contentType");
        String contentType = readType(parser);
        parser.require(XmlPullParser.END_TAG, null, "contentType");
        return contentType;
    }

    // For the tags contentType, extracts their types.
    private String readType(XmlPullParser parser) throws IOException, XmlPullParserException {
        String contentType = "";
        if (parser.next() == XmlPullParser.TEXT) {
            contentType = parser.getText();
            parser.nextTag();
        }
        // return only the requested content type
        return contentType;
    }

    // processes list of all document resources, not individual document resources
    private void processReceivedData(XmlPullParser parser) throws XmlPullParserException, IOException {
        String id = "";
        String title = "";
        // defines the first outer XML tag
        parser.require(XmlPullParser.START_TAG, null, "metadata");
        // while we did not reach the end of document
        while (parser.next() != XmlPullParser.END_DOCUMENT) {
            if (parser.getEventType() != XmlPullParser.START_TAG) {
                continue;
            }
            if (parser.getName().equals("document")) {
                id = readId(parser);
                resourcesFound.add(id);
            }
            if (parser.getName().equals("displayName")) {
                title = parser.nextText();
                resourcesFound.add(title);
            }
        }
    }

    // Pull ID's from document API
    private String readId(XmlPullParser parser) throws IOException, XmlPullParserException {
        String id = "";
        parser.require(XmlPullParser.START_TAG, null, "document");
        String tag = parser.getName();
        if (tag.equals("document")) {
            id = parser.getAttributeValue(null, "id");
            parser.nextTag();
        }
        return id;
    }

    // opens URL stream
    private static InputStream downloadUrl(String urlString) throws IOException {
        URL url = new URL(urlString);
        HttpURLConnection conn = (HttpsURLConnection) url.openConnection();
        // make sure our authentication matches the default authentication in a format that auth understands
        String authorization = username + ":" + password;
        String encodedAuth = "Basic " + Base64.encode(authorization.getBytes(), 0);
        // TODO: Uncomment for thumbnails
        //myFrame = new Frame(encodedAuth);
        // attach the auth request to the connection
        conn.setRequestProperty("Authorization", encodedAuth);
        int responseCode = conn.getResponseCode();
        // proceed if authorized
        if (responseCode == 200) {
            InputStream stream = conn.getInputStream();
            return stream;
        }
        return null;
    }

    // skip undesired tags
    private void skip(XmlPullParser parser) throws XmlPullParserException, IOException {
        if (parser.getEventType() != XmlPullParser.START_TAG) {
            throw new IllegalStateException();
        }
        int depth = 1;
        while (depth != 0) {
            switch (parser.next()) {
                case XmlPullParser.END_TAG:
                    depth--;
                    break;
                case XmlPullParser.START_TAG:
                    depth++;
                    break;
            }
        }
    }


    public interface AsyncResponse {
        void processFinish(List<ResourceItem> output);
        Credentials getCredentials();
    }

    // our delegate to send results
    public DocumentResources(AsyncResponse delegate) {
        this.delegate = delegate;
    }


    @Override
    // results display here
    protected void onPostExecute(List<ResourceItem> items) {
        // reset flags
        CURRENTLY_DOWNLOADING = false;
        isResources = false;

      /* TODO: uncomment for set video thumbnails
        for (int j = 0; j < videoFrame.size(); j++) {
            VIDEO_RESOURCES.get(j).setBitmap(videoFrame.get(j));

        }*/
        delegate.processFinish(items);

    }

    // sets as default auth to compare with auth attached to URL conn
    private void authenticateUser() {
        if (DhisController.isUserLoggedIn()) {
            username = DhisController.getInstance().getSession().getCredentials().getUsername();
            password = DhisController.getInstance().getSession().getCredentials().getPassword();
        } else {
            Credentials credentials = delegate.getCredentials();
            username = credentials.getUsername();
            password = credentials.getPassword();
        }
        Authenticator.setDefault(new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password.toCharArray());
            }
        });


    }

    public int getResourcesLength(){
        return this.resourcesFound.size();
    }


    // Frames which download video thumbnails belonging to resource items
    public static class Frame {
        // interface to grab video thumbnails
        MediaMetadataRetriever frameRetriever;
        // http headers
        Map<String, String> headers;

        public Frame(String encodedAuth) {
            // retriever for thumbnails
            frameRetriever = new MediaMetadataRetriever();
            // send HTTP headers
            headers = new HashMap<>();
            headers.put("Authorization", encodedAuth);
        }

        // gets frame at beginning of video content
        private Bitmap retrieveFrameFromVideo(String videoPath) throws Throwable {
            String videoFrame = videoPath + "/data";
            Bitmap bitmap = null;
            try {
                frameRetriever.setDataSource(videoFrame, headers);
                bitmap = frameRetriever.getFrameAtTime(1, MediaMetadataRetriever.OPTION_CLOSEST);
            } catch (Exception e) {
                e.printStackTrace();
                throw new Throwable("Exception in retrieveFrameFromVideo(String videoPath)" + e.getMessage());
            } finally {
                if (frameRetriever != null) {
                    frameRetriever.release();
                }
            }
            return bitmap;
        }
    }

}


