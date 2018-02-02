package edu.iupui.soic.biohealth.plhi.mhbs.documents;

import android.app.DownloadManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.net.Uri;
import android.util.Base64;
import android.util.Log;

import org.hisp.dhis.android.sdk.controllers.DhisController;

import java.net.Authenticator;
import java.net.PasswordAuthentication;
import java.util.ArrayList;


public class ResourceItemDownloader {
    private String username;
    private String password;
    private Context pContext;
    // for download manager enqueue request
    private ArrayList<Long> list = new ArrayList<>();
    private DownloadCompleteReceiver receiver;
    private String ACTION_ALREADY_DOWNLOADED = "ALREADY_DOWNLOADED";
    private String downloadId = "";
    private String itemType = "";
    private ResourceItemDownloaderUtil rdUtil;
    private ResourceItemDownloader.DownloadResponse delegate = null;

    public ResourceItemDownloader(Context pContext, String itemId, String itemType, DownloadResponse delegate) {
        this.pContext = pContext;
        this.delegate = delegate;
        this.itemType = itemType;
        downloadId = itemId;
        receiver = new DownloadCompleteReceiver();
    }
    // create necessary directories to divert downloads to
    public void setupFiles() {
        Log.d("Test", "settingUpFiles");
        rdUtil = new ResourceItemDownloaderUtil(pContext, itemType);
        rdUtil.tryCreateDirectory();
    }

    // register local broadcast receiver when download finishes or item is found on device
    public void tryToDownload() {
        Log.d("Test", "try to download");
        registerReceiver();
        // if item is already downloaded to device, leave
        //TODO: just a note this will never  run the first time an item is clicked
        if (rdUtil.checkDirForDownloads(downloadId)) {
            Log.d("Test", "exists");
            Intent intent = new Intent(ACTION_ALREADY_DOWNLOADED);
            receiver.onReceive(pContext, intent);
        } else {
            // item not on device, try to download
            downloadURL();
        }
    }

    // for downloading content
    private void downloadURL() {
        // we need to auth the user to access web api materials
        authenticateUser();
       //  authorization we pass to download manager
        String muriURL = "https://mhbs.info/api/documents/";
        String urlString = muriURL + downloadId + "/data";
        // parse url, set download to path, add authorization and enqueue the request
        DownloadManager.Request request = new DownloadManager.Request(Uri.parse(urlString));
        String path = rdUtil.getResourceDir().getAbsolutePath();
        // authentication
        String authorization = username + ":" + password;
        byte[] data = authorization.getBytes();
        String base64 = Base64.encodeToString(data, Base64.DEFAULT);
        request.addRequestHeader("Authorization", "Basic " + base64);
        // hold file item
        String fileItem;
        if(itemType.equals("Videos")){
            fileItem = downloadId + ".webm";
        }else {
            fileItem = downloadId + ".pdf";
        }
        if(path.contains("app_mhbsDocs")){
            request.setDestinationInExternalFilesDir(pContext,path,fileItem);
        }else{
            request.setDestinationInExternalPublicDir(path, fileItem);
        }

        DownloadManager manager = (DownloadManager) pContext.getSystemService(Context.DOWNLOAD_SERVICE);

        try {
            long refId = manager.enqueue(request);
            // keep track of the job which sends to DownloadBroadcastReceiver on complete
            list.add(refId);
        } catch (java.lang.NullPointerException e) {
            Log.d("Error", e.getMessage());
        }

    }

    private void registerReceiver() {
        // create and register the download receiver to receive results
        IntentFilter downloadFilter = new IntentFilter();
        downloadFilter.addAction(DownloadManager.ACTION_DOWNLOAD_COMPLETE);
        downloadFilter.addAction(this.ACTION_ALREADY_DOWNLOADED);
        pContext.registerReceiver(receiver, new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE));

    }


    // handles receipt of download tasks
    public class DownloadCompleteReceiver extends BroadcastReceiver {

        @Override
        public void onReceive(Context context, Intent intent) {
            // get the refid from the download manager
            long referenceId = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1);

            // remove it from our list
            list.remove(referenceId);

            pContext.unregisterReceiver(this);
            if (list.isEmpty()) {
                delegate.onDownloadFinish(rdUtil.getResourceDir().toString());
            } else {
                //TODO: item not found or downloaded
            }
        }
    }

    public interface DownloadResponse {
        void onDownloadFinish(String fileName);
    }


    // sets as default auth to compare with auth attached to URL conn
    private void authenticateUser() {
        if(DhisController.isUserLoggedIn()) {
            username = DhisController.getInstance().getSession().getCredentials().getUsername();
            password = DhisController.getInstance().getSession().getCredentials().getPassword();
        }
        else{
            SharedPreferences sharedPref = pContext.getSharedPreferences("credentials", Context.MODE_PRIVATE);
            username = sharedPref.getString("username", "NULL");
            password = sharedPref.getString("password", "NULL");
        }
            Authenticator.setDefault(new Authenticator() {
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(username, password.toCharArray());
                }
            });
    }
}
