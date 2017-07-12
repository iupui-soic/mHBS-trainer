package com.example.siva0.mhbs_training.activities;

import android.os.Bundle;
import android.support.v4.app.FragmentManager;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.view.MenuItem;
import android.widget.Toast;

import com.example.siva0.mhbs_training.R;
import com.example.siva0.mhbs_training.dummy.DummyContent;
import com.example.siva0.mhbs_training.fragments.ItemDetailsFragment;
import com.example.siva0.mhbs_training.fragments.ItemFragment;


/*
This class calls a list fragment which brings up the available resources (PDF or image) in a list fragment

 */

public class ResourcesActivity extends AppCompatActivity implements ItemFragment.OnListFragmentInteractionListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_resource);

        // TODO: remove after testing
        Toast.makeText(getApplicationContext(), getIntent().getStringExtra("resourceKey"), Toast.LENGTH_SHORT).show();

        // set the toolbar
        ActionBar myToolbar = this.getSupportActionBar();
        if (myToolbar != null) {
            myToolbar.setDisplayOptions(ActionBar.DISPLAY_SHOW_HOME | ActionBar.DISPLAY_SHOW_TITLE);

            myToolbar.setDisplayHomeAsUpEnabled(true);
        }

        if (savedInstanceState == null) {
            // call the list fragment via fragment manager
            ItemFragment itemFragment = new ItemFragment();
            getSupportFragmentManager()
                    .beginTransaction()
                    .replace(R.id.res_fragment_container, itemFragment)
                    .addToBackStack(null)
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
        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.res_fragment_container, detailsFragment)
                .addToBackStack(null)
                .commit();
    }

    @Override
    public void onBackPressed() {
        FragmentManager fragmentManager = getSupportFragmentManager();
        // pop last fragment off the stack to go back
        if (fragmentManager.getBackStackEntryCount() > 0) {
            fragmentManager.popBackStackImmediate();
        }
        else super.onBackPressed();
    }

    @Override
    // for returning via the menu back button rather than button click
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                FragmentManager fm = getSupportFragmentManager();
                // pop off fragments if we can
                if (fm.getBackStackEntryCount() > 1) {
                    fm.popBackStack();
                    return true;
                }
            default:
                return super.onOptionsItemSelected(item);


        }
    }
}
