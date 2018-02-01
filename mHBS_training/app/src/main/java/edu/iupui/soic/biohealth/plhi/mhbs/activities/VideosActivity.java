package edu.iupui.soic.biohealth.plhi.mhbs.activities;

import android.os.Bundle;
import android.support.v4.app.FragmentManager;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.MenuItem;
import android.widget.Toast;

import org.xmlpull.v1.XmlPullParser;
import org.xmlpull.v1.XmlPullParserException;

import edu.iupui.soic.biohealth.plhi.mhbs.R;
import edu.iupui.soic.biohealth.plhi.mhbs.documents.DocumentResources;
import edu.iupui.soic.biohealth.plhi.mhbs.fragments.ItemDetailsFragment;
import edu.iupui.soic.biohealth.plhi.mhbs.fragments.ItemFragment;

/*
This class calls a list fragment which brings up the available videos in a list fragment
 */

public class VideosActivity extends AppCompatActivity implements ItemFragment.OnListFragmentInteractionListener {
    FragmentManager fragmentManager = getSupportFragmentManager();
    DocumentResources resourceGrabber = new DocumentResources();

    public static String PACKAGE_NAME;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_videos);
        PACKAGE_NAME = getApplicationContext().getPackageName();

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
    public void onListFragmentInteraction(DocumentResources.ResourceItem item) {
        ItemDetailsFragment detailsFragment = new ItemDetailsFragment();

        Bundle args = new Bundle();
        // Communicate with Fragment using Bundle
        detailsFragment.setArguments(args);
        // Populate list with resources from web API
        resourceGrabber.getParsedResourceItems();

        fragmentManager
                .beginTransaction()
                .replace(R.id.video_fragment_container, detailsFragment)
                .addToBackStack(null)
                .commit();
    }

    @Override
    // going back
    public void onBackPressed() {
        if (fragmentManager.getBackStackEntryCount() > 1) {
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