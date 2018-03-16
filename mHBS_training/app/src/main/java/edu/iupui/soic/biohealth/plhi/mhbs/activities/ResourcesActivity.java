/*
* Resources Activity calls a list fragment which brings up the available resources (PDF, video) in a list fragment
*/

package edu.iupui.soic.biohealth.plhi.mhbs.activities;

import android.media.Image;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.ImageButton;

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
    private ItemFragment itemFragment;
    private ImageButton btn_program;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_resources);

        ACTIVITY = getIntent().getStringExtra("resourceKey");
        addListenerOnButton();
        // set the action bar to implement going back
        ActionBar myToolbar = this.getSupportActionBar();
        if (myToolbar != null) {
            myToolbar.setDisplayOptions(ActionBar.DISPLAY_SHOW_HOME | ActionBar.DISPLAY_SHOW_TITLE);
            myToolbar.setDisplayHomeAsUpEnabled(true);
        }

    }

    @Override
    public void onListFragmentInteraction(DocumentResources.ResourceItem item) {
        Log.d("Test", "onList");
/*
        if(DocumentResources.CURRENTLY_DOWNLOADING){
            Log.d("Test", "Downloading right now");
        }
        else{
            View fragmentContainer = findViewById(R.id.res_fragment_container);
            fragmentContainer.setVisibility(View.GONE);
        }
        */
        Fragment detailsFragment;
        if (ACTIVITY.equals("Videos")) {
            detailsFragment = new VideoDetailsFragment();
        } else {
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
        Log.d("Test", "onOptionsItemSelected");
        if (DocumentResources.CURRENTLY_DOWNLOADING) {
            return false;
        } else {

            switch (item.getItemId()) {
                case android.R.id.home:
                    if(fragmentManager.getBackStackEntryCount()==1){
                        View view = findViewById(R.id.res_fragment_container);
                        view.setVisibility(View.INVISIBLE);
                    }
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
        Log.d("Test", "getBundle");

        Bundle args = new Bundle();
        // Communicate with Fragment using Bundle
        args.putString("resourceKey", getIntent().getStringExtra("resourceKey"));
        return args;
    }

    // fragment completed downloads or already has items. Display fragment.
    public void onFragmentComplete(){
        Log.d("Test", "onfragcomplete");
        btn_program.setClickable(true);
        View view = findViewById(R.id.res_fragment_container);
        view.setVisibility(View.VISIBLE);


        fragmentManager.beginTransaction()
                        .show(itemFragment)
                        .commit();
    }

    public void addListenerOnButton() {
        Log.d("Test", "addbuton");
        btn_program = (ImageButton)findViewById(R.id.btn_allPrograms);
        btn_program.setOnClickListener(new ImageButton.OnClickListener() {


            @Override
            public void onClick(View view) {
                Log.d("Test", "onClick");
                // call the list fragment via fragment manager
                itemFragment = new ItemFragment();
                itemFragment.setArguments(getBundle());
                //TODO;test remove the on click listener while downloading, later re-attach.
                btn_program.setClickable(false);

                    // start the item fragment which begins downloads but do not show it until complete
                    fragmentManager
                            .beginTransaction()
                            .add(R.id.res_fragment_container, itemFragment)
                            .hide(itemFragment)
                            .addToBackStack("itemFragment")
                            .commit();
                }

        });

    }

    @Override
    public void onBackPressed() {
        Log.d("Test", "onback");


        if (DocumentResources.CURRENTLY_DOWNLOADING) {
            //block from backpress
        } else {
            super.onBackPressed();
        }
    }

}
