/*
* This fragment displays details about individual videos, resources etc..
*/

package edu.iupui.soic.biohealth.plhi.mhbs.fragments;

import android.Manifest;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
import android.os.ParcelFileDescriptor;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v4.content.ContextCompat;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebView;
import android.widget.VideoView;

import java.io.File;

import edu.iupui.soic.biohealth.plhi.mhbs.R;
import edu.iupui.soic.biohealth.plhi.mhbs.documents.ResourceItemDownloader;

public class ItemDetailsFragment extends Fragment {

    // raw URL TODO: change to database data pulled in
    String pdfURL = "http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf";
    VideoView videoView;
    private static String ACTIVITY = "";

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

            // Load the dummy title specified by the fragment
            // arguments. In a real-world scenario, use a Loader
            // to load title from a title provider.

        }

    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup parent, @Nullable Bundle savedInstanceState) {
        // Inflate the xml file for the fragment
        //View rootView = inflater.inflate(R.layout.fragment_item_details, parent, true);
        View rootView = inflater.inflate(R.layout.fragment_item_details, parent, false);
        // if we called from the Videos Activity Context
        if (getContext().getClass().toString().contains(ACTIVITY)) {
            // find the video view and attach to rootview
            videoView = (VideoView) rootView.findViewById(R.id.video_details_item);
        }
        // if we called from the ResourceActivity (PDF) Context
        else if (getContext().getClass().toString().contains(ACTIVITY)) {
          // TODO: FOR HANDLING DOWNLOAD PERMISSIONS
            /*
            if (ContextCompat.checkSelfPermission(this.getActivity(),
                    Manifest.permission.WRITE_EXTERNAL_STORAGE)
                    != PackageManager.PERMISSION_GRANTED) {

            }
            */

            // TODO: replace with PDF renderer, the following is  a placeholder
            WebView webView = (WebView) rootView.findViewById(R.id.webview_details_item);
            webView.getSettings().setJavaScriptEnabled(true);
            String url = "http://docs.google.com/gview?embedded=true&url=" + pdfURL;
            webView.loadUrl(url);

        }
        return rootView;
    }


    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {

        // TODO: video playing can go here, it's just in the above for testing
    }

}