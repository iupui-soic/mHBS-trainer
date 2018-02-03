package edu.iupui.soic.biohealth.plhi.mhbs.documents;

import android.content.ClipData;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.net.ssl.HttpsURLConnection;

public class DocumentResources extends AsyncTask<String, String, List<DocumentResources.ResourceItem>> {
    // url for downloading documents from DHIS2 Web API
    private static final String URL = "https://mhbs.info/api/documents";
    // contain list of resource Items
    public static final List<ResourceItem> ITEMS = new ArrayList<>();
    // contain a list of Ids of all resources
    private List resourcesFound = new ArrayList<>();
    // holders for auth credentials for getting API data
    private static String password;
    private static String username;
    // Keys to parse various types of resources
    private static final String XMLRESOURCES = "XMLResources";
    public static final List<ResourceItem> VIDEO_MAP = new ArrayList<>();
    public static final List<ResourceItem> PDF_MAP = new ArrayList<>();

    /**
     * A map of sample (resource) items, by ID.
     */
    private static final int COUNT = 5;

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

    private static void addItem(List<ResourceItem> ItemMap, ResourceItem item) {
        ItemMap.add(item);
      //  ItemMap.put(item.id, item);
    }

    private static String makeDetails(int position) {
        StringBuilder builder = new StringBuilder();
        builder.append("Details about Item: ").append(position);
        for (int i = 0; i < position; i++) {
            builder.append("\nMore details information here.");
        }
        return builder.toString();
    }

    // initializes async task to get resource items
    public static void getParsedResourceItems(String Activity) {
        new DocumentResources().execute(Activity);
    }

    @Override
    // Starts a new Async task to get XML in background
    protected List<ResourceItem> doInBackground(String... act) {

        String activity = act[0];
        /* remove last character from the calling type
        * within XML there exists contentType which state pdf or video
        * we will use this to check if the resource contains the activity which is calling
        */
        String videoResource = removeLastChar(activity).toLowerCase();
        // we will use this to see if the caller is pdf resources
        Boolean isResources = activity.equals("Resources");

        // if we already have video items, we don't want to download them again (for the moment)
        if ((isResources && PDF_MAP.isEmpty()) || VIDEO_MAP.isEmpty()) {
            // Try to pull in the DHISAPI XML and initialize XmlPullParser
            XmlPullParser xPP = tryDownloadingXMLData(URL + ".xml");
            // Now, try to get a list of data pulled from the XML
            resourcesFound = tryParsingXmlData(xPP, XMLRESOURCES);
            if (resourcesFound != null) {
                // depending on activity, parse different resources
                List resource = tryParsingXmlData(xPP, activity);
                // TODO: reduce this
                // Look through whole list of resources and parse to seperate content maps
                for (int i = 0; i < resource.size(); i++) {
                    if (resource.get(i).toString().contains(videoResource)) {
                        addItem(VIDEO_MAP, new ResourceItem(resource.get(i).toString(), resourcesFound.get(i).toString(), null));
                    } else if (isResources && resource.get(i).toString().contains("pdf")) {
                        addItem(PDF_MAP, new ResourceItem(resource.get(i).toString(), resourcesFound.get(i).toString(), null));
                    }
                }
            }
        }
        return (isResources) ? PDF_MAP : VIDEO_MAP;
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
            XmlPullParser xPP = Xml.newPullParser();
            xPP.setFeature(XmlPullParser.FEATURE_PROCESS_NAMESPACES, false);
            // set input stream
            xPP.setInput(in, null);
            // return pull parser
            return xPP;
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
            // for each entry resource already found parse the XML data so we can get their types
            entries.add(tryParsingResources(parser, resourcesFound.get(i).toString()));
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
        parser.nextTag();
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
        // start parser
        parser.nextTag();
        // defines the first outer XML tag
        parser.require(XmlPullParser.START_TAG, null, "metadata");
        // while we did not reach the end of document
        while (parser.next() != XmlPullParser.END_DOCUMENT) {
            if (parser.getEventType() != XmlPullParser.START_TAG) {
                continue;
            }
            // check the name of the current tag
            String name = parser.getName();
            // if documents, start parsing
            if (name.equals("documents")) {
                entries = readEntry(parser);
            } else {
                // otherwise skip
                skip(parser);
            }
        }
        return entries;
    }

    // Parses the contents of an entry. If it encounters a document, hands them off
    // to their respective "read" methods for processing. Otherwise, skips the tag.
    private List<String> readEntry(XmlPullParser parser) throws XmlPullParserException, IOException {
        List<String> entries = new ArrayList<>();
        // start off at documents
        parser.require(XmlPullParser.START_TAG, null, "documents");
        // while the next tag is not the end of document
        while (parser.next() != XmlPullParser.END_DOCUMENT) {
            // continue if the event is a text or end tag
            if (parser.getEventType() != XmlPullParser.START_TAG) {
                continue;
            }
            // check the opening tag, is it a document?
            String name = parser.getName();
            if (name.equals("document")) {
                // read the id
                entries.add(readId(parser));
            } else {
                // if it's not a document, skip it
                skip(parser);
            }
        }
        // return id
        return entries;
    }

    // Pull ID's from document API
    private String readId(XmlPullParser parser) throws IOException, XmlPullParserException {
        String id = "";
        parser.require(XmlPullParser.START_TAG, null, "document");
        String tag = parser.getName();
        if (tag.equals("document")) {
            id = parser.getAttributeValue(null, "id");
            // skip displayName attribute
            skip(parser);
        }
        parser.require(XmlPullParser.END_TAG, null, "document");
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