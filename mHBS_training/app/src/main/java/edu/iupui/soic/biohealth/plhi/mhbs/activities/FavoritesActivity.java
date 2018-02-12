/*
 * Shows downloaded resources
 */

package edu.iupui.soic.biohealth.plhi.mhbs.activities;

import android.os.Bundle;
import android.support.v4.app.FragmentManager;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;

import edu.iupui.soic.biohealth.plhi.mhbs.R;
import edu.iupui.soic.biohealth.plhi.mhbs.documents.DocumentResources;
import edu.iupui.soic.biohealth.plhi.mhbs.fragments.ItemFragment;

public class FavoritesActivity extends AppCompatActivity implements ItemFragment.OnListFragmentInteractionListener {
    FragmentManager fragmentManager = getSupportFragmentManager();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_favorites);

        // set our action bar; then we can implement going back
        ActionBar myToolbar = this.getSupportActionBar();
        if (myToolbar != null) {
            myToolbar.setDisplayOptions(ActionBar.DISPLAY_SHOW_HOME | ActionBar.DISPLAY_SHOW_TITLE);
            myToolbar.setDisplayHomeAsUpEnabled(true);
        }
    }



    @Override
    public boolean onSupportNavigateUp(){
        //TODO: when going back, keep nav drawer open
        finish();
        return true;
    }

    @Override
    public void onListFragmentInteraction(DocumentResources.ResourceItem item) {

    }
}
