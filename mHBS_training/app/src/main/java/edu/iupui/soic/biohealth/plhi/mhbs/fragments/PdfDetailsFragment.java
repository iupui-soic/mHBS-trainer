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

public class PdfDetailsFragment extends Fragment {

    // TODO: this is for testing purposes
    String pdfURL = "http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf";

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
        View rootView = inflater.inflate(R.layout.fragment_pdf_details, parent, false);
        //TODO: use https://developer.android.com/reference/android/graphics/pdf/PdfRenderer.html to create a pdf viewer
        return rootView;
    }


    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {

        // TODO: video playing can go here, it's just in the above for testing
    }

}