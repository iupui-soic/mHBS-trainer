/*
* This fragment displays details about individual videos, resources etc..
*/

package com.example.siva0.mhbs_training.fragments;

import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.MediaController;
import android.widget.VideoView;

import com.example.siva0.mhbs_training.R;
import com.example.siva0.mhbs_training.activities.VideosActivity;

public class ItemDetailsFragment extends Fragment {
    // raw URL TODO: change to database data pulled in
    String VideoURL = "http://www.androidbegin.com/tutorial/AndroidCommercial.3gp";
    //    Stringifies value for download stream
    String fileName = "emergency";
    VideoView videoView;

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup parent, @Nullable Bundle savedInstanceState) {
        // Inflate the xml file for the fragment
        View rootView = inflater.inflate(R.layout.fragment_item_details, parent, false);

        // TODO: If parent == video (){inflate video view} if parent == pdf{..inflate pdf view}
        // find the video view and attach to rootview
        videoView = (VideoView)rootView.findViewById(R.id.video_details_item);
        return rootView;
    }


    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {

        // Set values for video view
        String filePlace = "android.resource://" + VideosActivity.PACKAGE_NAME + "/raw/" + fileName;

        videoView.setVideoURI(Uri.parse(filePlace));
        videoView.setMediaController(new MediaController(getActivity()));
        videoView.start();
        // TODO: video playing can go here, it's just in the above for testing
    }

}