/*
* Resources Activity calls a list fragment which brings up the available resources (PDF, video) in a list fragment
*/

package edu.iupui.soic.biohealth.plhi.mhbs.activities;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.MenuItem;

import org.w3c.dom.Document;

import java.util.List;

import edu.iupui.soic.biohealth.plhi.mhbs.R;
import edu.iupui.soic.biohealth.plhi.mhbs.documents.DocumentResources;
import edu.iupui.soic.biohealth.plhi.mhbs.documents.ResourceItemDownloader;
import edu.iupui.soic.biohealth.plhi.mhbs.fragments.ItemFragment;
import edu.iupui.soic.biohealth.plhi.mhbs.fragments.PdfDetailsFragment;
import edu.iupui.soic.biohealth.plhi.mhbs.fragments.VideoDetailsFragment;

public class ResourcesActivity extends AppCompatActivity implements ItemFragment.OnListFragmentInteractionListener {
    FragmentManager fragmentManager = getSupportFragmentManager();
    private String ACTIVITY = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_resources);
        ACTIVITY = getIntent().getStringExtra("resourceKey");
        // set the action bar to implement going back
        ActionBar myToolbar = this.getSupportActionBar();
        if (myToolbar != null) {
            myToolbar.setDisplayOptions(ActionBar.DISPLAY_SHOW_HOME | ActionBar.DISPLAY_SHOW_TITLE);
            myToolbar.setDisplayHomeAsUpEnabled(true);
        }

        if (savedInstanceState == null) {
            // call the list fragment via fragment manager
            ItemFragment itemFragment = new ItemFragment();
            itemFragment.setArguments(getBundle());
            fragmentManager
                    .beginTransaction()
                    .replace(R.id.res_fragment_container, itemFragment)
                    .commit();
        }
    }

    @Override
    public void onListFragmentInteraction(DocumentResources.ResourceItem item) {
        Fragment detailsFragment;
        if(ACTIVITY.equals("Videos")){
            detailsFragment =  new VideoDetailsFragment();
        }else{
            detailsFragment = new PdfDetailsFragment();

        }

        Bundle b = new Bundle();
        b.putString("resourceId", item.id);
        b.putString("resourceKey", ACTIVITY);
        detailsFragment.setArguments(b);

        fragmentManager
                .beginTransaction()
                .replace(R.id.res_fragment_container, detailsFragment)
                .addToBackStack(null)
                .commit();
    }

    // for returning via the menu back button rather than button click
    public boolean onOptionsItemSelected(MenuItem item) {
        if (DocumentResources.CURRENTLY_DOWNLOADING) {
            return false;
        }else {

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

    private Bundle getBundle() {
        Bundle args = new Bundle();
        // Communicate with Fragment using Bundle
        args.putString("resourceKey", getIntent().getStringExtra("resourceKey"));
        return args;
    }

}
