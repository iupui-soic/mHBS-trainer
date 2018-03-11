/*
* This fragment displays details about individual videos, resources etc..
*/

package edu.iupui.soic.biohealth.plhi.mhbs.fragments;

import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v4.content.ContextCompat;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.github.barteksc.pdfviewer.PDFView;
import com.github.barteksc.pdfviewer.scroll.DefaultScrollHandle;

import java.io.File;

import edu.iupui.soic.biohealth.plhi.mhbs.R;
import edu.iupui.soic.biohealth.plhi.mhbs.documents.ResourceItemDownloader;

public class PdfDetailsFragment extends Fragment implements ResourceItemDownloader.DownloadResponse {
    private String itemToDownload = "";
    private File openResource;

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (checkRunTimePermissions()) {
            itemToDownload = getArguments().getString("resourceId");
            String itemType = getArguments().getString("resourceKey");
            ResourceItemDownloader myDownloader = new ResourceItemDownloader(getContext(), itemToDownload, itemType, this);
            myDownloader.setupFiles();
            myDownloader.tryToDownload();
        }
    }


    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup parent, @Nullable Bundle savedInstanceState) {
        // Inflate the xml file for the fragment
        View rootView = inflater.inflate(R.layout.fragment_pdf_details, parent, false);

        PDFView pdfView = (PDFView) rootView.findViewById(R.id.pdfView);
        //TODO: error handling in ResourceDownloader if we couldnt download or find file and checks
        // if exists here as well
        if (openResource != null) {
            pdfView.fromFile(openResource).enableDoubletap(true).enableSwipe(true).scrollHandle(new DefaultScrollHandle(getContext())).swipeHorizontal(false).defaultPage(0).load();
        }
        return rootView;
    }

    private boolean checkRunTimePermissions() {
        if (ContextCompat.checkSelfPermission(getContext(), Manifest.permission.WRITE_EXTERNAL_STORAGE) == PackageManager.PERMISSION_DENIED) {
            requestPermissions(new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE}, 0);
        } else {
            return true;
        }
        return false;
    }


    @Override
    public void onDownloadFinish(String fileName) {
        //TODO: this is for external only, check where internals go
        openResource = new File("/storage/self/primary/" + fileName + "/" + itemToDownload + ".pdf");

    }
}