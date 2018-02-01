/*
* This class contains courses which are packages of videos and resources in sequence
* It is called when the courses button was clicked after the user chooses a program
*/

package edu.iupui.soic.biohealth.plhi.mhbs.activities;

import android.os.Bundle;
import android.support.v4.app.FragmentManager;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.view.MenuItem;
import android.widget.Toast;
import edu.iupui.soic.biohealth.plhi.mhbs.R;
import edu.iupui.soic.biohealth.plhi.mhbs.documents.DocumentResources;
import edu.iupui.soic.biohealth.plhi.mhbs.fragments.ItemDetailsFragment;
import edu.iupui.soic.biohealth.plhi.mhbs.fragments.ItemFragment;

public class CoursesActivity extends AppCompatActivity implements ItemFragment.OnListFragmentInteractionListener {
//    Gets fragment manager method
    FragmentManager fragmentManager = getSupportFragmentManager();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_courses);

        //TODO: remove after testing
        Toast.makeText(getApplicationContext(), getIntent().getStringExtra("resourceKey"), Toast.LENGTH_SHORT).show();

        // back button
        ActionBar myToolbar = this.getSupportActionBar();
        if (myToolbar != null) {
            myToolbar.setDisplayOptions(ActionBar.DISPLAY_SHOW_HOME | ActionBar.DISPLAY_SHOW_TITLE);

            myToolbar.setDisplayHomeAsUpEnabled(true);
        }

        if (savedInstanceState == null) {
            // call the list fragment via fragment manager
            ItemFragment itemFragment = new ItemFragment();
            fragmentManager
                    .beginTransaction()
                    .replace(R.id.courses_fragment_container, itemFragment)
                    .commit();
        }
    }

    @Override
    // replace the list fragment with details about one item when an item is chosen
    public void onListFragmentInteraction(DocumentResources.ResourceItem item) {
        ItemDetailsFragment detailsFragment = new ItemDetailsFragment();

        Bundle args = new Bundle();
        // Communicate with Fragment using Bundle
        detailsFragment.setArguments(args);

        // when we interact with an item, begin a new details fragment
        // TODO: will need to pass item data to the new fragment
        fragmentManager
                .beginTransaction()
                .replace(R.id.courses_fragment_container, detailsFragment)
                .addToBackStack(null)
                .commit();
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
