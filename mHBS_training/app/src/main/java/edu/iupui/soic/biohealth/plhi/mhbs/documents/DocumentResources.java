package edu.iupui.soic.biohealth.plhi.mhbs.documents;

import android.os.AsyncTask;
import android.util.Base64;
import android.util.Log;
import android.util.Xml;

import org.hisp.dhis.android.sdk.controllers.DhisController;
import org.xmlpull.v1.XmlPullParser;
import org.xmlpull.v1.XmlPullParserException;

import java.io.IOException;
import java.io.InputStream;
import java.net.Authenticator;
import java.net.HttpURLConnection;
import java.net.PasswordAuthentication;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import javax.net.ssl.HttpsURLConnection;

public class DocumentResources extends AsyncTask<String, String, List<DocumentResources.ResourceItem>> {
    // url for downloading documents from DHIS2 Web API
    private static final String URL = "https://mhbs.info/api/documents";
    // List of IDs associated with a resource parsed from /api/documents
    private List resourcesFound = new ArrayList<>();
    // holders for auth credentials to access API
    private static String password;
    private static String username;
    // To request parsing xml resources instead of individual resources
    private final String XMLRESOURCES = "XmlResources";
    // Holds video resources to populate list in
    public static final List<ResourceItem> VIDEO_RESOURCES = new ArrayList<>();
    public static final List<ResourceItem> PDF_RESOURCES = new ArrayList<>();

    /**
     * A resource item representing a piece of content.
     */
    public static class ResourceItem {
        public final String id;
        public final String title;
        public final String details;

        public ResourceItem(String id, String title, String details) {
            this.id = id;
            this.title = title;
            this.details = details;
        }

        @Override
        public String toString() {
            return title;
        }
    }

    // used to separate video and pdf items which were parsed from XML
    private static void addItem(List<ResourceItem> ResourceList, ResourceItem item) {
        ResourceList.add(item);
    }

    // initializer for async task to get resource items
    public static void getParsedResourceItems(String Activity) {
        new DocumentResources().execute(Activity);
    }

    @Override
    // Starts a new Async task to get XML in background
    protected List<ResourceItem> doInBackground(String... act) {
        // pass in the type of resource we want depending on which button user clicked
        String resourceToParse = act[0];
        /* strip char from the resource to parse
        * within XML there exists contentType which contains "pdf" or "video"
        * When clicking the Video button, the calling activity is passed "Videos"
        */
        String videoResource = removeLastChar(resourceToParse).toLowerCase();
        // we will use this to see if the caller is pdf resources
        Boolean isResources = resourceToParse.equals("Resources");

        // if we already have video items, we don't want to download them again (for the moment)
        if ((isResources && PDF_RESOURCES.isEmpty()) || VIDEO_RESOURCES.isEmpty()) {
            // Try to pull in the DHISAPI XML and initialize XmlPullParser
            XmlPullParser xPP = tryDownloadingXMLData(URL + ".xml");
            // Now, try to get a list of data pulled from the XML
            resourcesFound = tryParsingXmlData(xPP, XMLRESOURCES);
            if (resourcesFound != null) {
                // depending on activity, parse different resources
                List resource = tryParsingXmlData(xPP, resourceToParse);

                // TODO: improve/ cleanup
                int i = 0;
                while (i < resource.size()) {
                    if (resource.get(i).toString().contains(videoResource)) {
                        addItem(VIDEO_RESOURCES, new ResourceItem(resourcesFound.get(i + 2).toString(), resourcesFound.get(i + 1).toString(), null));
                    } else if (isResources && resource.get(i).toString().contains("pdf")) {
                        addItem(PDF_RESOURCES, new ResourceItem(resourcesFound.get(i + 1).toString(), resourcesFound.get(i).toString(), null));
                    }
                    i++;
                }
            }
        }
        return (isResources) ? PDF_RESOURCES : VIDEO_RESOURCES;
    }

    /*
     Tries to grab XML from DHIS2 Web API,  Initializes a pull parser, Sets the XML input stream,
     and returns the new parser
    */
    private XmlPullParser tryDownloadingXMLData(String url) {
        try {
            authenticateUser();
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
    private List tryParsingXmlData(XmlPullParser receivedData, String objective) {
        if (receivedData != null) {
            try {
                if (objective.equals(XMLRESOURCES)) {
                    // processes basic all document XML
                    return processReceivedData(receivedData);
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
    private List processResources(XmlPullParser parser) throws XmlPullParserException, IOException {
        List<String> entries = new ArrayList<>();
        for (int i = 0; i < resourcesFound.size(); i++) {
            if (i % 2 == 0) {
                // for each entry resource already found parse the XML data so we can get their types
                entries.add(tryParsingResources(parser, resourcesFound.get(i).toString()));
            }
        }
        return entries;
    }

    // Try parsing individual resource content from web
    private String tryParsingResources(XmlPullParser parser, String id) throws IOException, XmlPullParserException {
        String url = URL + "/" + id + ".xml";
        // first, make sure we can download the XML
        parser = tryDownloadingXMLData(url);
        // next try to parse the XML
        return tryParsingResourceType(parser);
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
    private List processReceivedData(XmlPullParser parser) throws XmlPullParserException, IOException {
        List<String> entries = new ArrayList<>();
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
                entries.add(id);
            }
            if (parser.getName().equals("displayName")) {
                title = parser.nextText();
                entries.add(title);
            }
        }
        return entries;
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

    @Override
    // results display here
    protected void onPostExecute(List<ResourceItem> items) {
        // TODO: process resource ITEMS
    }

    // helper function to trim activity string
    private static String removeLastChar(String str) {
        return str.substring(0, str.length() - 1);
    }


    // sets as default auth to compare with auth attached to URL conn
    private void authenticateUser() {
        username = DhisController.getInstance().getSession().getCredentials().getUsername();
        password = DhisController.getInstance().getSession().getCredentials().getPassword();
        Authenticator.setDefault(new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password.toCharArray());
            }
        });

    }

}