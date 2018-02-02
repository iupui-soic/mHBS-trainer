/*
* This fragment displays details about individual videos, resources etc..
*/

package edu.iupui.soic.biohealth.plhi.mhbs.fragments;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.os.Environment;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v4.content.ContextCompat;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.MediaController;
import android.widget.VideoView;

import java.io.File;

import edu.iupui.soic.biohealth.plhi.mhbs.R;
import edu.iupui.soic.biohealth.plhi.mhbs.documents.ResourceItemDownloader;

public class VideoDetailsFragment extends Fragment implements ResourceItemDownloader.DownloadResponse {
    VideoView videoView;
    File openVideo;
    String itemToDownload;
    View mView;

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
        // Inflate the xml for the fragment
        View rootView = inflater.inflate(R.layout.fragment_video_details, parent, false);
        // find and return the view
        videoView = (VideoView) rootView.findViewById(R.id.video_details_item);
        mView = rootView;
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

        Log.d("Test", "FILE NAME" + fileName);
        File parentDir = getContext().getExternalFilesDir(null);
        // file is in internal storage
        if (fileName.contains("app_mhbsDocs")) {
            // always points to internal memory (note, automatically concatenates app_ by default)
            File dir = getContext().getDir("mhbsDocs", Context.MODE_PRIVATE);
            File internalFile = new File(parentDir + "/" + dir);
            openVideo = new File(internalFile + "/" + itemToDownload + ".webm");
        } else {
            openVideo = new File(Environment.getExternalStorageDirectory().getPath() + fileName + "/" + itemToDownload + ".webm");
        }
        // note if we try to call video here, the onCreateView hasn't been created yet
    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        if (openVideo != null) {
            //Use a media controller so that you can scroll the video contents
            //and also to pause, start the video.
            MediaController mediaController = new MediaController(getActivity());
            mediaController.setAnchorView(videoView);
            //  videoView.setMediaController(mediaController);
            videoView.setVideoPath(openVideo.getPath());
            //  videoView.requestFocus();
              videoView.start();
        }


    }
    }