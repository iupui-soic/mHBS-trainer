/*
* Favorites activity brings up list of favorited items
 */
package com.example.siva0.mhbs_training.activities;

import android.os.Bundle;
import android.support.v4.app.FragmentManager;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;

import com.example.siva0.mhbs_training.R;
import com.example.siva0.mhbs_training.dummy.DummyContent;
import com.example.siva0.mhbs_training.fragments.ItemDetailsFragment;
import com.example.siva0.mhbs_training.fragments.ItemFragment;

public class DownloadsActivity extends AppCompatActivity implements ItemFragment.OnListFragmentInteractionListener {
    FragmentManager fragmentManager = getSupportFragmentManager();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_downloads);

        // set our action bar; then we can implement going back
        ActionBar myToolbar = this.getSupportActionBar();
        if (myToolbar != null) {
            myToolbar.setDisplayOptions(ActionBar.DISPLAY_SHOW_HOME | ActionBar.DISPLAY_SHOW_TITLE);
            myToolbar.setDisplayHomeAsUpEnabled(true);
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
                .replace(R.id.res_fragment_container, detailsFragment)
                .addToBackStack(null)
                .commit();
    }

    @Override
    public boolean onSupportNavigateUp(){
        //TODO: when going back, keep nav drawer open
        finish();
        return true;
    }

}
