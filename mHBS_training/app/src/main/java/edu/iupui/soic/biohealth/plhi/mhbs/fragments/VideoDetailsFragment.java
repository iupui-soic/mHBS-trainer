/*
* This fragment displays details about individual videos, resources etc..
*/

package edu.iupui.soic.biohealth.plhi.mhbs.fragments;

import android.content.Context;
import android.os.Bundle;
import android.os.Environment;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.VideoView;

import java.io.File;

import edu.iupui.soic.biohealth.plhi.mhbs.R;


public class VideoDetailsFragment extends Fragment {
    private String videoPath;
    private String itemToDownload;
    private File openVideo;

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            videoPath = getArguments().getString("resourceDir");
            itemToDownload = getArguments().getString("itemToDownload");
        }

    }

    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup parent, @Nullable Bundle savedInstanceState) {
        // Inflate the xml for the fragment
        View rootView = inflater.inflate(R.layout.fragment_video_details, parent, false);
        onDownloadFinish();
        return rootView;
    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        VideoView videoView = (VideoView) view.findViewById(R.id.video_details_item);

        if (videoView != null && openVideo != null) {
            try {
                //TODO: Attach MediaController
                videoView.setVideoPath(openVideo.getPath());
                videoView.requestFocus();
                videoView.start();

            } catch (Exception e) {
                //TODO: Handle
                Log.d("Error", e.getMessage());
            }
        } else {
            // we could not start the video
            //TODO:Handle
        }
    }

    public void onDownloadFinish() {
        // show video download bar
        File parentDir = getContext().getExternalFilesDir(null);
        // file is in internal storage
        if (videoPath.contains("app_mhbsDocs")) {
            // always points to internal memory (note, automatically concatenates app_ by default)
            File dir = getContext().getDir("mhbsDocs", Context.MODE_PRIVATE);
            File internalFile = new File(parentDir + "/" + dir);
            this.openVideo = new File(internalFile + "/" + itemToDownload + ".webm");
        } else {
            File myFile = new File(Environment.getExternalStorageDirectory().getPath() + videoPath + "/" + itemToDownload + ".webm");
            openVideo = myFile;
        }
        // note if we try to call video here, the onCreateView hasn't been created yet

    }

    @Override
    public void onResume() {
        super.onResume();
    }

    @Override
    public void onPause() {
        super.onPause();
    }

    @Override
    public void onDetach() {
        super.onDetach();
    }

}

