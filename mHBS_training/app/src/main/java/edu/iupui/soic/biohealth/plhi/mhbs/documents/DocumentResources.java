package edu.iupui.soic.biohealth.plhi.mhbs.documents;

import android.os.AsyncTask;
import android.util.Base64;
import android.util.Log;
import android.util.Xml;

import org.hisp.dhis.android.sdk.controllers.DhisController;
import org.hisp.dhis.android.sdk.controllers.metadata.MetaDataController;
import org.xmlpull.v1.XmlPullParser;
import org.xmlpull.v1.XmlPullParserException;
import javax.net.ssl.HttpsURLConnection;

import java.io.BufferedInputStream;
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

public class DocumentResources extends AsyncTask<Object, String, List> {
    // TODO: Replace this sample XML with actual URL
    // url for downloading documents from DHIS2 Web API
   /// / private static final String URL = "https://api.androidhive.info/pizza/?format=xml";
    private static final String URL = "https://mhbs.info/api/documents.xml";
    // contain list of resources
    public static final List<ResourceItem> ITEMS = new ArrayList<ResourceItem>();
    private static String password;
    private static String username;

    /**
     * A map of sample (resource) items, by ID.
     */
    public static final Map<String, ResourceItem> ITEM_MAP = new HashMap<String, ResourceItem>();
    private static final int COUNT = 25;

    static {
        // Add some sample items.
        for (int i = 1; i <= COUNT; i++) {
            addItem(createResourceItem(i));
        }
    }

    private static void addItem(ResourceItem item) {
        ITEMS.add(item);
        ITEM_MAP.put(item.id, item);
    }

    private static ResourceItem createResourceItem(int position) {

        return new ResourceItem(String.valueOf(position), "Item " + position, makeDetails(position));
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
    public void getParsedResourceItems(){
        execute();
    }

    @Override
    // Starts a new Async task to get XML in background
    protected List doInBackground(Object... voids) {
        // for accessing DHIS API resources
        // Try to pull in the URL and initialize XmlPullParser
        XmlPullParser xPP = tryDownloadingXMLData();
        // Now, try to get a list of data pulled from the XML
        List resourcesFound = tryParsingXmlData(xPP);
        // returns to onPostExecute callback
        return resourcesFound;
    }

    /*
     Tries to grab XML from DHIS2 Web API,  Initializes a pull parser, Sets the XML input stream,
     and returns the new parser
    */
    private XmlPullParser tryDownloadingXMLData() {
        try{
            authenticateUser();
            InputStream in = downloadUrl(URL);

            // get a new pull parser and create new pull parser
            XmlPullParser xPP = Xml.newPullParser();
            xPP.setFeature(XmlPullParser.FEATURE_PROCESS_NAMESPACES, false);
            // set input stream
            xPP.setInput(in,null);
            // return pull parser
            return xPP;
        }catch(IOException | XmlPullParserException e){
            Log.e("XmlPullParserException", e.getMessage());
        }
        return null;
    }

    // Begin parsing data
    private List tryParsingXmlData(XmlPullParser receivedData){
    //    List myList = new ArrayList();
        if(receivedData!=null) {
            try {
                return processReceivedData(receivedData);
            } catch (XmlPullParserException | IOException e) {
                Log.e("ParsingXmlDataException",e.getMessage());
            }
        }
        return null;
    }


    private List processReceivedData(XmlPullParser parser) throws XmlPullParserException, IOException {
        // TODO: currently this parsing mechanism isn't tailored to our XML, will work on that next
        // hold resources
        List entries = new ArrayList();
        // defines the first outer XML tag
        //parser.require(XmlPullParser.START_TAG, null, "menu");
        parser.nextTag();
        parser.require(XmlPullParser.START_TAG, null, "metadata");
        // while we did not reach the closing tag to START_TAG
        while (parser.next() != XmlPullParser.END_TAG) {
            //
            if (parser.getEventType() != XmlPullParser.START_TAG) {
                continue;
            }
            String name = parser.getName();
            // Starts by looking for the entry tag
            if (name.equals("documents")) {
                entries.add(readEntry(parser));
            } else {
                skip(parser);
            }
        }
        return entries;
    }

    // Parses the contents of an entry. If it encounters a title, summary, or link tag, hands them off
    // to their respective "read" methods for processing. Otherwise, skips the tag.
    private String readEntry(XmlPullParser parser) throws XmlPullParserException, IOException {
        parser.require(XmlPullParser.START_TAG, null, "documents");
        String id = null;
        while (parser.next() != XmlPullParser.END_TAG) {
            if (parser.getEventType() != XmlPullParser.START_TAG) {
                continue;
            }
            String name = parser.getName();
            if (name.equals("document")) {
                id = readId(parser);
            } else {
                skip(parser);
            }
        }
        return id;
    }

    public static InputStream downloadUrl(String urlString) throws IOException {
        URL url = new URL(urlString);
        HttpURLConnection conn = (HttpsURLConnection) url.openConnection();
        // make sure our authentication matches the default authentication in a format that auth understands
        String authorization = username + ":" + password;
        String encodedAuth="Basic "+Base64.encode(authorization.getBytes(),0);
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

    // Pull ID's from document API
    private String readId(XmlPullParser parser) throws IOException, XmlPullParserException {
        String id = "";
     //   parser.require(XmlPullParser.START_TAG, null, "document");
        id = parser.getAttributeValue(null,"id");

      //  id = readText(parser);
        Log.d("try Title", "Try parsing error " + id);
   //     parser.require(XmlPullParser.END_TAG, null, "document");
        return id;
    }

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

    // whenever something is updated
    // (process data here)
    @Override
    protected void onProgressUpdate(String... values){
        // this is on main thread do anything
        if(values.length==0){
            Log.d("Test", "No Data Download");
        }
        if(values.length>0){
            String appId = values[0];
            // Log it
            Log.d("Test", "AppID: " + appId);
        }
        super.onProgressUpdate(values);
    }


    // For the tags title and summary, extracts their text values.
    private String readText(XmlPullParser parser) throws IOException, XmlPullParserException {
        String result = "";
        if (parser.next() == XmlPullParser.TEXT) {
            result = parser.getText();
            Log.d("Test", "readText " +  result);
            parser.nextTag();
        }
        return result;
    }

    @Override
    // results display here
    protected void onPostExecute(List result) {
        for (int i=0; i<result.size(); i++) {
            Log.d("Test", result.get(i).toString());
        }
    }

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