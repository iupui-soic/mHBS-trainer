/*
* This fragment displays details about individual videos, resources etc..
*/

package edu.iupui.soic.biohealth.plhi.mhbs.fragments;

import android.Manifest;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
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
        return rootView;
    }


    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        mView = view;
      /*  videoView = (VideoView) view.findViewById(R.id.video_details_item);
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
        */
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
        // file is in internal storage
        String path = getActivity().getFilesDir().getAbsolutePath();
      //  File newFile = new File(path + )
        Log.d("Test", path);
        if (fileName.contains("app_mhbsDocs")) {
            //TODO: make this more eloquent...
            openVideo = new File("/storage/emulated/0/Android/data/edu.iupui.soic.biohealth.plhi.mhbs/files/data/user/0/edu.iupui.soic.biohealth.plhi.mhbs/app_mhbsDocs/mhbsDocs/" + itemToDownload + ".webm");
        } else {
            // file in external storage
            openVideo = new File("/storage/emulated/0/" + fileName + "/" + itemToDownload + ".webm");
        }
        videoView = (VideoView) mView.findViewById(R.id.video_details_item);
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

    // /storage/emulated/legacy/Android/data/edu.iupui.soic.biohealth.plhi.mhbs/files/app_mhbsDocs/mhbsDocs/nJpFTm8PNb5-1.webm


}