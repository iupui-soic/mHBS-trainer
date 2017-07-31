package com.example.siva0.mhbs_training.activities;

import android.app.ProgressDialog;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.FragmentManager;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.MediaController;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.VideoView;

import com.example.siva0.mhbs_training.R;
import com.example.siva0.mhbs_training.dummy.DummyContent;
import com.example.siva0.mhbs_training.fragments.ItemDetailsFragment;
import com.example.siva0.mhbs_training.fragments.ItemFragment;

import static com.example.siva0.mhbs_training.R.id.videoView;

/*
This class calls a list fragment which brings up the available videos in a list fragment

 */

public class VideosActivity extends AppCompatActivity implements ItemFragment.OnListFragmentInteractionListener{
    FragmentManager fragmentManager = getSupportFragmentManager();
//    Creates a progress circle for video stream
   ProgressDialog pDialog;
//    Creates a videoView
    VideoView videoview;
//    Stringifies a videoURL for video stream
//    ToDo:// Connect URL to db value of instance
    String VideoURL = "http://www.androidbegin.com/tutorial/AndroidCommercial.3gp";

//    Stringifies value for download stream
    String fileName = "emergency";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_videos);


//        This is the full video path from raw folder for testing
//        Todo://replace package download writting permissions with external storage check
        String filePlace = "android.resource://" + getPackageName() + "/raw/" + fileName;
        Log.d("thisisfilepath", filePlace);

//        Defines the video view parse information for downloads
        VideoView videoview = (VideoView) findViewById(R.id.videoView);
        videoview.setVideoURI(Uri.parse(filePlace));
        videoview.setMediaController(new MediaController(this));


//        videoview = (VideoView) findViewById(videoView);
        videoview.setVisibility(VideoView.INVISIBLE);



        Log.v("ok", "firing");

        // TODO: remove after testing
        Toast.makeText(getApplicationContext(), getIntent().getStringExtra("resourceKey"), Toast.LENGTH_SHORT).show();

        // get the toolbar
        ActionBar myToolbar = this.getSupportActionBar();
        if (myToolbar != null) {
            myToolbar.setDisplayOptions(ActionBar.DISPLAY_SHOW_HOME | ActionBar.DISPLAY_SHOW_TITLE);
            myToolbar.setDisplayHomeAsUpEnabled(true);
        }

        if (savedInstanceState == null) {
            // call the video fragment list via fragment manager
            ItemFragment itemFragment = new ItemFragment();
            fragmentManager
                    .beginTransaction()
                    .replace(R.id.video_fragment_container, itemFragment)
                    .commit();
        }
    }

    @Override
    public void onListFragmentInteraction(DummyContent.DummyItem item) {
        ItemDetailsFragment detailsFragment = new ItemDetailsFragment();

        Bundle args = new Bundle();
        // Communicate with Fragment using Bundle
        detailsFragment.setArguments(args);

        // when we interact with an item, begin a new details fragment
        // TODO: will need to pass item data to the new fragment
        fragmentManager
                .beginTransaction()
                .replace(R.id.video_fragment_container, detailsFragment)
                .addToBackStack(null)
                .commit();

        //        ToDo:// check if string exists to run either download or stream
//        File file = external file path;
//        if file.exists() {
//          runs download:
        VideoView videoView = (VideoView) findViewById(R.id.videoView);
        videoView.start();
        videoView.setVisibility(VideoView.VISIBLE);
// }

//        else {
//      runs stream
//        VideoView videoView = (VideoView) findViewById(R.id.videoView);
//        videoView.setVisibility(VideoView.VISIBLE);
//        // Create a progressbar
//        pDialog = new ProgressDialog(VideosActivity.this);
//        // Set progressbar title
//        pDialog.setTitle("Android Video Streaming Tutorial");
//        // Set progressbar message
//        pDialog.setMessage("Buffering...");
//        pDialog.setIndeterminate(false);
//        pDialog.setCancelable(false);
//        // Show progressbar
//        pDialog.show();
//
//        try {
//            // Start the MediaController
//            MediaController mediacontroller = new MediaController(
//                    VideosActivity.this);
//            mediacontroller.setAnchorView(videoview);
//            // Get the URL from String VideoURL
//            Uri video = Uri.parse(VideoURL);
//            videoview.setMediaController(mediacontroller);
//            videoview.setVideoURI(video);
//
//        } catch (Exception e) {
//            Log.e("Error", e.getMessage());
//            e.printStackTrace();
//        }
//
//        videoview.requestFocus();
//        videoview.setOnPreparedListener(new MediaPlayer.OnPreparedListener() {
//            // Close the progress bar and play the video
//            public void onPrepared(MediaPlayer mp) {
//                pDialog.dismiss();
//                videoview.start();
//            }
//        });
// }


// TODO:// fix orientation so it automatically goes to landscape on Videoview without breaking or restarting video
//        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);


    }

    @Override
    // going back
    public void onBackPressed() {
        if(fragmentManager.getBackStackEntryCount()>1)
        {
            fragmentManager.popBackStack();
        }
        super.onBackPressed();
    }

    // for returning via the menu back button rather than button click
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                // pop off fragments if we can
                if (fragmentManager.getBackStackEntryCount() > 1) {
                    fragmentManager.popBackStack();
                    return true;
                }
                super.onBackPressed();

            default:
                return super.onOptionsItemSelected(item);
        }
    }


}
